import PlayerState from "./PlayerState";
import { PState } from "../PlayerController";
import Timer from "../../../Wolfie2D/Timing/Timer";

export default class Dashing extends PlayerState {
  private dashTimer: Timer;

  onEnter(options: Record<string, any>): void {
    this.stateName = "Dashing";

    this.parent.velocity.y = 0;

    this.owner.animation.playIfNotAlready("Dash");

    this.dashTimer = new Timer(
      200,
      () => this.finished(PState.Descending),
      false,
    );
    this.dashTimer.start();
  }

  update(deltaT: number) {
    super.update(deltaT);
    this.parent.velocity.x = 600 * this.getInputDirection().x * deltaT;
    // if (this.owner.onWall) {
    //   this.finished(PState.Descending);
    // }
  }

  onExit(): Record<string, any> {
    return {};
  }
}
