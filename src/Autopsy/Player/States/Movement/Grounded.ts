import PlayerState from "../PlayerState";
import Input from "../../../../Wolfie2D/Input/Input";
import { Action } from "../../../../globals";
import { MovementState } from "../../Player";
import PlayerMovementState from "./PlayerMovementState";

export default class Grounded extends PlayerMovementState {
  onEnter(options: Record<string, any>): void {
    this.stateName = "Grounded";
  }

  update(deltaT: number) {
    super.update(deltaT);
    const dir = this.getInputDirection();

    if (Input.isJustPressed(Action.Attack)) {
      this.owner.animation.play("Scythe Slash", false);
    }

    if (dir.x != 0) {
      this.owner.animation.playIfNotAlready("Walk", true);
    } else {
      this.owner.animation.playIfNotAlready("Idle", true);
    }

    if (Input.isJustPressed(Action.Jump)) {
      this.player.velocity.y = this.player.jumpVelocity;
      this.finished(MovementState.Ascending);
    } else {
      this.player.velocity.y = 0.1;
    }

    if (!this.owner.onGround) this.finished(MovementState.Descending);
  }

  onExit(): Record<string, any> {
    return {};
  }
}
