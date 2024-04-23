import ZombieState from "./ZombieState";
import { ZombieAnimations } from "../Zombie";
import Vec2 from "@/Wolfie2D/DataTypes/Vec2";

export default class Dying extends ZombieState {
  onEnter(options: Record<string, any>) {
    this.owner.animation.play(ZombieAnimations.Dying);
    this.owner.animation.queue(ZombieAnimations.Dead, true);
    this.parent.velocity = Vec2.ZERO;
    
  }

  update(deltaT: number) {
    this.isDying = true;
    super.update(deltaT);
    if (!this.owner.animation.isPlaying(ZombieAnimations.Dying))
      this.owner.destroy();
  }

  onExit(): Record<string, any> {
    //(<AnimatedSprite>this.owner).animation.stop();
    return {};
  }
}
