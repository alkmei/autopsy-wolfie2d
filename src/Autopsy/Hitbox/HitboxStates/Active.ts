import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import { HState } from "../Hitbox";
import HitboxState from "./HitboxState";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameLevel from "../../Scenes/GameLevel";
import { DamageType } from "../DamageType";
import { Events } from "../../../globals";

export default class Active extends HitboxState {
  onEnter(options: Record<string, any>) {
    this.stateName = HState.Active;
  }

  update(deltaT: number) {
    super.update(deltaT);
    const player = (<GameLevel>this.owner.getScene()).player.node;
    let posX = player.position.x + this.parent.offset.x;
    const posY = player.position.y + this.parent.offset.y;
    if (this.parent.invertX) {
      posX = posX - this.parent.offset.x * 2;
      // posY = posY - this.parent.offset.y * 2;
      this.owner.invertX = true;
    }

    this.owner.position = new Vec2(posX, posY);

    // Hitbox damaging enemies
    if (this.hasHit) {
      if (this.parent.eventType === DamageType.TO_ENEMY) {
        const enemies = (<GameLevel>this.owner.getScene()).enemies;
        enemies.forEach(enemy => {
          if (this.owner.collisionShape.overlaps(enemy.node.collisionShape)) {
            this.emitter.fireEvent(Events.ENEMY_DAMAGE, {
              enemy: enemy,
              damage: 1,
            });
            this.hasHit = false;
            enemy.knockback();
          }
        });
      }

      // Hitbox damaging player
      if (this.parent.eventType === DamageType.TO_PLAYER) {
        if (this.owner.collisionShape.overlaps(player.collisionShape)) {
          this.emitter.fireEvent(Events.PLAYER_DAMAGE);
          this.hasHit = false;
        }
      }
    }

    if (!this.owner.animation.isPlaying("animation")) {
      this.owner.destroy();
    }
  }

  handleInput(event: GameEvent): void {
    // handle events here
  }

  onExit(): Record<string, any> {
    return {};
  }
}
