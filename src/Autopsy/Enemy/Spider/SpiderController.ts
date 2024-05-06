import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import SpiderState from "./SpiderStates/SpiderState";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Following from "./SpiderStates/Following";
import Knockback from "./SpiderStates/Knockback";
import Dying from "./SpiderStates/Dying";
import Dashing from "./SpiderStates/Dashing";

export enum SState {
  Following = "following",
  Knockback = "knockback",
  Dying = "dying",
  Dashing = "dashing",
}

export default class SpiderController extends StateMachineAI {
  owner: AnimatedSprite;
  direction: Vec2 = Vec2.ZERO;
  velocity: Vec2 = Vec2.ZERO;
  followSpeed = 150;
  knockbackSpeed = 250;
  gravity = 0;

  initializeAI(owner: AnimatedSprite, config: Record<string, any>) {
    this.owner = owner;
    this.initializeStates();
  }

  initializeStates() {
    this.addState(SState.Knockback, new Knockback(this, this.owner));
    this.addState(SState.Dying, new Dying(this, this.owner));
    this.addState(SState.Following, new Following(this, this.owner));
    this.addState(SState.Dashing, new Dashing(this, this.owner));

    this.initialize(SState.Following);
  }

  update(deltaT: number) {
    super.update(deltaT);

    if (this.owner) this.owner.move(this.velocity);
  }

  get state() {
    return <SpiderState>this.stack.peek();
  }
}
