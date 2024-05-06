import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import SpiderController from "./SpiderController";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import { PhysicsGroups, SpriteSizes } from "@/globals";
import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";
import Enemy from "../Enemy";
import { SState } from "./SpiderController";
import SpiderState from "./SpiderStates/SpiderState";
import Emitter from "@/Wolfie2D/Events/Emitter";
import { GameEventType } from "@/Wolfie2D/Events/GameEventType";

export enum SpiderAnimations {
  Idle = "Idle",
  Walking = "Walking",
  Dying = "Dying",
  Dead = "Dead",
  TakeDamage = "Take Damage",
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
    this.node.animation.play(SpiderAnimations.Walking, true);
    this.health = 4;
  }

  die() {
    (<SpiderController>this.node._ai).changeState(SState.Dying);
    (<SpiderState>(<SpiderController>this.node._ai).getState()).isDying = true;
  }

  takeDamage() {
    this.node.animation.play(SpiderAnimations.TakeDamage);
    this.node.animation.queue(SpiderAnimations.Walking, true);

    this.emitter.fireEvent(GameEventType.PLAY_SFX, {
      key: "playerHurt",
      loop: false,
      holdReference: false,
    });
  }

  knockback() {
    (<SpiderController>this.node._ai).changeState(SState.Knockback);
  }
}
