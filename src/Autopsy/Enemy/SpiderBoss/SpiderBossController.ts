import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import SpiderBossState from "./SpiderBossStates/SpiderBossState";
import Cocooned from "./SpiderBossStates/Cocooned";
import SpiderBoss from "./SpiderBoss";
import AnimatedSprite from "@/Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Dying from "./SpiderBossStates/Dying";
import GameEvent from "@/Wolfie2D/Events/GameEvent";
import Enraged from "./SpiderBossStates/Enraged";

export enum SpiderBossStates {
  Cocooned = "Cocooned",
  Enraged = "Enraged",
  Dying = "Dying",
}

export enum SpiderBossEvents {
  Transition = "Transition",
}

export default class SpiderBossController extends StateMachineAI {
  owner: AnimatedSprite;
  boss: SpiderBoss;
  gravity = 0;

  initializeAI(owner: AnimatedSprite, config: Record<string, any>) {
    this.owner = owner;
    this.boss = config.boss;
    this.initializeStates();

    this.subscribe(SpiderBossEvents.Transition);
  }

  initializeStates() {
    this.addState(
      SpiderBossStates.Cocooned,
      new Cocooned(this, this.owner, this.boss),
    );
    this.addState(
      SpiderBossStates.Dying,
      new Dying(this, this.owner, this.boss),
    );
    this.addState(
      SpiderBossStates.Enraged,
      new Enraged(this, this.owner, this.boss),
    );

    this.initialize(SpiderBossStates.Cocooned);
  }

  handleEvent(event: GameEvent): void {
    switch (event.type) {
      case SpiderBossEvents.Transition: {
        this.changeState(SpiderBossStates.Enraged);
      }
    }
  }

  update(deltaT: number) {
    super.update(deltaT);
  }

  get state() {
    return <SpiderBossState>this.stack.peek();
  }
}
