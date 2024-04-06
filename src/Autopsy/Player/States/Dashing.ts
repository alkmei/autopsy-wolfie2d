import PlayerState from "./PlayerState";
import { PState } from "../PlayerController";
import Timer from "../../../Wolfie2D/Timing/Timer";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";

export default class Dashing extends PlayerState {
  private dashTimer: Timer;

  onEnter(options: Record<string, any>): void {
    this.stateName = "Dashing";

    this.parent.velocity.x = 200;
    this.parent.velocity.y = 0;

    this.dashTimer = new Timer(
      200,
      () => this.finished(PState.Descending),
      false,
    );
    this.dashTimer.start();
  }

  update(deltaT: number) {
    super.update(deltaT);
    this.owner.move(new Vec2(200, 0));
    if (this.owner.onWall) {
        this.finished(PState.Descending);
    }
  }

  onExit(): Record<string, any> {
    return {};
  }
}
