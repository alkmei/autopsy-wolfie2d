import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import WaveLevelState from "./WaveLevelState";
import { WaveState } from "../WaveLevel";

export default class Waiting extends WaveLevelState {
  onEnter(options: Record<string, any>): void {}

  handleInput(event: GameEvent): void {}

  update(deltaT: number): void {
    if (this.level.enemies.length === 0) {
      this.level.nextWave();
      if (this.level.currentWave < this.waveInfo.length) {
        this.level.waveLabel.text =
          "Wave: " + [this.level.currentWave + 1] + "/" + this.waveInfo.length;
        this.finished(WaveState.COOLDOWN);
        return;
      } else {
        this.level.displayLevelEnd();
        this.level.waveLabel.text = "Wave: Finished";
        this.finished(WaveState.COOLDOWN);
        return;
      }
    }
  }

  onExit(): Record<string, any> {
    return {};
  }
}
