import GhostState from "./GhostState";
import { GState } from "../GhostController";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Timer from "../../../../Wolfie2D/Timing/Timer";

export default class Drifting extends GhostState {
  onEnter(options: Record<string, any>) {
    // TODO: enemy still keeps the direction that they were following the player in idk why this doesn't work
    this.parent.direction = this.parent.randomDirection();
    this.stateName = "Drifting";
    this.CanFollow = false;
  }

  update(deltaT: number) {
    super.update(deltaT);

    if (this.withinXBlock(6)) this.CanFollow = true;

    if (this.CanFollow) {
      this.StuckTimer.start();
      this.finished(GState.Following);
    } else {
      this.parent.velocity.x =
        this.parent.direction.x * this.parent.drift_speed * deltaT;
      this.parent.velocity.y =
        this.parent.direction.y * this.parent.drift_speed * deltaT;

      this.owner.move(this.parent.velocity);
    }
  }

  onExit(): Record<string, any> {
    //(<AnimatedSprite>this.owner).animation.stop();
    return {};
  }
}
