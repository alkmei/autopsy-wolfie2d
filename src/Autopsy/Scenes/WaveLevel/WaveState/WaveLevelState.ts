import Enemy from "@/Autopsy/Enemy/Enemy";
import State from "@/Wolfie2D/DataTypes/State/State";
import StateMachine from "@/Wolfie2D/DataTypes/State/StateMachine";
import GameEvent from "@/Wolfie2D/Events/GameEvent";
import Timer from "@/Wolfie2D/Timing/Timer";
import Wave from "../Wave";
import WaveLevel from "../WaveLevel";



export default abstract class WaveLevelState extends State{
  parent: StateMachine;
  enemiesAlive: Array<Enemy>;
  waveInfo: Wave[];
  curWaveInfo: Wave;
  level: WaveLevel;
 
  waveCD: Timer;
  spawnCD: Timer;

  constructor(parent: StateMachine, enemies: Array<Enemy>, waveInfo: Wave[], level: WaveLevel) {
    super(parent);
    this.enemiesAlive = enemies;
    this.waveInfo = waveInfo;
    this.level = level;

    this.waveCD = new Timer(2000);
  }


}