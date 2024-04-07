import Timer from "../../../../Wolfie2D/Timing/Timer";
import { MovementState } from "../../Player";
import PlayerActionState from "./PlayerActionState";

export default class Dashing extends PlayerActionState {
  private dashTimer: Timer;

  onEnter(options: Record<string, any>): void {
    this.stateName = "Dashing";

    this.player.velocity.y = 0;

    this.owner.animation.playIfNotAlready("Dash");

    this.dashTimer = new Timer(
      200,
      () => this.finished(MovementState.Descending),
      false,
    );
    this.dashTimer.start();
  }

  update(deltaT: number) {
    this.player.velocity.x = 600 * this.getInputDirection().x * deltaT;
    // if (this.owner.onWall) {
    //   this.finished(PState.Descending);
    // }
  }

  onExit(): Record<string, any> {
    return {};
  }
}
