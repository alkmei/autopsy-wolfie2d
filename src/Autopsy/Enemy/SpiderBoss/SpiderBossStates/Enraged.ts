import { SpiderBossAnimations } from "../SpiderBoss";
import SpiderBossState from "./SpiderBossState";

export default class Cocooned extends SpiderBossState {
  onEnter(options: Record<string, any>) {
    this.stateName = "Enraged";
    this.owner.animation.playIfNotAlready(SpiderBossAnimations.Exposed, true);
  }

  update(deltaT: number) {
    super.update(deltaT);
  }

  onExit(): Record<string, any> {
    return {};
  }
}
