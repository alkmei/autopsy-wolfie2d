import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Grounded from "./States/Grounded";
import Ascending from "./States/Ascending";
import Descending from "./States/Descending";
import Dashing from "./States/Dashing";
import PlayerState from "./States/PlayerState";

export enum PState {
  Grounded = "grounded",
  Ascending = "ascending",
  Descending = "descending",
  Dashing = "dashing",
}

export default class PlayerController extends StateMachineAI {
  owner: GameNode;
  velocity: Vec2 = Vec2.ZERO;
  speed = 300;
  private timeToApex = 0.35;
  private jumpHeight = 20;
  gravity: number;
  jumpVelocity: number;

  initializeAI(owner: GameNode, config: Record<string, any>) {
    this.owner = owner;
    this.updateGravity();
    this.initializeStates();
  }

  initializeStates() {
    this.addState(PState.Grounded, new Grounded(this, this.owner));
    this.addState(PState.Ascending, new Ascending(this, this.owner));
    this.addState(PState.Descending, new Descending(this, this.owner));
    this.addState(PState.Dashing, new Dashing(this, this.owner));

    this.initialize(PState.Descending);
  }

  updateGravity() {
    this.gravity = (2 * this.jumpHeight) / Math.pow(this.timeToApex, 2) / 10;
    this.jumpVelocity = -this.gravity * this.timeToApex;
  }

  update(deltaT: number) {
    super.update(deltaT);
    this.owner.move(this.velocity);
  }

  get state() {
    return <PlayerState>this.stack.peek();
  }
}
