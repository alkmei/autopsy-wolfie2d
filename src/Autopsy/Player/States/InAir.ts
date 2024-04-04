import PlayerState from "./PlayerState";
import { PState } from "../PlayerController";

export default class InAir extends PlayerState {
  onEnter(options: Record<string, any>): void {}

  update(deltaT: number) {
    super.update(deltaT);
    this.parent.velocity.y += this.parent.gravity * deltaT;
    if (this.owner.onGround) {
      this.finished(PState.Grounded);
    }
  }

  onExit(): Record<string, any> {
    return {};
  }
}
