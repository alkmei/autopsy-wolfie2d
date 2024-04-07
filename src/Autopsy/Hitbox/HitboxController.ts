import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import HitboxState from "./HitboxStates/HitboxState";
import BasicSlash from "./HitboxStates/BasicSlash";
import { HState } from "./Hitbox";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";

export default class HitboxController extends StateMachineAI {
  player: AnimatedSprite;
  owner: GameNode;
  velocity: Vec2 = Vec2.ZERO;
  invertX: boolean;
  offset: Vec2;

  initializeAI(owner: GameNode, config: Record<string, any>) {
    this.owner = owner;
    this.player = config.player;
    this.invertX = config.invertX;
    this.offset = config.offset;

    // subscribe to events maybe

    this.initializeStates();
  }

  initializeStates() {
    // add states
    this.addState(HState.Active, new BasicSlash(this, this.owner));

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
