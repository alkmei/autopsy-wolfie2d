import Input from "../../../../Wolfie2D/Input/Input";
import { Action } from "../../../../globals";
import { ActionState, MovementState, PlayerSounds } from "../../PlayerEnum";
import Idle from "./Idle";
import { GameEventType } from "../../../../Wolfie2D/Events/GameEventType";

export default class Jump extends Idle {
  fromDash: boolean;

  onEnter(options: Record<string, any>): void {
    if (options) this.fromDash = options.state == ActionState.Dash;
    this.stateName = "Jump";
    this.player.velocity.y = this.player.jumpVelocity;
    this.player.movementStateMachine.changeState(MovementState.Ascending);
    this.emitter.fireEvent(GameEventType.PLAY_SFX, {
      key: PlayerSounds.Jump,
      loop: false,
      keepReference: false,
    });
  }

  onExit(): Record<string, any> {
    return {};
  }

  update(deltaT: number): void {
    super.update(deltaT);
    if (!Input.isPressed(Action.Jump)) {
      if (this.player.velocity.y < 0)
        this.player.movementStateMachine.changeState(MovementState.Descending);
      this.finished(ActionState.Idle);
    }
  }
}
