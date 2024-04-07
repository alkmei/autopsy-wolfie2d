import Input from "../../../../Wolfie2D/Input/Input";
import { Action, PlayerAnimations } from "../../../../globals";
import { ActionState, MovementState } from "../../Player";
import PlayerMovementState from "./PlayerMovementState";
import Idle from "../Actions/Idle";

export default class Grounded extends PlayerMovementState {
  onEnter(options: Record<string, any>): void {
    this.stateName = "Grounded";
  }

  update(deltaT: number) {
    super.update(deltaT);
    const dir = this.getInputDirection();

    if (
      !this.owner.animation.isPlaying("Scythe Slash") &&
      !this.owner.animation.isPlaying("Scythe Upper") &&
      !this.owner.animation.isPlaying("Scythe Down")
    ) {
      if (dir.x != 0) {
        this.owner.animation.playIfNotAlready(PlayerAnimations.Walk, true);
      } else {
        this.owner.animation.playIfNotAlready(PlayerAnimations.Idle, true);
      }
    }

    if (Input.isJustPressed(Action.Jump)) {
      this.player.actionStateMachine.changeState(ActionState.Jump);
    } else {
      this.player.velocity.y = 0.00001;
    }

    if (
      Input.isJustPressed(Action.Attack) &&
      this.player.actionStateMachine.getState() instanceof Idle
    ) {
      this.player.actionStateMachine.changeState(ActionState.Attack);
    }

    if (!this.owner.onGround) this.finished(MovementState.Descending);
  }

  onExit(): Record<string, any> {
    return {};
  }
}
