import PlayerActionState from "./PlayerActionState";
import Input from "../../../../Wolfie2D/Input/Input";
import { ActionState, PlayerAnimations } from "../../Player";
import { Action } from "../../../../globals";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";

export default class Dead extends PlayerActionState {
  onEnter(options: Record<string, any>): void {
    this.stateName = "Dead";
    this.player.node.animation.play(PlayerAnimations.Dying);
    this.player.node.animation.queue(PlayerAnimations.Dead, true);
  }

  handleInput(event: GameEvent) {
    super.handleInput(event);
  }

  onExit(): Record<string, any> {
    return {};
  }

  update(deltaT: number): void {
  }
}
