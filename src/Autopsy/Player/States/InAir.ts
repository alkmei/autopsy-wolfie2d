import PlayerState from "./PlayerState";
import { PState } from "../PlayerController";
import MathUtils from "../../../Wolfie2D/Utils/MathUtils";

export default class InAir extends PlayerState {
  onEnter(options: Record<string, any>): void {
    this.stateName = "InAir";
  }

  update(deltaT: number) {
    super.update(deltaT);
    this.parent.velocity.y = Math.min(
      this.parent.gravity * deltaT + this.parent.velocity.y,
      10,
    );

    if (this.owner.position.y > 1000) this.owner.position.y = 100;
    if (this.owner.onGround) {
      this.finished(PState.Grounded);
    }
  }

  onExit(): Record<string, any> {
    return {};
  }
}
