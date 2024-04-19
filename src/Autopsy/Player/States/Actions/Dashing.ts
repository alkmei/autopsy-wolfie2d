import Timer from "../../../../Wolfie2D/Timing/Timer";
import { ActionState, PlayerAnimations, PlayerSounds } from "../../PlayerEnum";
import PlayerActionState from "./PlayerActionState";
import { GameEventType } from "@/Wolfie2D/Events/GameEventType";

export default class Dashing extends PlayerActionState {
  private dashTimer: Timer;

  onEnter(options: Record<string, any>): void {
    this.stateName = "Dashing";

    this.owner.animation.play(PlayerAnimations.Dash);
    this.emitter.fireEvent(GameEventType.PLAY_SFX, {
      key: PlayerSounds.Dash,
      loop: false,
      holdReference: false,
    });

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
    this.player.speed = 500;
    this.player.velocity.x = direction * this.player.speed * deltaT;
  }

  onExit(): Record<string, any> {
    return { state: ActionState.Dash };
  }
}
