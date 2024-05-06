import Timer from "../../../../Wolfie2D/Timing/Timer";
import { ActionState, PlayerAnimations, PlayerSounds } from "../../PlayerEnum";
import PlayerActionState from "./PlayerActionState";
import { GameEventType } from "../../../../Wolfie2D/Events/GameEventType";

export default class Dashing extends PlayerActionState {
  private dashTimer: Timer;
  private invTimer: Timer;

  onEnter(options: Record<string, any>): void {
    this.stateName = "Dashing";

    this.owner.animation.play(PlayerAnimations.Dash);
    this.emitter.fireEvent(GameEventType.PLAY_SFX, {
      key: PlayerSounds.Dash,
      loop: false,
      holdReference: false,
    });
    this.player.invincible = true;

    this.dashTimer = new Timer(
      200,
      () => this.finished(ActionState.Idle),
      false,
    );
    this.invTimer = new Timer(
      150,
      () => (this.player.invincible = false),
      false,
    );
    this.dashTimer.start();
    this.invTimer.start();
  }

  update(deltaT: number) {
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
    if (!this.owner.onGround) this.player.canDash = false;
    return { state: ActionState.Dash };
  }
}
