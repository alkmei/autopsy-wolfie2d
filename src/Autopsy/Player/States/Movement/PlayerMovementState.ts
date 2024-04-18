import PlayerState from "../PlayerState";
import { PlayerAnimations } from "../../Player";

export default abstract class PlayerMovementState extends PlayerState {
  update(deltaT: number): void {
    let dir = this.getInputDirection();
    if (dir.x == -1) {
      this.owner.invertX = true;
    } else if (dir.x == 1) {
      this.owner.invertX = false;
    }

    this.player.velocity = this.owner.getLastVelocity();
    this.player.velocity.x = dir.x * this.player.speed * deltaT;
  }

  isActionAnimationPlaying() {
    return [
      PlayerAnimations.ScytheSlash,
      PlayerAnimations.Dash,
      PlayerAnimations.ScytheUpper,
      PlayerAnimations.ScytheDown,
      PlayerAnimations.TakeDamage,
      PlayerAnimations.Dying,
      PlayerAnimations.Dead,
    ].some(x => this.owner.animation.isPlaying(x));
  }
}
