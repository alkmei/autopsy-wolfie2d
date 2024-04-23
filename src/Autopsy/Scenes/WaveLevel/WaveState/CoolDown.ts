import GameEvent from "@/Wolfie2D/Events/GameEvent";
import WaveLevelState from "./WaveLevelState";
import { WaveState } from "../WaveLevel";


export default class CoolDown extends WaveLevelState{
    onEnter(options: Record<string, any>): void {
        this.waveCD.start();
    }

    handleInput(event: GameEvent): void {
        
    }

    update(deltaT: number): void {

        if(this.waveCD.isStopped() && this.level.currentWave < this.waveInfo.length){
            this.finished(WaveState.SPAWNING);
        }
    }

    onExit(): Record<string, any> {
        return {};
    }
}
