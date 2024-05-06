import { ZombieAnimations } from "../Zombie";
import { ZState } from "../ZombieController";
import ZombieState from "./ZombieState";

export default class Attacking extends ZombieState {
  onEnter(options: Record<string, any>): void {
    this.owner.animation.playIfNotAlready(ZombieAnimations.Attacking);
  }

  update(deltaT: number): void {
    if (!this.owner.animation.isPlaying(ZombieAnimations.Attacking)) {
      this.finished(ZState.Idle);
    }
  }

  onExit(): Record<string, any> {
    return {};
  }
}
