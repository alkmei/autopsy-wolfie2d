import GhostState from "./GhostState";
import { GState } from "../GhostController";

export default class Drifting extends GhostState {
  onEnter(options: Record<string, any>) {
    this.parent.direction = this.parent.randomDirection();
    this.stateName = "Drifting";
    this.canFollow = false;
  }

  update(deltaT: number) {
    super.update(deltaT);

    if (this.withinXBlock(3)) this.canFollow = true;

    if (this.canFollow) {
      this.finished(GState.Following);
    } else {
      this.parent.velocity.x =
        this.parent.direction.x * this.parent.driftSpeed * deltaT;
      this.parent.velocity.y =
        this.parent.direction.y * this.parent.driftSpeed * deltaT;

      this.owner.move(this.parent.velocity);
    }
  }

  onExit(): Record<string, any> {
    //(<AnimatedSprite>this.owner).animation.stop();
    return {};
  }
}
