import PlayerActionState from "./PlayerActionState";
import Hitbox, { HType } from "@/Autopsy/Hitbox/Hitbox";
import Vec2 from "@/Wolfie2D/DataTypes/Vec2";
import { ActionState, PlayerAnimations, PlayerSounds } from "../../PlayerEnum";
import { Layers } from "@/Autopsy/Scenes/GameLevel";
import Timer from "@/Wolfie2D/Timing/Timer";
import { DamageType } from "@/Autopsy/Hitbox/DamageType";
import { GameEventType } from "@/Wolfie2D/Events/GameEventType";
import GameEvent from "@/Wolfie2D/Events/GameEvent";
import { Events } from "@/globals";
import HitboxController from "@/Autopsy/Hitbox/HitboxController";

export default class AttackDown extends PlayerActionState {
  hitBox: Hitbox;
  jumped: boolean;

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
        this.hitBox = new Hitbox(
          this.player.node,
          this.player.node
            .getScene()
            .add.animatedSprite("ScytheDown", Layers.Main),
          DamageType.TO_ENEMY,
          new Vec2(30, 32),
          this.player.node.invertX,
          offset,
          HType.Active,
        );
      },
      false,
    );
    this.jumped = false;

    timer.start();
  }

  onExit(): Record<string, any> {
    return {};
  }

  handleInput(event: GameEvent) {}

  update(deltaT: number): void {
    if (!this.owner.animation.isPlaying(PlayerAnimations.ScytheDown))
      this.player.actionStateMachine.changeState(ActionState.Idle);
    if (
      this.hitBox &&
      this.hitBox.node._ai &&
      !(this.hitBox.node._ai as HitboxController).state.hasHit &&
      !this.jumped
    ) {
      this.player.velocity.y = this.player.jumpVelocity;
      this.jumped = true;
    }
  }
}
