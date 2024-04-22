import SpiderBossState from "./SpiderBossState";

export default class Cocooned extends SpiderBossState {
  onEnter(options: Record<string, any>) {
  }

  update(deltaT: number) {
    super.update(deltaT);
  }

  onExit(): Record<string, any> {
    return {};
  }
}
