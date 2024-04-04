import InAir from "./InAir";
import { PState } from "../PlayerController";

export default class Ascending extends InAir {
  onEnter(options: Record<string, any>) {
    super.onEnter(options);
    this.stateName = "Ascending";
  }

  update(deltaT: number) {
    super.update(deltaT);
    if (this.parent.velocity.y > 0) {
      this.finished(PState.Descending);
    }
  }
}
