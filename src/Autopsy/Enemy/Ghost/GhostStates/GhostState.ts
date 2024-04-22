import State from "../../../../Wolfie2D/DataTypes/State/State";
import StateMachine from "../../../../Wolfie2D/DataTypes/State/StateMachine";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import GhostController from "../GhostController";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import GameLevel from "../../../Scenes/GameLevel";
import GameNode from "../../../../Wolfie2D/Nodes/GameNode";
import { Events } from "../../../../globals";
import Dying from "@/Autopsy/Enemy/Ghost/GhostStates/Dying";

export default abstract class GhostState extends State {
  owner: AnimatedSprite;
  parent: GhostController;
  followingCDTimer: Timer;
  stuckTimer: Timer;
  contactCooldown: Timer;
  knockbackTimer: Timer;
  playerPos: Vec2;
  canFollow: boolean;
  isDying: boolean;
  stateName: string; // For debug purposes

  constructor(parent: StateMachine, owner: AnimatedSprite) {
    super(parent);
    this.owner = owner;
    this.followingCDTimer = new Timer(10000);
    this.stuckTimer = new Timer(5000); // check if a ghost is stuck for too long
    this.contactCooldown = new Timer(1000);
    this.knockbackTimer = new Timer(500);
    this.isDying = false;
  }

  handleInput(event: GameEvent): void {}

  /**
   * check if this node is within x block of player.
   * A x by x square area with player as center
   */
  withinXBlock(x: number) {
    this.playerPos = (<GameLevel>this.owner.getScene()).player.node.position;
    return (
      Math.abs(this.owner.position.x - this.playerPos.x) <= 32 * x &&
      Math.abs(this.owner.position.y - this.playerPos.y) <= 32 * x
    );
  }

  update(deltaT: number): void {
    if (this.owner.onWall) {
      // Flip around
      this.parent.direction.x *= -1;
      (<AnimatedSprite>this.owner).invertX = !(<AnimatedSprite>this.owner)
        .invertX;
    }

    if (
      this.contactCooldown.isStopped() &&
      !this.isDying &&
      this.owner.collisionShape.overlaps(
        (<GameLevel>this.owner.getScene()).player.node.collisionShape,
      )
    ) {
      this.emitter.fireEvent(Events.PLAYER_DAMAGE);
      this.contactCooldown.start();
    }

    if (this.owner.onCeiling || this.owner.onGround) {
      this.parent.direction.y *= -1;
    }
  }
}
