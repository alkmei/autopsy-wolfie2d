import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";

export default abstract class Enemy {
  node: AnimatedSprite;
  health: number;
  isInvincible: boolean = false;

  die() {}
  takeDamage() {}
  knockback() {}
}
