import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import { HState } from "../Hitbox";
import HitboxState from "./HitboxState";

export default class Active extends HitboxState {
  onEnter(options: Record<string, any>) {
    this.stateName = HState.Active;
    this.owner.animation.play("animation", true);
  }

  update(deltaT: number) {
    super.update(deltaT);

    // if (!this.owner.animation.isPlaying("animation")) {
    //   this.owner.destroy();
    // }
  }

  handleInput(event: GameEvent): void {
    // handle events here
  }

  onExit(): Record<string, any> {
    return {};
  }
}
