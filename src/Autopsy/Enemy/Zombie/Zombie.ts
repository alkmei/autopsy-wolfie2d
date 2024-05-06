import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import ZombieController from "./ZombieController";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import { PhysicsGroups, SpriteSizes } from "../../../globals";
import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";
import Enemy from "../Enemy";
import { ZState } from "./ZombieController";
import OrthogonalTilemap from "../../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";

export enum ZombieAnimations {
  Idle = "Idle",
  Dying = "Dying",
  Dead = "Dead",
  Attacking = "Attacking",
  Walking = "Walking",
}

export default class Zombie extends Enemy {
  node: AnimatedSprite;
  health: number;
  tilemap: OrthogonalTilemap;

  constructor(sprite: AnimatedSprite, pos: Vec2, mapName: string) {
    super();
    this.node = sprite;
    this.tilemap = this.node
      .getScene()
      .getTilemap(mapName) as OrthogonalTilemap;
    this.node.addPhysics(
      new AABB(new Vec2(0, 0), SpriteSizes.ZOMBIE),
      new Vec2(0, 0),
    );
    this.node.addAI(ZombieController, { tilemap: this.tilemap });
    this.node.setGroup(PhysicsGroups.ENEMY_PHYS);
    this.node.position = pos;
    this.node.animation.play(ZombieAnimations.Idle, true);
    this.health = 2;
    //this.node.scale = new Vec2(2,2);
  }

  die() {
    (<ZombieController>this.node._ai).changeState(ZState.Dying);
  }

  takeDamage() {
    super.takeDamage();
  }

  knockback() {
    //(<ZombieController>this.node._ai).changeState(ZState.Knockback);
  }
}
