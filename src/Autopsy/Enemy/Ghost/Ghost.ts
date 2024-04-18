import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import GhostController from "./GhostController";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import { PhysicsGroups, SpriteSizes } from "@/globals";
import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";
import Hitbox from "../../Hitbox/Hitbox";

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
  type: string; // red(HP) or blue(MP)

  constructor(sprite: AnimatedSprite, pos: Vec2, type: string) {
    this.node = sprite;
    this.node.scale = new Vec2(0.5, 0.5);
    this.node.addPhysics(
      new AABB(new Vec2(0, 0), SpriteSizes.SOUL),
      new Vec2(0, 0),
    );
    this.node.addAI(GhostController);
    this.node.setGroup(PhysicsGroups.ENEMY_PHYS);
    this.node.position = pos;
    this.node.animation.play(GhostAnimations.Idle, true);
    this.health = 1;
    this.type = type;
  }
}
