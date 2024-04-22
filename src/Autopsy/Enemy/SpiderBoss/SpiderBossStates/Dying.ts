import SpiderBossState from "./SpiderBossState";
import { SpiderBossAnimations } from "../SpiderBoss";

export default class Dying extends SpiderBossState {
  onEnter(options: Record<string, any>) {
    this.owner.animation.play(SpiderBossAnimations.Dying);
    this.owner.animation.queue(SpiderBossAnimations.Dead, true);
  }

  update(deltaT: number) {
    super.update(deltaT);
    if (!this.owner.animation.isPlaying(SpiderBossAnimations.Dying))
        this.owner.destroy();
  }

  onExit(): Record<string, any> {
    //(<AnimatedSprite>this.owner).animation.stop();
    return {};
  }
}
