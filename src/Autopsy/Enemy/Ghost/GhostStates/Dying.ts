import GhostState from "./GhostState";
import { GhostAnimations } from "../Ghost";

export default class Dying extends GhostState {
  onEnter(options: Record<string, any>) {
    this.owner.animation.play(GhostAnimations.Dying);
    this.owner.animation.queue(GhostAnimations.Dead, true);
  }

  update(deltaT: number) {
    super.update(deltaT);
    if (!this.owner.animation.isPlaying(GhostAnimations.Dying))
        this.owner.destroy();
  }

  onExit(): Record<string, any> {
    //(<AnimatedSprite>this.owner).animation.stop();
    return {};
  }
}
