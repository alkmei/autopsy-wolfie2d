import { EnemyType } from "@/globals";
export default class Wave{
    name: string;
    totalCount: number = 0;
    totalRemain:number;
    enemyCount: Record<string,number> = {
        [EnemyType.GHOST_RED]: 0,
        [EnemyType.SPIDER]: 0,
        [EnemyType.ZOMBIE]: 0,
    };
    enemyRemain: Record<string,number> = {
        [EnemyType.GHOST_RED]: 0,
        [EnemyType.SPIDER]: 0,
        [EnemyType.ZOMBIE]: 0,
    };
    spawnRate: number; //num enemies per sec
    

    /**
     * input a number array of length 3, 1st number is the number of ghost, 2nd: the number of spider, 3rd: the number of zombies 
     * @param enemies 
     */
    constructor(enemies:number[]=[0,0,0]){
        this.enemyCount[EnemyType.GHOST_RED] = enemies[0];
        this.enemyRemain[EnemyType.GHOST_RED] = enemies[0];

        this.enemyCount[EnemyType.SPIDER] = enemies[1];
        this.enemyRemain[EnemyType.SPIDER] = enemies[1];

        this.enemyCount[EnemyType.ZOMBIE] = enemies[2];
        this.enemyRemain[EnemyType.ZOMBIE] = enemies[2];

        for(let num of enemies){
            this.totalCount += num;
        }
        this.totalRemain = this.totalCount;
    }
}