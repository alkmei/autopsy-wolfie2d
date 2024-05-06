import { HType } from "../Hitbox";
import HitboxState from "./HitboxState";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";

export default class Active extends HitboxState {
  onEnter(options: Record<string, any>) {
    this.stateName = HType.Active;
  }

  update(deltaT: number) {
    super.update(deltaT);
    let posX = this.parent.owningEntity.position.x + this.parent.offset.x;
    const posY = this.parent.owningEntity.position.y + this.parent.offset.y;
    if (this.parent.invertX) {
      posX = posX - this.parent.offset.x * 2;
      this.owner.invertX = true;
    }

    this.owner.position = new Vec2(posX, posY);

    if (!this.owner.animation.isPlaying("animation")) {
      this.owner.destroy();
    }
  }

  onExit(): Record<string, any> {
    return {};
  }
}
