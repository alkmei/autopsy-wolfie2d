import SpiderState from "./SpiderState";
import { SState } from "../SpiderController";
import GameLevel from "@/Autopsy/Scenes/GameLevel";
import { SpiderAnimations } from "../Spider";

export default class Following extends SpiderState {
  onEnter(options: Record<string, any>) {
    this.stateName = "Following";
    // this.canFollow = true;
  }

  update(deltaT: number) {
    super.update(deltaT);

    if (this.withinXBlock(3) && !this.isDying) {
        this.finished(SState.Dashing);
    } else {
      if (this.playerPos) {
        this.parent.direction = this.owner.position.dirTo(this.playerPos);

        this.parent.velocity.x =
          this.parent.direction.x * this.parent.followSpeed * deltaT;
        this.parent.velocity.y =
          this.parent.direction.y * this.parent.followSpeed * deltaT;
      }
    }

    this.owner.move(this.parent.velocity);
    this.owner.rotation = this.angleToPlayer();
  }
  
  onExit(): Record<string, any> {
    //(<AnimatedSprite>this.owner).animation.stop();
    return {};
  }
}
