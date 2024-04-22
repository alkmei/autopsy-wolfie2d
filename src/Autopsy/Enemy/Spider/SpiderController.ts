import StateMachineAI from "@/Wolfie2D/AI/StateMachineAI";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import SpiderState from "./SpiderStates/SpiderState";
import AnimatedSprite from "@/Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Following from "./SpiderStates/Following";


export enum SState {
  Following = "following",
  Knockback = "knockback",
  Dying = "dying",
}

export default class SpiderController extends StateMachineAI {
  owner: AnimatedSprite;
  direction: Vec2 = Vec2.ZERO;
  velocity: Vec2 = Vec2.ZERO;
  followSpeed = 30;
  knockbackSpeed = 150;
  gravity = 0;

  initializeAI(owner: AnimatedSprite, config: Record<string, any>) {
    this.owner = owner;
    this.initializeStates();
  }

  initializeStates() {
    // this.addState(GState.Drifting, new Drifting(this, this.owner));
    // this.addState(GState.Following, new Following(this, this.owner));
    // this.addState(GState.Knockback, new Knockback(this, this.owner));
    // this.addState(GState.Dying, new Dying(this, this.owner));

    this.addState(SState.Following, new Following(this, this.owner));

    this.initialize(SState.Following);
  }

  update(deltaT: number) {
    super.update(deltaT);
    
    if (this.owner)
      this.owner.move(this.velocity);
  }

  get state() {
    return <SpiderState>this.stack.peek();
  }
}
