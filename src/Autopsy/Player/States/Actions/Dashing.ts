import Timer from "../../../../Wolfie2D/Timing/Timer";
import { ActionState, PlayerAnimations } from "../../Player";
import PlayerActionState from "./PlayerActionState";

export default class Dashing extends PlayerActionState {
  private dashTimer: Timer;

  onEnter(options: Record<string, any>): void {
    this.stateName = "Dashing";
    this.owner.animation.playIfNotAlready(PlayerAnimations.Dash);

    this.dashTimer = new Timer(
      200,
      () => this.finished(ActionState.Idle),
      false,
    );
    this.dashTimer.start();
  }

  update(deltaT: number) {
    if (!this.owner.onGround) this.player.canDash = false;
    this.player.velocity.y = this.player.node.onGround ? 0.00001 : 0;
    const direction =
      this.getInputDirection().x == 0
        ? this.owner.invertX
          ? -1
          : 1
        : this.getInputDirection().x;
    this.player.velocity.x = 600 * direction * deltaT;
  }

  onExit(): Record<string, any> {
    return {};
  }
}
