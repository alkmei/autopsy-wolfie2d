import GameEvent from "@/Wolfie2D/Events/GameEvent";
import WaveLevelState from "./WaveLevelState";
import Timer from "@/Wolfie2D/Timing/Timer";
import { WaveState } from "../WaveLevel";
import Enemy from "@/Autopsy/Enemy/Enemy";
import RandUtils from "@/Wolfie2D/Utils/RandUtils";
import { GhostType } from "@/Autopsy/Enemy/Ghost/Ghost";
import Tilemap from "@/Wolfie2D/Nodes/Tilemap";



export default class Spawning extends WaveLevelState{
    target: Enemy;
    enemyOp: string[];
    onEnter(options: Record<string, any>): void {
        this.spawnCD = new Timer(1000 / this.waveInfo[this.level.currentWave].spawnRate);
        this.curWaveInfo = this.waveInfo[this.level.currentWave];
        this.enemyOp = Object.keys(this.curWaveInfo.enemyRemain);
    }

    handleInput(event: GameEvent): void {
        
    }

    update(deltaT: number): void {
        //goto waiting state if no enemy need spawning
        if(this.curWaveInfo.totalRemain === 0){
            this.finished(WaveState.WAITING);
            return;
        }

        if(this.spawnCD.isStopped){
            //choose an enemy spawn type
            let chosenEnemy = this.enemyOp[Math.floor(Math.random() * this.enemyOp.length)];

            //loop until the chosen enemy type is one that still needs spawning
            while(this.curWaveInfo.enemyRemain[chosenEnemy] === 0){
                chosenEnemy = this.enemyOp[Math.floor(Math.random() * this.enemyOp.length)]
            }


            let worldSize = this.level.tilemap.size;
			// Loop on position until we're clear of the player, outside of 6 block radius(circle)
            //and the location has no block
			let spawnPos = RandUtils.randVec(0, worldSize.x, 0, worldSize.y);
			while(
                spawnPos.distanceTo(this.level.player.node.position) < 32 * 6 ||
                this.level.tilemap.getTileAtWorldPosition(spawnPos) !== 0){
				    spawnPos = RandUtils.randVec(0, worldSize.x, 0, worldSize.y);
			}

            switch(chosenEnemy){
                case('ghost_red'): 
                this.curWaveInfo.enemyRemain['ghost_red'] -= 1;
                this.curWaveInfo.totalRemain -= 1;
                this.level.addGhost(spawnPos, GhostType.RED);
                break;

                default:
            }

            this.spawnCD.start();
        }
    }

    onExit(): Record<string, any> {
        return {};
    }
}
