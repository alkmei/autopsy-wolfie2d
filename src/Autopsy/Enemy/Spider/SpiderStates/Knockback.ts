import SpiderState from "./SpiderState";
import { SState } from "../SpiderController";
import GameLevel from "../../../Scenes/GameLevel";

export default class Knockback extends SpiderState {
  onEnter(options: Record<string, any>) {
    this.playerPos = (<GameLevel>this.owner.getScene()).player.node.position;
    this.parent.direction.x =
      this.owner.position.x - this.playerPos.x > 0 ? 1 : -1;
    this.parent.direction.y = 0;
    this.stateName = SState.Knockback;
    this.knockbackTimer.start();
    this.stateName = "knockback";
  }

  update(deltaT: number) {
    super.update(deltaT);
    this.parent.velocity.x =
      this.parent.direction.x * this.parent.knockbackSpeed * deltaT;
    this.parent.velocity.y =
      this.parent.direction.y * this.parent.knockbackSpeed * deltaT;

    this.owner.move(this.parent.velocity);

    if (this.knockbackTimer.isStopped() && !this.isDying) {
      this.finished(SState.Following);
    }
  }

  onExit(): Record<string, any> {
    //(<AnimatedSprite>this.owner).animation.stop();
    return {};
  }
}
