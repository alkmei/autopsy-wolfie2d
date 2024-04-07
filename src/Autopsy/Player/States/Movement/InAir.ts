import { MovementState } from "../../Player";
import PlayerMovementState from "./PlayerMovementState";

export default class InAir extends PlayerMovementState {
  onEnter(options: Record<string, any>): void {
    this.stateName = "InAir";
    this.owner.animation.playIfNotAlready("Jump");
  }

  update(deltaT: number) {
    super.update(deltaT);

    this.player.velocity.y = Math.min(
      this.player.gravity * deltaT + this.player.velocity.y,
      10,
    );

    // TODO: Remove in actual game release :)
    if (this.owner.position.y > 2000) this.owner.position.y = 900;

    if (this.owner.onGround) {
      this.finished(MovementState.Grounded);
    }
  }

  onExit(): Record<string, any> {
    return {};
  }
}
