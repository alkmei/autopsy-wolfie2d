import Emitter from "@/Wolfie2D/Events/Emitter";
import AnimatedSprite from "@/Wolfie2D/Nodes/Sprites/AnimatedSprite";

export default abstract class Enemy {
  node: AnimatedSprite;
  health: number;
  isInvincible: boolean = false;
  emitter: Emitter = new Emitter();

  die(){}
  takeDamage(){}
  knockback(){}
}
