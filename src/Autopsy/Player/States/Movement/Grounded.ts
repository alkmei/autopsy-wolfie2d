import Input from "../../../../Wolfie2D/Input/Input";
import { Action } from "@/globals";
import { ActionState, MovementState, PlayerAnimations } from "../../PlayerEnum";
import PlayerMovementState from "./PlayerMovementState";
import Idle from "../Actions/Idle";
import Dashing from "../Actions/Dashing";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";

export default class Grounded extends PlayerMovementState {
  onEnter(options: Record<string, any>): void {
    this.stateName = "Grounded";
    this.player.canDash = true;
  }

  performingAction() {}

  update(deltaT: number) {
    super.update(deltaT);
    const dir = this.getInputDirection();

    if (!this.isActionAnimationPlaying()) {
      if (dir.x != 0) {
        this.owner.animation.playIfNotAlready(PlayerAnimations.Walk, true);
      } else {
        this.owner.animation.playIfNotAlready(PlayerAnimations.Idle, true);
      }
    }

    if (!(this.player.actionStateMachine.getState() instanceof Dashing))
      this.player.speed = 300;

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
    this.player.lastGroundedPosition = this.owner.position
      .clone()
      .sub(new Vec2(this.getInputDirection().x * 40, 0));
    return {};
  }
}
