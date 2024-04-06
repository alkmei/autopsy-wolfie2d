import PlayerState from "./PlayerState";
import { PState } from "../PlayerController";
import MathUtils from "../../../Wolfie2D/Utils/MathUtils";

export default class InAir extends PlayerState {
  onEnter(options: Record<string, any>): void {
    this.stateName = "InAir";
    this.owner.animation.playIfNotAlready("Jump");
  }

  update(deltaT: number) {
    super.update(deltaT);
    this.parent.velocity.y = Math.min(
      this.parent.gravity * deltaT + this.parent.velocity.y,
      10,
    );

    // TODO: Remove in actual game release :)
    if (this.owner.position.y > 2000) this.owner.position.y = 900;
    if (this.owner.onGround) {
      this.finished(PState.Grounded);
    }
  }

  onExit(): Record<string, any> {
    return {};
  }
}
