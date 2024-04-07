import PlayerActionState from "./PlayerActionState";
import Hitbox from "../../../Hitbox/Hitbox";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import { ActionState } from "../../Player";
import { Layers } from "../../../Scenes/GameLevel";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import { DamageType } from "../../../Hitbox/DamageType";

export default class Attack extends PlayerActionState {
  onEnter(options: Record<string, any>): void {
    this.stateName = "Attack";
    this.owner.animation.playIfNotAlready("Scythe Slash");

    const offset = new Vec2(60, 0);

    const sprite = this.player.node
      .getScene()
      .add.animatedSprite("ScytheSlash", Layers.Main);

    const timer = new Timer(
      100,
      () => {
        let hitbox = new Hitbox(
          this.owner,
          sprite,
          DamageType.TO_ENEMY,
          new Vec2(0, 0),
          new Vec2(48, 16),
          this.player.node.invertX,
          offset,
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
