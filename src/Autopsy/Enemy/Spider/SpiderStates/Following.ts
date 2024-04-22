import SpiderState from "./SpiderState";
import { SState } from "../SpiderController";
import GameLevel from "@/Autopsy/Scenes/GameLevel";

export default class Following extends SpiderState {
  onEnter(options: Record<string, any>) {
    this.stateName = "Following";
    // this.canFollow = true;
  }

  update(deltaT: number) {
    super.update(deltaT);

    // if (!this.withinXBlock(6)) this.canFollow = false;

    // this.parent.direction = this.owner.position.dirTo(this.playerPos);

    // this.parent.velocity.x =
    //   this.parent.direction.x * this.parent.followSpeed * deltaT;
    // this.parent.velocity.y =
    //   this.parent.direction.y * this.parent.followSpeed * deltaT;


    this.owner.move(this.parent.velocity);

    this.owner.rotation = this.angleToPlayer();
  }

  angleToPlayer() {
    this.playerPos = (<GameLevel>this.owner.getScene()).player.node.position;
    const dx = this.playerPos.x - this.owner.position.x;
    const dy = this.playerPos.y - this.owner.position.y;
    return -Math.atan2(dy, dx) + (0.5 * Math.PI);
  }

  onExit(): Record<string, any> {
    //(<AnimatedSprite>this.owner).animation.stop();
    return {};
  }
}
