import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import SpiderBossState from "./SpiderBossStates/SpiderBossState";
import Cocooned from "./SpiderBossStates/Cocooned";
import SpiderBoss from "./SpiderBoss";

export enum SpiderBossStates {
    Cocooned = "Cocooned",
}

export default class SpiderBossController extends StateMachineAI {
  owner: GameNode;
  boss: SpiderBoss;
  gravity = 0;

  initializeAI(owner: GameNode, config: Record<string, any>) {
    this.owner = owner;
    this.boss = config.boss;
    this.initializeStates();
  }

  initializeStates() {
    this.addState(SpiderBossStates.Cocooned, new Cocooned(this, this.owner, this.boss));

    this.initialize(SpiderBossStates.Cocooned);
  }

  update(deltaT: number) {
    super.update(deltaT);
  }

  get state() {
    return <SpiderBossState>this.stack.peek();
  }
}
