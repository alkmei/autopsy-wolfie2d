import InAir from "./InAir";
import { MovementState } from "../../Player";
import Input from "../../../../Wolfie2D/Input/Input";
import { Action } from "../../../../globals";
import { ActionState } from "../../Player";
import Jump from "../Actions/Jump";
import Idle from "../Actions/Idle";

export default class Descending extends InAir {
  onEnter(options: Record<string, any>) {
    super.onEnter(options);
    this.stateName = "Descending";
    this.player.velocity.y = 0;
  }

  update(deltaT: number) {
    super.update(deltaT);

    if (
      Input.isJustPressed(Action.Attack) &&
      (this.player.actionStateMachine.getState() instanceof Jump ||
        this.player.actionStateMachine.getState() instanceof Idle)
    ) {
      this.player.actionStateMachine.changeState(ActionState.AttackDown);
    }

    if (this.player.velocity.y < 0) this.finished(MovementState.Ascending);
  }
}
