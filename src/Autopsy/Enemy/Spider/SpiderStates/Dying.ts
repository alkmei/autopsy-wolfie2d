import SpiderState from "./SpiderState";
import { SpiderAnimations } from "../Spider";
import Vec2 from "@/Wolfie2D/DataTypes/Vec2";

export default class Dying extends SpiderState {
  onEnter(options: Record<string, any>) {
    this.owner.animation.playIfNotAlready(SpiderAnimations.Dying);
    this.owner.animation.queue(SpiderAnimations.Dead, true);
    this.parent.velocity = Vec2.ZERO;
  }

  update(deltaT: number) {
    this.isDying = true;
    super.update(deltaT);
  }

  onExit(): Record<string, any> {
    //(<AnimatedSprite>this.owner).animation.stop();
    return {};
  }
}
