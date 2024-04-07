import Timer from "../../../../Wolfie2D/Timing/Timer";
import { ActionState } from "../../Player";
import PlayerActionState from "./PlayerActionState";
import { PlayerAnimations } from "../../../../globals";

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
    this.player.velocity.y = this.player.node.onGround ? 0.00001 : 0;
    this.player.velocity.x = 600 * this.getInputDirection().x * deltaT;
  }

  onExit(): Record<string, any> {
    return {};
  }
}
