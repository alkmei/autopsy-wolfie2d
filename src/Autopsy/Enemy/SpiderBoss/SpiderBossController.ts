import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import SpiderBossState from "./SpiderBossStates/SpiderBossState";
import Cocooned from "./SpiderBossStates/Cocooned";
import SpiderBoss from "./SpiderBoss";
import AnimatedSprite from "@/Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Dying from "./SpiderBossStates/Dying";

export enum SpiderBossStates {
    Cocooned = "Cocooned",
    Enraged = "Enraged",
    Dying = "Dying",
}

export default class SpiderBossController extends StateMachineAI {
  owner: AnimatedSprite;
  boss: SpiderBoss;
  gravity = 0;

  initializeAI(owner: AnimatedSprite, config: Record<string, any>) {
    this.owner = owner;
    this.boss = config.boss;
    this.initializeStates();
  }

  initializeStates() {
    this.addState(SpiderBossStates.Cocooned, new Cocooned(this, this.owner, this.boss));
    this.addState(SpiderBossStates.Dying, new Dying(this, this.owner, this.boss))

    this.initialize(SpiderBossStates.Cocooned);
  }

  update(deltaT: number) {
    super.update(deltaT);
  }

  get state() {
    return <SpiderBossState>this.stack.peek();
  }
}
