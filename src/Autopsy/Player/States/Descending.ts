import InAir from "./InAir";
import { PState } from "../PlayerController";

export default class Descending extends InAir {
  onEnter(options: Record<string, any>) {
    super.onEnter(options);
    this.stateName = "Descending";
  }

  update(deltaT: number) {
    super.update(deltaT);
    if (this.parent.velocity.y < 0) this.finished(PState.Ascending);
  }
}
