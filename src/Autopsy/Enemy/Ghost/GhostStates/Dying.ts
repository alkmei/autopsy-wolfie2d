import GhostState from "./GhostState";
import { GhostAnimations } from "../Ghost";
import Vec2 from "@/Wolfie2D/DataTypes/Vec2";

export default class Dying extends GhostState {
  onEnter(options: Record<string, any>) {
    this.owner.animation.play(GhostAnimations.Dying);
    this.owner.animation.queue(GhostAnimations.Dead, true);
    this.parent.velocity = Vec2.ZERO;
  }

  update(deltaT: number) {
    this.isDying = true;
    super.update(deltaT);
    if (!this.owner.animation.isPlaying(GhostAnimations.Dying))
      this.owner.destroy();
  }

  onExit(): Record<string, any> {
    //(<AnimatedSprite>this.owner).animation.stop();
    return {};
  }
}
