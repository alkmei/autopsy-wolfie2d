import GhostState from "./GhostState";
import { GState } from "../GhostController";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";

export default class Following extends GhostState {
  onEnter(options: Record<string, any>) {
    this.stateName = "Following";
  }

  update(deltaT: number) {
    super.update(deltaT);
    if (!this.CanFollow) {
      this.parent.direction = this.parent.randomDirection();
      this.FollowingCDTimer.start();
      this.finished(GState.Drifting);
      return;
    } else if (
      this.owner.onWall ||
      this.owner.onCeiling ||
      this.owner.onGround
    ) {
      if (this.StuckTimer.isStopped()) {
        this.parent.direction = this.parent.randomDirection();
        this.FollowingCDTimer.start();
        this.finished(GState.Drifting);
        return;
      }
    } else {
      this.StuckTimer.reset();
    }

    this.parent.direction = this.owner.position.dirTo(this.playerPos);

    if (Math.sign(this.parent.direction.x) == -1) {
      (<AnimatedSprite>this.owner).invertX = true;
    } else if (Math.sign(this.parent.direction.x) == 1) {
      (<AnimatedSprite>this.owner).invertX = false;
    }

    this.parent.velocity.x =
      this.parent.direction.x * this.parent.follow_speed * deltaT;
    this.parent.velocity.y =
      this.parent.direction.y * this.parent.follow_speed * deltaT;

    this.owner.move(this.parent.velocity);
  }

  onExit(): Record<string, any> {
    //(<AnimatedSprite>this.owner).animation.stop();
    return {};
  }
}
