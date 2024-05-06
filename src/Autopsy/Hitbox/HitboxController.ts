import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import HitboxState from "./HitboxStates/HitboxState";
import Active from "./HitboxStates/Active";
import { HType } from "./Hitbox";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Projectile from "./HitboxStates/Projectile";

export default class HitboxController extends StateMachineAI {
  // The entity that this hitbox is coming from
  owningEntity: AnimatedSprite;

  owner: GameNode;
  velocity: Vec2 = Vec2.ZERO;
  invertX: boolean;
  offset: Vec2;
  eventType: string;
  type: string;
  initPos: Vec2;

  initializeAI(owner: GameNode, config: Record<string, any>) {
    this.owner = owner;
    this.invertX = config.invertX;
    this.offset = config.offset;
    this.eventType = config.eventType;
    this.owningEntity = config.owner;
    this.type = config.type;
    this.velocity = config.velocity;
    this.initPos = config.initPos;

    this.initializeStates();
  }

  initializeStates() {
    // add states
    this.addState(HType.Active, new Active(this, this.owner));
    this.addState(HType.Projectile, new Projectile(this, this.owner));

    // add initial state
    switch (this.type) {
      case HType.Active:
        this.initialize(HType.Active);
        break;
      case HType.Projectile:
        this.initialize(HType.Projectile);
        break;
    }
  }

  update(deltaT: number) {
    super.update(deltaT);
  }

  get state() {
    return <HitboxState>this.stack.peek();
  }
}
