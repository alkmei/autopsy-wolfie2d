import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import HitboxState from "./HitboxStates/HitboxState";
import Active from "./HitboxStates/Active";
import { HState } from "./Hitbox";

export default class HitboxController extends StateMachineAI {
  owner: GameNode;
  direction: Vec2 = Vec2.ZERO;
  velocity: Vec2 = Vec2.ZERO;

  initializeAI(owner: GameNode, config: Record<string, any>) {
    this.owner = owner;

    // subscribe to events maybe

    this.initializeStates();
  }

  initializeStates() {
    // add states
    this.addState(HState.Active, new Active(this, this.owner));

    // add initial state
    this.initialize(HState.Active);
  }

  update(deltaT: number) {
    super.update(deltaT);
  }

  get state() {
    return <HitboxState>this.stack.peek();
  }
}
