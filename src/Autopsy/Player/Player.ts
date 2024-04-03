import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import PlayerController from "./PlayerController";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";

export default class Player {
  node: AnimatedSprite;
  health: number;

  constructor(sprite: AnimatedSprite) {
    this.node = sprite;
    // this.node.scale = Constants.SCALE;
    this.node.addPhysics();
    this.node.addAI(PlayerController);
    this.node.position = new Vec2(100, 100);
    this.node.animation.play("IDLE", true);
    this.health = 10;
  }
}
