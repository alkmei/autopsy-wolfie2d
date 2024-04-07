import { ActionState, MovementState, PlayerAnimations } from "../../Player";
import PlayerMovementState from "./PlayerMovementState";
import Input from "../../../../Wolfie2D/Input/Input";
import { Action } from "../../../../globals";
import Jump from "../Actions/Jump";
import Idle from "../Actions/Idle";

export default class InAir extends PlayerMovementState {
  onEnter(options: Record<string, any>): void {
    this.stateName = "InAir";
    if (!this.isActionAnimationPlaying())
      this.owner.animation.playIfNotAlready(PlayerAnimations.Jump);
  }

  update(deltaT: number) {
    super.update(deltaT);

    this.player.velocity.y = Math.min(
      this.player.gravity * deltaT + this.player.velocity.y,
      10,
    );

    if (
      Input.isJustPressed(Action.Attack) &&
      (this.player.actionStateMachine.getState() instanceof Jump ||
        this.player.actionStateMachine.getState() instanceof Idle)
    ) {
      if (Input.isPressed(Action.Up))
        this.player.actionStateMachine.changeState(ActionState.AttackUpper);
      else if (Input.isPressed(Action.Down))
        this.player.actionStateMachine.changeState(ActionState.AttackDown);
      else this.player.actionStateMachine.changeState(ActionState.Attack);
    }
    // TODO: Remove in actual game release :)
    if (this.owner.position.y > 2000) this.owner.position.y = 900;

    if (this.owner.onGround) {
      this.finished(MovementState.Grounded);
    }
  }

  onExit(): Record<string, any> {
    return {};
  }
}
