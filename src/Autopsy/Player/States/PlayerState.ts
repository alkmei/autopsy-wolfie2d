import State from "../../../Wolfie2D/DataTypes/State/State";
import StateMachine from "../../../Wolfie2D/DataTypes/State/StateMachine";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import Input from "../../../Wolfie2D/Input/Input";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import Timer from "../../../Wolfie2D/Timing/Timer";
import PlayerController from "../PlayerController";
import { Action } from "../../../globals";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";

const physOffsetRight = new Vec2(5, 0);
const physOffsetLeft = new Vec2(-5, 0);

export default abstract class PlayerState extends State {
  owner: AnimatedSprite;
  parent: PlayerController;
  positionTimer: Timer;
  stateName: string; // For debug purposes

  constructor(parent: StateMachine, owner: GameNode) {
    super(parent);
    this.owner = <AnimatedSprite>owner;
    this.positionTimer = new Timer(250);
    this.positionTimer.start();
  }

  // Change the suit color on receiving a suit color change event
  handleInput(event: GameEvent): void {}

  /**
   * Get the inputs from the keyboard, or Vec2.Zero if nothing is being pressed
   */
  getInputDirection(): Vec2 {
    let direction = Vec2.ZERO;
    direction.x =
      (Input.isPressed("left") ? -1 : 0) + (Input.isPressed("right") ? 1 : 0);
    direction.y = Input.isJustPressed("jump") ? -1 : 0;
    return direction;
  }

  update(deltaT: number): void {
    let dir = 0;
    if (Input.isPressed(Action.Left)) {
      dir -= 1;
      this.owner.invertX = true;
      this.owner.colliderOffset = physOffsetLeft;
    }
    if (Input.isPressed(Action.Right)) {
      dir += 1;
      this.owner.invertX = false;
      this.owner.colliderOffset = physOffsetRight;
    }

    this.parent.velocity = this.owner.getLastVelocity();
    this.parent.velocity.x = dir * this.parent.speed * deltaT;
  }
}
