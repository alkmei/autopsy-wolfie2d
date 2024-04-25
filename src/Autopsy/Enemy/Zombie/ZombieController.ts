import StateMachineAI from "@/Wolfie2D/AI/StateMachineAI";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "@/Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Dying from "./ZombieStates/Dying";
import Walking from "./ZombieStates/Walking";
import Idle from "./ZombieStates/Idle";
import Attacking from "./ZombieStates/Walking";
import ZombieState from "./ZombieStates/ZombieState";
import OrthogonalTilemap from "@/Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";

export enum ZState {
  Idle = "Idle",
  Walking = "Walking",
  Dying = "Dying",
  Knockback = "Knockback",
  Attacking = "Attacking",
}

export default class GhostController extends StateMachineAI {
  owner: AnimatedSprite;
  direction: Vec2 = Vec2.RIGHT;
  velocity: Vec2 = Vec2.ZERO;
  speed = 20;
  knockbackSpeed = 25;
  gravity = 980;
  tilemap: OrthogonalTilemap;

  initializeAI(owner: AnimatedSprite, config: Record<string, any>) {
    this.owner = owner;
    //this.direction = this.randomDirection();
    this.tilemap = config.tilemap;
    this.initializeStates();
  }

  initializeStates() {
    this.addState(ZState.Idle, new Idle(this, this.owner));
    this.addState(ZState.Walking, new Walking(this, this.owner));
    //this.addState(ZState.Knockback, new Knockback(this, this.owner));
    this.addState(ZState.Attacking, new Attacking(this, this.owner));
    this.addState(ZState.Dying, new Dying(this, this.owner));

    this.initialize(ZState.Idle);
  }

  update(deltaT: number) {
    super.update(deltaT);

    //if (this.owner)
    //this.owner.move(this.velocity);
  }

  randomDirection() {
    return Vec2.UP.rotateCCW(Math.random() * Math.PI * 2);
  }

  get state() {
    return <ZombieState>this.stack.peek();
  }
}
