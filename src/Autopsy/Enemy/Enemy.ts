import AnimatedSprite from "@/Wolfie2D/Nodes/Sprites/AnimatedSprite";

export default abstract class Enemy {
  node: AnimatedSprite;
  health: number;
  hasTakeDamageAnim: boolean;
  isInvincible: boolean = false;
  isKnockbackable: boolean = true;

  die(){}
  takeDamage(){}
  knockback(){}
}
