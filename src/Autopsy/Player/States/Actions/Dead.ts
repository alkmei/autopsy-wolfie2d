import PlayerActionState from "./PlayerActionState";
import { PlayerAnimations, PlayerSounds } from "../../PlayerEnum";
import GameEvent from "@/Wolfie2D/Events/GameEvent";
import { GameEventType } from "@/Wolfie2D/Events/GameEventType";

export default class Dead extends PlayerActionState {
  onEnter(options: Record<string, any>): void {
    this.stateName = "Dead";
    this.player.node.animation.play(PlayerAnimations.Dying);
    this.player.node.animation.queue(PlayerAnimations.Dead, true);
    this.emitter.fireEvent(GameEventType.PLAY_SFX, {
      key: PlayerSounds.Death,
      loop: false,
      keepReference: false,
    });
  }

  handleInput(event: GameEvent) {
    super.handleInput(event);
  }

  onExit(): Record<string, any> {
    return {};
  }

  update(deltaT: number): void {}
}
