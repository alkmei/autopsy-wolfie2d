import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import StateMachine from "../../Wolfie2D/DataTypes/State/StateMachine";
import Grounded from "./States/Movement/Grounded";
import Updateable from "../../Wolfie2D/DataTypes/Interfaces/Updateable";
import Ascending from "./States/Movement/Ascending";
import Descending from "./States/Movement/Descending";
import Dashing from "./States/Actions/Dashing";

export enum MovementState {
  Grounded = "grounded",
  Ascending = "ascending",
  Descending = "descending",
}

export enum ActionState {
  Dash = "dash",
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
    this.actionStateMachine.addState(
      ActionState.Dash,
      new Dashing(this.movementStateMachine, this.node, this),
    );
  }

  updateGravity() {
    this.gravity = (2 * this.jumpHeight) / Math.pow(this.timeToApex, 2) / 10;
    this.jumpVelocity = -this.gravity * this.timeToApex;
  }

  update(deltaT: number): void {
    this.movementStateMachine.update(deltaT);
    this.node.move(this.velocity);
  }
}
