import Vec2 from "@/Wolfie2D/DataTypes/Vec2";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import { SState } from "../SpiderController";
import SpiderState from "./SpiderState";
import GameLevel from "@/Autopsy/Scenes/GameLevel";

export default class Dashing extends SpiderState {
  private dashTimer: Timer;
  private pauseTimer: Timer;
  private playerPosSnapshot: Vec2;
  private isDashing: boolean;

  onEnter(options: Record<string, any>): void {
    this.dashTimer = new Timer(
        350,
        () => this.finished(SState.Following),
        false,
      );
    this.pauseTimer = new Timer (
        1000,
        () => {
          this.dashTimer.start();
          this.isDashing = true;
        },
        false,
    );
    this.pauseTimer.start();
    this.isDashing = false;
    this.playerPosSnapshot = (<GameLevel>this.owner.getScene()).player.node.position;
  }

  update(deltaT: number) {
    if (this.isDashing) {
        const dirToPlayer = new Vec2(this.playerPosSnapshot.x - this.owner.position.x, this.playerPosSnapshot.y - this.owner.position.y).normalize();
        this.parent.velocity = dirToPlayer.scale(400 * deltaT);
    } else {
      this.parent.velocity = Vec2.ZERO;
    }
    this.owner.rotation = this.angleToPlayer();
  }

  onExit(): Record<string, any> {
    return {};
  }
}
