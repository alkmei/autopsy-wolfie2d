import { ActionState, MovementState, PlayerAnimations } from "../../PlayerEnum";
import PlayerMovementState from "./PlayerMovementState";
import Input from "../../../../Wolfie2D/Input/Input";
import { Action } from "@/globals";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";

export default class InAir extends PlayerMovementState {
  onEnter(options: Record<string, any>): void {
    this.stateName = "InAir";
  }

  update(deltaT: number) {
    super.update(deltaT);

    this.player.velocity.y = Math.min(
      this.player.gravity * deltaT + this.player.velocity.y,
      10,
    );

    if (
      Input.isJustPressed(Action.Attack) &&
      this.player.attackCooldown.isStopped()
    ) {
      this.player.attackCooldown.start();

      if (Input.isPressed(Action.Up))
        this.player.actionStateMachine.changeState(ActionState.AttackUpper);
      else if (Input.isPressed(Action.Down))
        this.player.actionStateMachine.changeState(ActionState.AttackDown);
      else this.player.actionStateMachine.changeState(ActionState.Attack);
    }
    console.log((this.player.node.getScene() as any).tilemaps[0].numRows * 32);

    // TODO: Remove in actual game release :)
    if (
      this.owner.position.y >
      (this.player.node.getScene() as any).tilemaps[0].numRows * 32
    )
      this.owner.position = new Vec2(
        this.player.lastGroundedPosition.x,
        this.player.lastGroundedPosition.y - 150,
      );

    if (this.owner.onGround) {
      this.finished(MovementState.Grounded);
    }
  }

  onExit(): Record<string, any> {
    return {};
  }
}
