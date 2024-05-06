import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Enemy from "../Enemy";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import MonolithController from "./MonolithController";

export default class Monolith extends Enemy {
  // IMPORTANT: NOT ENEMY
  constructor(node: AnimatedSprite, pos: Vec2, message: string) {
    super();
    this.node = node;
    this.health = Infinity;
    this.node.position = pos;
    this.node.animation.play("Idle");
    this.node.addPhysics(undefined, undefined, false);
    this.node.addAI(MonolithController, { message: message });
  }
}
