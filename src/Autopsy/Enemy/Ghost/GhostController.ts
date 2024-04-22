import StateMachineAI from "@/Wolfie2D/AI/StateMachineAI";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GhostState from "./GhostStates/GhostState";
import Drifting from "./GhostStates/Drifting";
import Following from "./GhostStates/Following";
import Knockback from "./GhostStates/Knockback";
import AnimatedSprite from "@/Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Dying from "./GhostStates/Dying";

export enum GState {
  Drifting = "drifting",
  Following = "following",
  Knockback = "knockback",
  Dying = "dying",
}

export default class GhostController extends StateMachineAI {
  owner: AnimatedSprite;
  //direction_op = [new Vec2(1,1),new Vec2(1,-1),new Vec2(-1,1),new Vec2(-1,-1)]
  direction: Vec2 = Vec2.ZERO;
  velocity: Vec2 = Vec2.ZERO;
  driftSpeed = 10;
  followSpeed = 30;
  knockbackSpeed = 150;
  gravity = 0;

  initializeAI(owner: AnimatedSprite, config: Record<string, any>) {
    this.owner = owner;

    this.direction = this.randomDirection();
    this.initializeStates();
  }

  initializeStates() {
    this.addState(GState.Drifting, new Drifting(this, this.owner));
    this.addState(GState.Following, new Following(this, this.owner));
    this.addState(GState.Knockback, new Knockback(this, this.owner));
    this.addState(GState.Dying, new Dying(this, this.owner));

    this.initialize(GState.Drifting);
  }

  update(deltaT: number) {
    super.update(deltaT);
    
    if (this.owner)
      this.owner.move(this.velocity);
  }

  randomDirection() {
    return Vec2.UP.rotateCCW(Math.random() * Math.PI * 2);
  }

  get state() {
    return <GhostState>this.stack.peek();
  }
}
