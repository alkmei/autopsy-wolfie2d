import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import StateMachine from "../../Wolfie2D/DataTypes/State/StateMachine";
import Grounded from "./States/Movement/Grounded";
import Updateable from "../../Wolfie2D/DataTypes/Interfaces/Updateable";
import Ascending from "./States/Movement/Ascending";
import Descending from "./States/Movement/Descending";
import Dashing from "./States/Actions/Dashing";
import Idle from "./States/Actions/Idle";
import Jump from "./States/Actions/Jump";
import { Action } from "../../globals";
import Attack from "./States/Actions/Attack";

export enum MovementState {
  Grounded = "grounded",
  Ascending = "ascending",
  Descending = "descending",
}

export enum ActionState {
  Dash = "dash",
  Attack = "attack",
  Idle = "idle",
  Jump = "jump",
}

export enum PlayerEvents {
  Jump = "ev_jump",
}

export default class Player implements Updateable {
  node: AnimatedSprite;
  health: number;
  velocity: Vec2 = new Vec2();
  speed = 300;
  private timeToApex = 0.35;
  private jumpHeight = 20;
  gravity: number;
  jumpVelocity: number;

  movementStateMachine: StateMachine;
  actionStateMachine: StateMachine;

  constructor(sprite: AnimatedSprite) {
    this.node = sprite;
    this.node.addPhysics(new AABB(new Vec2(0, 0), new Vec2(18, 24)));
    this.node.position = new Vec2(100, 50);
    this.node.animation.play("Idle", true);
    this.health = 10;
    this.updateGravity();
    this.initializeAI();
  }

  initializeAI() {
    this.movementStateMachine = new StateMachine();
    this.movementStateMachine
      .addState(
        MovementState.Grounded,
        new Grounded(this.movementStateMachine, this.node, this),
      )
      .addState(
        MovementState.Ascending,
        new Ascending(this.movementStateMachine, this.node, this),
      )
      .addState(
        MovementState.Descending,
        new Descending(this.movementStateMachine, this.node, this),
      )
      .initialize(MovementState.Grounded);

    this.actionStateMachine = new StateMachine();
    this.actionStateMachine
      .addState(
        ActionState.Dash,
        new Dashing(this.actionStateMachine, this.node, this),
      )
      .addState(
        ActionState.Idle,
        new Idle(this.actionStateMachine, this.node, this),
      )
      .addState(
        ActionState.Jump,
        new Jump(this.actionStateMachine, this.node, this),
      )
      .addState(
        ActionState.Attack,
        new Attack(this.actionStateMachine, this.node, this),
      )
      .initialize(ActionState.Idle);
  }

  updateGravity() {
    this.gravity = (2 * this.jumpHeight) / Math.pow(this.timeToApex, 2) / 10;
    this.jumpVelocity = -this.gravity * this.timeToApex;
  }

  update(deltaT: number): void {
    this.movementStateMachine.update(deltaT);
    this.actionStateMachine.update(deltaT);
    this.node.move(this.velocity);
  }
}
