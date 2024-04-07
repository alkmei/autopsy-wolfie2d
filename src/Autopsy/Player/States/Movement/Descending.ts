import InAir from "./InAir";
import { MovementState } from "../../Player";

export default class Descending extends InAir {
  onEnter(options: Record<string, any>) {
    super.onEnter(options);
    this.stateName = "Descending";
  }

  update(deltaT: number) {
    super.update(deltaT);

    if (this.player.velocity.y < 0) this.finished(MovementState.Ascending);
  }
}
