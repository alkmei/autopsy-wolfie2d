import PlayerActionState from "./PlayerActionState";
import Input from "../../../../Wolfie2D/Input/Input";
import { Action } from "../../../../globals";
import { ActionState, MovementState } from "../../Player";

export default class Jump extends PlayerActionState {
  onEnter(options: Record<string, any>): void {
    this.stateName = "Jump";
    this.player.velocity.y = this.player.jumpVelocity;
    this.player.movementStateMachine.changeState(MovementState.Ascending);
  }

  onExit(): Record<string, any> {
    return {};
  }

  update(deltaT: number): void {
    if (!Input.isPressed(Action.Jump)) {
      if (this.player.velocity.y < 0)
        this.player.movementStateMachine.changeState(MovementState.Descending);
      this.finished(ActionState.Idle);
    }
  }
}
