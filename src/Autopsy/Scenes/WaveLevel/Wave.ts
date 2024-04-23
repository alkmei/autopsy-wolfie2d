import { EnemyType } from "@/globals";
export default class Wave{
    name: string;
    totalCount: number = 0;
    totalRemain:number;
    enemyCount: Record<string,number> = {
        [EnemyType.GHOST_RED]: 0,
    };
    enemyRemain: Record<string,number> = {
        [EnemyType.GHOST_RED]: 0,
    };
    spawnRate: number; //num enemies per sec
    
    constructor(enemies:number[]){
        this.enemyCount[EnemyType.GHOST_RED] = enemies[0];
        this.enemyRemain[EnemyType.GHOST_RED] = enemies[0];
        for(let num of enemies){
            this.totalCount += num;
        }
        this.totalRemain = this.totalCount;
    }
}