import State from "../../../../Wolfie2D/DataTypes/State/State";
import StateMachine from "../../../../Wolfie2D/DataTypes/State/StateMachine";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import GameNode from "../../../../Wolfie2D/Nodes/GameNode";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import GhostController from "../GhostController";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { Events } from "../../../Event_enum";

export default abstract class GhostState extends State {
  owner: GameNode;
  parent: GhostController;
  followingCDTimer: Timer;
  stuckTimer: Timer;
  playerPos: Vec2;
  canFollow: boolean;
  stateName: string; // For debug purposes

  constructor(parent: StateMachine, owner: GameNode) {
    super(parent);
    this.owner = owner;
    this.followingCDTimer = new Timer(10000);
    this.stuckTimer = new Timer(5000); //check if a ghost is stuck for too long
  }

  // get the player postion
  handleInput(event: GameEvent): void {
    if (event.type == Events.PLAYER_MOVE) {
      this.playerPos = event.data.get("pos");
      this.canFollow = this.withinXBlock(5);
    }
  }

  /**
   * check if this node is within x block of player.
   * A x by x square area with player as center
   */
  withinXBlock(x: number) {
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

    if (this.owner.onCeiling || this.owner.onGround) {
      this.parent.direction.y *= -1;
    }
  }
}
