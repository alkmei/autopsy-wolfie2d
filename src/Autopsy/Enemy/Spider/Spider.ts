import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import SpiderController from "./SpiderController";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import { PhysicsGroups, SpriteSizes } from "@/globals";
import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";
import Enemy from "../Enemy";
import { SState } from "./SpiderController";
import Dying from "./SpiderStates/Dying";

export enum SpiderAnimations {
  Idle = "Idle",
  Walking = "Walking",
  Dying = "Dying",
  Dead = "Dead",
}

export default class Spider extends Enemy {
  node: AnimatedSprite;
  health: number;

  constructor(sprite: AnimatedSprite, pos: Vec2) {
    super();
    this.node = sprite;
    this.node.addPhysics(
      new AABB(new Vec2(0, 0), new Vec2(20, 24)),
      new Vec2(0, 0),
    );
    this.node.addAI(SpiderController);
    this.node.setGroup(PhysicsGroups.ENEMY_PHYS);
    this.node.position = pos;
    this.node.animation.play(SpiderAnimations.Idle, true);
    this.health = 5;
  }

  die() {
    (<SpiderController>this.node._ai).changeState(SState.Dying);
  }

  knockback() {
    if (!((<SpiderController>this.node._ai).getState() instanceof Dying))
        (<SpiderController>this.node._ai).changeState(SState.Knockback);
  }
}
