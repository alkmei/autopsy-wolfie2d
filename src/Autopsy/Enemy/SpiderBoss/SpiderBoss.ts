import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import SpiderBossController, { SpiderBossStates } from "./SpiderBossController";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import { PhysicsGroups, SpriteSizes } from "@/globals";
import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";
import Enemy from "../Enemy";
import { GameEventType } from "@/Wolfie2D/Events/GameEventType";
import Emitter from "@/Wolfie2D/Events/Emitter";

export enum SpiderBossAnimations {
  Cocooned = "Idle Cocooned",
  Exposed = "Exposed Idle",
  Transition = "Transition",
  TakeDamage = "Take Damage",
  Dying = "Dying",
  Dead = "Dead",
}

export default class SpiderBoss extends Enemy {
  node: AnimatedSprite;
  health: number;

  constructor(sprite: AnimatedSprite, pos: Vec2) {
    super();
    this.node = sprite;
    this.node.addPhysics(
      new AABB(new Vec2(0, 0), new Vec2(90, 55)),
      new Vec2(0, 0),
    );
    this.node.addAI(SpiderBossController, {
        boss: this,
      });
    this.node.setGroup(PhysicsGroups.ENEMY_PHYS);
    this.node.position = pos;
    this.node.animation.play(SpiderBossAnimations.Cocooned, true);
    this.health = 50;
  }

  takeDamage() {
    this.node.animation.play(SpiderBossAnimations.TakeDamage);

    this.emitter.fireEvent(GameEventType.PLAY_SFX, {
      key: "soulDeath",
      loop: false,
      holdReference: false,
    });
  }

  die() {
    (<SpiderBossController>this.node._ai).changeState(SpiderBossStates.Dying);
  }
}
