import { SpiderBossAnimations } from "../SpiderBoss";
import SpiderBossState from "./SpiderBossState";

export default class Enraged extends SpiderBossState {
  onEnter(options: Record<string, any>) {
    this.stateName = "Enraged";
    this.owner.animation.play(SpiderBossAnimations.Transition);
    this.boss.isInvincible = false;
  }

  update(deltaT: number) {
    super.update(deltaT);
    if (!this.owner.animation.isPlaying(SpiderBossAnimations.Transition))
      this.owner.animation.playIfNotAlready(SpiderBossAnimations.Exposed, true);
  }

  onExit(): Record<string, any> {
    return {};
  }
}
