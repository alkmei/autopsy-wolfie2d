import State from "../../../../Wolfie2D/DataTypes/State/State";
import StateMachine from "../../../../Wolfie2D/DataTypes/State/StateMachine";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import GameLevel from "../../../Scenes/GameLevel";
import { Events } from "../../../../globals";
import SpiderController from "../SpiderController";

export default abstract class SpiderState extends State {
  owner: AnimatedSprite;
  parent: SpiderController;
  contactCooldown: Timer;
  knockbackTimer: Timer;
  playerPos: Vec2;
  canFollow: boolean;
  stateName: string; // For debug purposes

  constructor(parent: StateMachine, owner: AnimatedSprite) {
    super(parent);
    this.owner = owner;
    this.contactCooldown = new Timer(1000);
    this.knockbackTimer = new Timer(500);
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
    if (
      this.contactCooldown.isStopped() &&
      this.owner.collisionShape.overlaps(
        (<GameLevel>this.owner.getScene()).player.node.collisionShape,
      )
    ) {
      this.emitter.fireEvent(Events.PLAYER_DAMAGE);
      this.contactCooldown.start();
    }
  }
}
