import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import SpiderBossController from "./SpiderBossController";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import { PhysicsGroups, SpriteSizes } from "@/globals";
import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";
import Enemy from "../Enemy";

export enum SpiderBossAnimations {
  Idle = "Idle",
}

export default class SpiderBoss extends Enemy {
  node: AnimatedSprite;
  health: number;

  constructor(sprite: AnimatedSprite, pos: Vec2) {
    super();
    this.node = sprite;
    this.node.addPhysics(
      new AABB(new Vec2(0, 0), SpriteSizes.SOUL),
      new Vec2(0, 0),
    );
    this.node.addAI(SpiderBossController);
    this.node.setGroup(PhysicsGroups.ENEMY_PHYS);
    this.node.position = pos;
    this.node.animation.play(SpiderBossAnimations.Idle, true);
    this.health = 50;
  }
}
