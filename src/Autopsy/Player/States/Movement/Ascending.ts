import InAir from "./InAir";
import { MovementState } from "../../Player";
import Input from "../../../../Wolfie2D/Input/Input";
import { Action } from "../../../../globals";
import { ActionState } from "../../Player";

export default class Ascending extends InAir {
  onEnter(options: Record<string, any>) {
    super.onEnter(options);
    this.stateName = "Ascending";
  }

  update(deltaT: number) {
    super.update(deltaT);
    
    if (Input.isJustPressed(Action.Attack)) {
      this.player.actionStateMachine.changeState(ActionState.AttackUpper);
    }

    if (this.player.velocity.y > 0) this.finished(MovementState.Descending);
  }
}
