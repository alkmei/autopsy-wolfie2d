import PlayerActionState from "./PlayerActionState";
import Hitbox from "../../../Hitbox/Hitbox";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import { ActionState } from "../../Player";
import { Layers } from "../../../Scenes/GameLevel";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import { DamageType } from "../../../Hitbox/DamageType";

export default class AttackDown extends PlayerActionState {
  onEnter(options: Record<string, any>): void {
    this.stateName = "AttackDown";
    this.owner.animation.playIfNotAlready("Scythe Down");

    const offset = new Vec2(40, 0);

    const sprite = this.player.node
      .getScene()
      .add.animatedSprite("ScytheDown", Layers.Main);

    const timer = new Timer(
      250,
      () => {
        let hitbox = new Hitbox(
          this.owner,
          sprite,
          DamageType.TO_ENEMY,
          new Vec2(0, 0),
          new Vec2(24, 48),
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
    if (!this.owner.animation.isPlaying("Scythe Down"))
      this.player.actionStateMachine.changeState(ActionState.Idle);
  }
}
