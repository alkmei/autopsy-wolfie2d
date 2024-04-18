import GhostState from "./GhostState";
import { GState } from "../GhostController";
import GameLevel from "../../../Scenes/GameLevel";

export default class Knockback extends GhostState {
  onEnter(options: Record<string, any>) {
    this.playerPos = (<GameLevel>this.owner.getScene()).player.node.position;
    this.parent.direction.x =
      this.owner.position.x - this.playerPos.x > 0 ? 1 : -1;
    this.parent.direction.y = 0;
    this.stateName = GState.Knockback;
    this.knockbackTimer.start();
  }

  update(deltaT: number) {
    super.update(deltaT);
    this.parent.velocity.x =
      this.parent.direction.x * this.parent.knockbackSpeed * deltaT;
    this.parent.velocity.y =
      this.parent.direction.y * this.parent.knockbackSpeed * deltaT;

    this.owner.move(this.parent.velocity);

    if (this.knockbackTimer.isStopped()) {
      if (this.withinXBlock(6)) this.canFollow = true;
      else this.canFollow = false;

      if (this.canFollow) {
        this.finished(GState.Following);
      } else {
        this.finished(GState.Drifting);
      }
    }
  }

  onExit(): Record<string, any> {
    //(<AnimatedSprite>this.owner).animation.stop();
    return {};
  }
}
