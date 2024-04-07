import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import { HState } from "../Hitbox";
import HitboxState from "./HitboxState";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Hitbox from "../Hitbox";

export default class BasicSlash extends HitboxState {
  onEnter(options: Record<string, any>) {
    this.stateName = HState.Active;
    this.owner.animation.play("animation", false);
  }

  update(deltaT: number) {
    super.update(deltaT);

    let posX = this.parent.player.position.x + this.parent.offset.x;
    let posY = this.parent.player.position.y + this.parent.offset.y;
    if (this.parent.invertX) {
      posX = posX - this.parent.offset.x * 2;
      posY = posY - this.parent.offset.y * 2;
      this.owner.invertX = true;
    }
    
    this.owner.position = new Vec2(posX, posY);

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
