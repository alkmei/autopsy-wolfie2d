import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import Input from "../../Wolfie2D/Input/Input";
import { Action } from "../../globals";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Grounded from "./States/Grounded";

export default class PlayerController extends StateMachineAI {
  owner: GameNode;
  velocity: Vec2 = Vec2.ZERO;
  private speed = 300;
  private timeToApex = 0.35;
  private jumpHeight = 70;
  gravity: number;
  jumpVelocity: number;

  initializeAI(owner: GameNode, config: Record<string, any>) {
    this.owner = owner;
    this.updateGravity();
    this.initializeStates();
  }

  initializeStates() {
    const grounded = new Grounded(this, this.owner);
    this.addState("grounded", grounded);
    this.initialize("grounded");
  }

  updateGravity() {
    this.gravity = (2 * this.jumpHeight) / Math.pow(this.timeToApex, 2) / 10;
    this.jumpVelocity = -this.gravity * this.timeToApex;
  }

  update(deltaT: number) {
    super.update(deltaT);
    this.owner.move(this.velocity);
  }
}
