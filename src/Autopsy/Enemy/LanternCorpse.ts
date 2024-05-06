import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { PhysicsGroups } from "../../globals";
import Enemy from "./Enemy";
import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";

const enum LanternAnimations {
  Idle = "Idle",
  Falling = "Falling",
  Impact = "Impact",
}

export default class LanternCorpse extends Enemy {
  node: AnimatedSprite;
  health: number;
  falling: boolean;

  constructor(sprite: AnimatedSprite, pos: Vec2) {
    super();
    this.node = sprite;
    this.node.addPhysics(
      new AABB(new Vec2(0, 0), new Vec2(20, 24)),
      new Vec2(0, 0),
    );
    this.node.setGroup(PhysicsGroups.ENEMY_PHYS);
    this.node.position = pos;
    this.node.animation.play(LanternAnimations.Idle, true);
    this.health = 1;
  }

  die() {
    this.falling = true;
    this.node.animation.play(LanternAnimations.Falling, true);
    this.node.update = (deltaT: number) => {
      if (this.falling) this.node.move(new Vec2(0, 400 * deltaT));
      console.log(this.node.onGround);
      if (this.node.onGround) {
        this.node.animation.playIfNotAlready(LanternAnimations.Impact);
        if (!this.node.animation.isPlaying(LanternAnimations.Impact))
          this.node.destroy();
      }
    };
  }
}
