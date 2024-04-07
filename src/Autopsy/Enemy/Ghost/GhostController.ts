import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GhostState from "./GhostStates/GhostState";
import Drifting from "./GhostStates/Drifting";
import Following from "./GhostStates/Following";

export enum GState {
  Drifting = "drifting",
  Following = "following",
}

export default class GhostController extends StateMachineAI {
  owner: GameNode;
  direction: Vec2 = Vec2.ZERO;
  velocity: Vec2 = Vec2.ZERO;
  driftSpeed = 50;
  followSpeed = 100;
  gravity = 0;

  initializeAI(owner: GameNode, config: Record<string, any>) {
    this.owner = owner;
    this.direction = this.randomDirection();
    this.initializeStates();
  }

  initializeStates() {
    this.addState(GState.Drifting, new Drifting(this, this.owner));
    this.addState(GState.Following, new Following(this, this.owner));
    this.initialize(GState.Drifting);
  }

  update(deltaT: number) {
    super.update(deltaT);
    this.owner.move(this.velocity);
  }

  randomDirection() {
    return Vec2.UP.rotateCCW(Math.random() * Math.PI * 2);
  }

  get state() {
    return <GhostState>this.stack.peek();
  }
}
