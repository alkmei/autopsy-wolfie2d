import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import Input from "../../Wolfie2D/Input/Input";
import { Action } from "../../globals";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";

export default class PlayerController extends StateMachineAI {
  protected owner: GameNode;
  private speed = 300;
  private timeToApex = 0.35;
  private jumpHeight = 70;
  private gravity: number;
  private jumpVelocity: number;

  initializeAI(owner: GameNode, config: Record<string, any>) {
    this.owner = owner;
    this.updateGravity();
  }

  updateGravity() {
    this.gravity = (2 * this.jumpHeight) / Math.pow(this.timeToApex, 2) / 10;
    this.jumpVelocity = -this.gravity * this.timeToApex;
  }

  update(deltaT: number) {
    let dir = 0;
    if (Input.isPressed(Action.Left)) dir -= 1;
    if (Input.isPressed(Action.Right)) dir += 1;

    const velocity = this.owner.getLastVelocity();
    velocity.x = dir * 100 * deltaT;

    velocity.y += (this.gravity / 10) * deltaT;

    this.owner.move(velocity);
  }
}
