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
import Attack from "./States/Actions/Attack";
import AttackDown from "./States/Actions/AttackDown";
import AttackUpper from "./States/Actions/AttackUpper";
import { Events, PhysicsGroups, SpriteSizes } from "@/globals";
import Dead from "./States/Actions/Dead";
import {
  ActionState,
  MovementState,
  PlayerAnimations,
  PlayerSounds,
} from "@/Autopsy/Player/PlayerEnum";
import Emitter from "@/Wolfie2D/Events/Emitter";
import MathUtils from "@/Wolfie2D/Utils/MathUtils";
import { GameEventType } from "@/Wolfie2D/Events/GameEventType";
import Timer from "@/Wolfie2D/Timing/Timer";
import GameEvent from "@/Wolfie2D/Events/GameEvent";
import Receiver from "@/Wolfie2D/Events/Receiver";

export default class Player implements Updateable {
  node: AnimatedSprite;

  // Player related variables
  maxHealth: number;
  health: number;
  velocity: Vec2 = new Vec2();
  speed = 300;
  private timeToApex = 0.35;
  private jumpHeight = 20;
  gravity: number;
  jumpVelocity: number;
  canDash: boolean;
  lastGroundedPosition: Vec2;
  attackCooldown: Timer;
  invincible: boolean;
  debugInvincible: boolean;

  // State Machines
  movementStateMachine: StateMachine;
  actionStateMachine: StateMachine;

  // General
  private emitter: Emitter;
  private receiver: Receiver;

  constructor(sprite: AnimatedSprite) {
    this.node = sprite;
    this.node.addPhysics(new AABB(new Vec2(0, 0), SpriteSizes.PLAYER));
    this.node.setGroup(PhysicsGroups.PLAYER_PHYS);
    this.node.position = new Vec2(100, 50);
    this.node.animation.play(PlayerAnimations.Idle, true);
    this.maxHealth = 10;
    this.health = 10;
    this.emitter = new Emitter();
    this.receiver = new Receiver();

    // this.receiver.subscribe(Events.ENEMY_DAMAGE);
    this.updateGravity();
    this.initializeAI();
    this.attackCooldown = new Timer(300);
  }

  changeHealth(dHealth: number) {
    if (this.health <= 0) return;
    if (dHealth < 0) {
      this.node.animation.play(PlayerAnimations.TakeDamage);
      this.emitter.fireEvent(GameEventType.PLAY_SFX, {
        key: PlayerSounds.Hurt,
        loop: false,
        holdReference: false,
      });
    } else if (dHealth > 0 && this.health != this.maxHealth) {
      this.emitter.fireEvent(GameEventType.PLAY_SFX, {
        key: PlayerSounds.Heal,
        loop: false,
        holdReference: false,
      });
    }

    const changedHP = this.health + dHealth;
    this.health = MathUtils.clamp(changedHP, 0, this.maxHealth);
    if (changedHP <= 0) {
      this.actionStateMachine.changeState(ActionState.Dead);
      this.emitter.fireEvent(Events.PLAYER_DEATH);
    }
  }

  updateGravity() {
    this.gravity = (2 * this.jumpHeight) / Math.pow(this.timeToApex, 2) / 10;
    this.jumpVelocity = -this.gravity * this.timeToApex;
  }

  handleEvent(event: GameEvent) {
    this.movementStateMachine.handleEvent(event);
    this.actionStateMachine.handleEvent(event);
  }

  update(deltaT: number): void {
    while (this.receiver.hasNextEvent())
      this.handleEvent(this.receiver.getNextEvent());
    this.movementStateMachine.update(deltaT);
    this.actionStateMachine.update(deltaT);
    this.node.move(this.velocity);
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
      .addState(
        ActionState.AttackUpper,
        new AttackUpper(this.actionStateMachine, this.node, this),
      )
      .addState(
        ActionState.AttackDown,
        new AttackDown(this.actionStateMachine, this.node, this),
      )
      .addState(
        ActionState.Dead,
        new Dead(this.actionStateMachine, this.node, this),
      )
      .initialize(ActionState.Idle);
  }
}
