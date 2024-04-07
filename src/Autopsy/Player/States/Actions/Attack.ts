import PlayerActionState from "./PlayerActionState";
import Hitbox from "../../../Hitbox/Hitbox";
import { Events } from "../../../../globals";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import { ActionState } from "../../Player";
import { Layers } from "../../../Scenes/GameLevel";
import Timer from "../../../../Wolfie2D/Timing/Timer";

export default class Attack extends PlayerActionState {
  onEnter(options: Record<string, any>): void {
    this.stateName = "Attack";
    this.owner.animation.playIfNotAlready("Scythe Slash");

    const sprite = this.player.node
      .getScene()
      .add.animatedSprite("ScytheSlash", Layers.Main);
    let posX = this.owner.position.x + 50;
    let posY = this.owner.position.y;
    if (this.player.node.invertX) {
      posX = posX - 100;
      sprite.invertX = true;
    }

    const offset = new Vec2(60, 0);

    const timer = new Timer(
      100,
      () => {
        let hitbox = new Hitbox(
          this.owner,
          sprite,
          new Vec2(posX, posY),
          Events.ENEMY_DAMAGE,
          new Vec2(0, 0),
          new Vec2(48, 16),
          this.player.node.invertX,
          offset
        );
      },
      false,
    );

    timer.start();
  }

  onExit(): Record<string, any> {
    return {};
  }

  update(deltaT: number): void {
    if (!this.owner.animation.isPlaying("Scythe Slash"))
      this.player.actionStateMachine.changeState(ActionState.Idle);
  }
}
