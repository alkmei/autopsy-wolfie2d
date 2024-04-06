import InAir from "./InAir";
import { PState } from "../PlayerController";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Input from "../../../Wolfie2D/Input/Input";
import { Action } from "../../../globals";
import Player from "../Player";

export default class Ascending extends InAir {
  onEnter(options: Record<string, any>) {
    super.onEnter(options);
    this.stateName = "Ascending";
  }

  update(deltaT: number) {
    super.update(deltaT);

    if (Input.isJustPressed(Action.Dash)) {
      this.finished(PState.Dashing);
    }

    if (this.parent.velocity.y >= 0) this.finished(PState.Descending);
  }
}
