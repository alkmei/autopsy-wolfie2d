import SpiderState from "./SpiderState";
import { SpiderAnimations } from "../Spider";
import Vec2 from "@/Wolfie2D/DataTypes/Vec2";
import Timer from "@/Wolfie2D/Timing/Timer";

export default class Dying extends SpiderState {
  onEnter(options: Record<string, any>) {
    this.owner.animation.playIfNotAlready(SpiderAnimations.Dying);
    this.owner.animation.queue(SpiderAnimations.Dead, true);
    this.parent.velocity = Vec2.ZERO;
    this.isDying = true;
    this.contactCooldown = new Timer(10000);
    this.contactCooldown.start();
    this.stateName = "Dying";
  }

  update(deltaT: number) {
    super.update(deltaT);
  }

  onExit(): Record<string, any> {
    //(<AnimatedSprite>this.owner).animation.stop();
    return {};
  }
}
