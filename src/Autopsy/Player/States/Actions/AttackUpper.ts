import PlayerActionState from "./PlayerActionState";
import Hitbox from "../../../Hitbox/Hitbox";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import { ActionState, PlayerAnimations, PlayerSounds } from "../../PlayerEnum";
import { Layers } from "../../../Scenes/GameLevel";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import { DamageType } from "../../../Hitbox/DamageType";
import { GameEventType } from "../../../../Wolfie2D/Events/GameEventType";

export default class AttackUpper extends PlayerActionState {
  onEnter(options: Record<string, any>): void {
    this.stateName = "AttackUpper";
    this.owner.animation.playIfNotAlready(PlayerAnimations.ScytheUpper);
    this.emitter.fireEvent(GameEventType.PLAY_SFX, {
      key: PlayerSounds.Slash,
      loop: false,
      keepReference: false,
    });

    const offset = new Vec2(10, -60);

    const timer = new Timer(
      120,
      () => {
        const hitbox = new Hitbox(
          this.player.node,
          this.player.node
            .getScene()
            .add.animatedSprite("ScytheUpper", Layers.Main),
          DamageType.TO_ENEMY,
          new Vec2(0, 0),
          new Vec2(30, 32),
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
    if (!this.owner.animation.isPlaying(PlayerAnimations.ScytheUpper))
      this.player.actionStateMachine.changeState(ActionState.Idle);
  }
}
