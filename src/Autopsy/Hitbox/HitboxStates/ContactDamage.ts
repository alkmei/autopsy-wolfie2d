import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import { HState } from "../Hitbox";
import HitboxState from "./HitboxState";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameLevel from "../../Scenes/GameLevel";
import { DamageType } from "../DamageType";
import { Events } from "../../../globals";
import Timer from "../../../Wolfie2D/Timing/Timer";

export default class ContactDamage extends HitboxState {
	cooldown: Timer;

  onEnter(options: Record<string, any>) {
    this.stateName = HState.Contact;
		this.cooldown = new Timer(1000);
  }

  update(deltaT: number) {
    super.update(deltaT);
    const player = (<GameLevel>this.owner.getScene()).player.node;

    // Check player collision and damage if colliding
    if (this.cooldown.isStopped() && this.owner.collisionShape.overlaps(player.collisionShape)) {
      this.emitter.fireEvent(Events.PLAYER_DAMAGE);
			this.cooldown.start();
    }
  }

  handleInput(event: GameEvent): void {
    // handle events here
  }

  onExit(): Record<string, any> {
    return {};
  }
}
