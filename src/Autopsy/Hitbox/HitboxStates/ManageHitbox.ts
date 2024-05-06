import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import { HState } from "../Hitbox";
import HitboxState from "./HitboxState";

// This state tells the hitbox what type of hitbox it will end up as.
export default class ManageHitbox extends HitboxState {
  onEnter(options: Record<string, any>) {
    this.stateName = HState.Manager;
  }

  update(deltaT: number) {
    super.update(deltaT);

    this.finished(HState.Active);
  }

  handleInput(event: GameEvent): void {
    // handle events here
  }

  onExit(): Record<string, any> {
    return {};
  }
}
