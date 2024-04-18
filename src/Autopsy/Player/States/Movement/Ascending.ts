import InAir from "./InAir";
import { MovementState } from "../../Player";
import { PlayerAnimations } from "../../Player";

export default class Ascending extends InAir {
  onEnter(options: Record<string, any>) {
    super.onEnter(options);
    this.stateName = "Ascending";
    if (!this.isActionAnimationPlaying())
      this.owner.animation.playIfNotAlready(PlayerAnimations.Up);
  }

  update(deltaT: number) {
    super.update(deltaT);

    if (this.player.velocity.y > 0) this.finished(MovementState.Descending);
  }
}
