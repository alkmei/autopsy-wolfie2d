import Vec2 from "@/Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import { HType } from "../Hitbox";
import HitboxState from "./HitboxState";

export default class Projectile extends HitboxState {
  onEnter(options: Record<string, any>) {
    this.stateName = HType.Projectile;
    this.owner.position = this.parent.initPos;
    this.owner.animation.play("animation", true);
  }

  update(deltaT: number) {
    super.update(deltaT);

    this.owner.move(
      new Vec2(
        this.parent.velocity.x * deltaT,
        this.parent.velocity.y * deltaT,
      ),
    );

    if (this.parent.invertX) this.owner.invertX = true;

    if (
      this.owner.position.distanceTo(this.parent.owningEntity.position) > 600 ||
      !this.hasHit ||
      this.owner.isColliding
    ) {
      this.owner.destroy();
    }
  }

  onExit(): Record<string, any> {
    return {};
  }
}
