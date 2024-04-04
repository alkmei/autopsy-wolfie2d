import PlayerState from "./PlayerState";
import Input from "../../../Wolfie2D/Input/Input";
import { Action } from "../../../globals";
import { PState } from "../PlayerController";

export default class Grounded extends PlayerState {
  onEnter(options: Record<string, any>): void {}

  update(deltaT: number) {
    super.update(deltaT);

    if (Input.isPressed(Action.Jump)) {
      if (Input.isJustPressed(Action.Jump)) {
        this.parent.velocity.y = this.parent.jumpVelocity;
        this.finished(PState.Ascending);
      }
    }
  }

  onExit(): Record<string, any> {
    return {};
  }
}
