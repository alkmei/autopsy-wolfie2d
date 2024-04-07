import GhostState from "./GhostState";
import { GState } from "../GhostController";

export default class Following extends GhostState {
  onEnter(options: Record<string, any>) {
    this.stateName = "Following";
  }

  update(deltaT: number) {
    super.update(deltaT);

    if (!this.withinXBlock(6)) this.canFollow = false;

    if (!this.canFollow) {
      this.followingCDTimer.start();
      this.finished(GState.Drifting);
    } else if (
      this.owner.onWall ||
      this.owner.onCeiling ||
      this.owner.onGround
    ) {
      if (this.stuckTimer.isStopped()) {
        this.parent.direction = this.parent.randomDirection();
        this.followingCDTimer.start();
        this.finished(GState.Drifting);
      }
    } else {
      this.stuckTimer.reset();
    }

    this.parent.direction = this.owner.position.dirTo(this.playerPos);

    this.parent.velocity.x =
      this.parent.direction.x * this.parent.followSpeed * deltaT;
    this.parent.velocity.y =
      this.parent.direction.y * this.parent.followSpeed * deltaT;

    this.owner.move(this.parent.velocity);
  }

  onExit(): Record<string, any> {
    //(<AnimatedSprite>this.owner).animation.stop();
    return {};
  }
}
