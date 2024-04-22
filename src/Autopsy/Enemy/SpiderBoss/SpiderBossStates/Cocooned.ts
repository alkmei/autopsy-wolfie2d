import SpiderBoss from "../SpiderBoss";
import SpiderBossState from "./SpiderBossState";

export default class Cocooned extends SpiderBossState {
  onEnter(options: Record<string, any>) {
    this.stateName = "Cocooned";
    this.boss.isInvincible = true;
  }

  update(deltaT: number) {
    super.update(deltaT);
  }

  onExit(): Record<string, any> {
    return {};
  }
}
