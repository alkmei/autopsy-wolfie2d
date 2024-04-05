import InAir from "./InAir";
import { PState } from "../PlayerController";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";

export default class Ascending extends InAir {
  onEnter(options: Record<string, any>) {
    super.onEnter(options);
    (<AnimatedSprite>this.parent.owner).animation.play("Scythe Slash");
    this.stateName = "Ascending";
  }

  update(deltaT: number) {
    super.update(deltaT);

    if (this.parent.velocity.y >= 0) this.finished(PState.Descending);
  }
}
