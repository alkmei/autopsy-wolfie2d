import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import PlayerController from "./PlayerController";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";

export default class Player {
  node: AnimatedSprite;
  health: number;

  constructor(sprite: AnimatedSprite) {
    this.node = sprite;
    // this.node.scale = Constants.SCALE;
    this.node.addPhysics(new AABB(new Vec2(0, 0), new Vec2(18, 24)));
    this.node.addAI(PlayerController);
    this.node.position = new Vec2(100, 50);
    console.debug(this.node.imageId);
    this.node.animation.play("IdleWeaponLess", true);
    this.health = 10;
  }
}
