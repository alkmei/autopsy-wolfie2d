import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import GhostController from "./GhostController";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import { PhysicsGroups, SpriteSizes } from "../../../globals";
import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";
import Hitbox from "../../Hitbox/Hitbox";
import { DamageType } from "../../Hitbox/DamageType";
import Sprite from "../../../Wolfie2D/Nodes/Sprites/Sprite";

export enum GhostType {
  RED = "red",
  BLUE = "blue",
}

export enum GhostAnimations {
  Idle = "Idle",
}

export default class Ghost {
  hitbox: Hitbox;
  node: AnimatedSprite;
  health: number;
  type: string; //red(HP) or blue(MP)

  constructor(sprite: AnimatedSprite, pos: Vec2, type: string) {
    this.node = sprite;
    this.node.addPhysics(
      new AABB(new Vec2(0, 0), SpriteSizes.SOUL),
      new Vec2(0, 0),
    );
    this.node.addAI(GhostController);
    this.node.setGroup(PhysicsGroups.ENEMY_PHYS);
    this.node.position = pos;
    this.node.animation.play(GhostAnimations.Idle, true);
    this.health = 5;
    this.type = type;

    // Add contact damage hitbox
    if (!this.hitbox) {
      this.hitbox = new Hitbox(
        this.node,
        DamageType.CONTACT,
        new Vec2(0, 0),
        SpriteSizes.SOUL,
        this.node.invertX,
        new Vec2(0, 0),
      );
    }
  }
}
