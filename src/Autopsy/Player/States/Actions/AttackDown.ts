import PlayerActionState from "./PlayerActionState";
import Hitbox from "@/Autopsy/Hitbox/Hitbox";
import Vec2 from "@/Wolfie2D/DataTypes/Vec2";
import { ActionState, PlayerAnimations, PlayerSounds } from "../../PlayerEnum";
import { Layers } from "@/Autopsy/Scenes/GameLevel";
import Timer from "@/Wolfie2D/Timing/Timer";
import { DamageType } from "@/Autopsy/Hitbox/DamageType";
import { GameEventType } from "@/Wolfie2D/Events/GameEventType";
import GameEvent from "@/Wolfie2D/Events/GameEvent";
import { Events } from "@/globals";

export default class AttackDown extends PlayerActionState {
  onEnter(options: Record<string, any>): void {
    this.stateName = "AttackDown";
    this.owner.animation.playIfNotAlready(PlayerAnimations.ScytheDown, false);
    this.emitter.fireEvent(GameEventType.PLAY_SFX, {
      key: PlayerSounds.Slash,
      loop: false,
      keepReference: false,
    });

    const offset = new Vec2(10, 60);

    const timer = new Timer(
      120,
      () => {
        new Hitbox(
          this.player.node,
          this.player.node
            .getScene()
            .add.animatedSprite("ScytheDown", Layers.Main),
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

  handleInput(event: GameEvent) {
    switch (event.type) {
      case Events.ENEMY_DAMAGE: {
        this.player.velocity.y = this.player.jumpVelocity;
      }
    }
  }

  update(deltaT: number): void {
    if (!this.owner.animation.isPlaying(PlayerAnimations.ScytheDown))
      this.player.actionStateMachine.changeState(ActionState.Idle);
  }
}
