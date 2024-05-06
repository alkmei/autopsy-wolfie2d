import PlayerActionState from "./PlayerActionState";
import Input from "../../../../Wolfie2D/Input/Input";
import { ActionState } from "../../PlayerEnum";
import { Action } from "../../../../globals";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";

export default class Idle extends PlayerActionState {
  onEnter(options: Record<string, any>): void {
    this.stateName = "Idle";
  }

  handleInput(event: GameEvent) {
    super.handleInput(event);
  }

  onExit(): Record<string, any> {
    return {};
  }

  update(deltaT: number): void {
    if (Input.isJustPressed(Action.Dash) && this.player.canDash) {
      this.finished(ActionState.Dash);
    }
  }
}
