import Wave from "./Wave";
import GameLevel from "../GameLevel";
import Timer from "@/Wolfie2D/Timing/Timer";
import { UIElementType } from "@/Wolfie2D/Nodes/UIElements/UIElementTypes";
import { Layers } from "../GameLevel";
import Label from "@/Wolfie2D/Nodes/UIElements/Label";
import Vec2 from "@/Wolfie2D/DataTypes/Vec2";
import Color from "@/Wolfie2D/Utils/Color";
import StateMachine from "@/Wolfie2D/DataTypes/State/StateMachine";
import CoolDown from "./WaveState/CoolDown";
import Spawning from "./WaveState/Spawning";
import Waiting from "./WaveState/Waiting";
import OrthogonalTilemap from "@/Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import Ghost from "@/Autopsy/Enemy/Ghost/Ghost";

export enum WaveState{
    SPAWNING = "spawning",
    WAITING = "waiting",
    COOLDOWN = "cooldown",
}

export default class WaveLevel extends GameLevel {
    waves: Wave[] = [];
    //waveCD: Timer = new Timer(5000);

    waveStateMachine: StateMachine;

    waveLabel: Label;
    private curWave = 0

    private LevelEndPos: Vec2;
    private LevelEndSize: Vec2;

    tilemap: OrthogonalTilemap;

    startWave(): void {
        this.initWaveUI()
        this.initWaveState();
        //this.waveCD.start();

    }

    initWaveUI() {
        this.waveLabel = <Label>this.add.uiElement(UIElementType.LABEL, Layers.UI, {
          position: new Vec2(500, 30),
          text: "Wave: "+[this.curWave+1]+"/"+this.waves.length,
        });
        //this.waveLabel.size = new Vec2(600, 50);
        this.waveLabel.textColor = Color.WHITE;
    }

    initWaveState() {
        this.waveStateMachine = new StateMachine();
        this.waveStateMachine
          .addState(
            WaveState.COOLDOWN,
            new CoolDown(this.waveStateMachine, this.enemies,this.waves,this),
          )
          .addState(
            WaveState.SPAWNING,
            new Spawning(this.waveStateMachine, this.enemies,this.waves,this),
          )
          .addState(
            WaveState.WAITING,
            new Waiting(this.waveStateMachine, this.enemies,this.waves,this),
          )
          .initialize(WaveState.COOLDOWN);
      }

    update(deltaT: number): void {
        super.update(deltaT);
        this.waveStateMachine.update(deltaT);
    }

    get currentWave(){
        return this.curWave;
    }
    set setTilemap(t: OrthogonalTilemap){
        this.tilemap = t;
    }
    nextWave(){
        this.curWave +=1;
    }

    setLevelEndArea(pos:Vec2, size:Vec2){
        this.LevelEndPos = pos;
        this.LevelEndSize = size;
    }

    displayLevelEnd(){
        this.addLevelEnd(this.LevelEndPos, this.LevelEndSize);
    }

    addGhost(pos: Vec2, type: string){
        const ghost = new Ghost(
            this.add.animatedSprite("RedSoul", Layers.Main),
            new Vec2(pos.x, pos.y),
            type,
            );
        this.enemies.push(ghost);
    }

}