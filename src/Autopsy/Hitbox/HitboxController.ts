import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import HitboxState from "./HitboxStates/HitboxState";
import Active from "./HitboxStates/Active";
import { HState } from "./Hitbox";
import ManageHitbox from "./HitboxStates/ManageHitbox";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";

export default class HitboxController extends StateMachineAI {
  // The entity that this hitbox is coming from
  owningEntity: AnimatedSprite;

  owner: GameNode;
  velocity: Vec2 = Vec2.ZERO;
  invertX: boolean;
  offset: Vec2;
  eventType: string;

  initializeAI(owner: GameNode, config: Record<string, any>) {
    this.owner = owner;
    this.invertX = config.invertX;
    this.offset = config.offset;
    this.eventType = config.eventType;
    this.owningEntity = config.owner;
    // subscribe to events maybe

    this.initializeStates();
  }

  initializeStates() {
    // add states
    this.addState(HState.Active, new Active(this, this.owner));
    this.addState(HState.Manager, new ManageHitbox(this, this.owner));

    // add initial state
    this.initialize(HState.Manager);
  }

  update(deltaT: number) {
    super.update(deltaT);
  }

  get state() {
    return <HitboxState>this.stack.peek();
  }
}
