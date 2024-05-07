import State from "../../../../Wolfie2D/DataTypes/State/State";
import StateMachine from "../../../../Wolfie2D/DataTypes/State/StateMachine";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import ZombieController, { ZState } from "../ZombieController";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import GameLevel from "../../../Scenes/GameLevel";
import GameNode from "../../../../Wolfie2D/Nodes/GameNode";
import { Events } from "../../../../globals";
import Dying from "@/Autopsy/Enemy/Ghost/GhostStates/Dying";
import { ZombieAnimations } from "../Zombie";

export default abstract class ZombieState extends State {
  owner: AnimatedSprite;
  parent: ZombieController;
  contactCooldown: Timer;
  knockbackTimer: Timer;
  idleTimer: Timer;
  playerPos: Vec2;
  canFollow: boolean;
  isDying: boolean;
  stateName: string; // For debug purposes

  constructor(parent: StateMachine, owner: AnimatedSprite) {
    super(parent);
    this.owner = owner;
    this.contactCooldown = new Timer(1000);
    this.knockbackTimer = new Timer(500);
    this.idleTimer = new Timer(3000);
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

  //tile data is manually inputted
  //cliff to the right
  onCliffRight(){
    
    let searchBlock = new Vec2(this.owner.position.x+(this.owner.sizeWithZoom.x/2)+1, this.owner.position.y+(this.owner.sizeWithZoom.y/2)+1);
    return this.parent.tilemap.getTileAtWorldPosition(searchBlock) === 0
  }

  onCliffLeft(){
    
    let searchBlock = new Vec2(this.owner.position.x-(this.owner.size.x/2)-1, this.owner.position.y+(this.owner.size.y/2)+1);
    return this.parent.tilemap.getTileAtWorldPosition(searchBlock) === 0
  }

  update(deltaT: number): void {
    //if (this.owner.onWall) {
      // Flip around
      //this.parent.direction.x *= -1;
      //(<AnimatedSprite>this.owner).invertX = !(<AnimatedSprite>this.owner)
        //.invertX;
    //}

    if (
      this.contactCooldown.isStopped() &&
      !this.isDying &&
      this.owner.collisionShape.overlaps(
        (<GameLevel>this.owner.getScene()).player.node.collisionShape,
      )
    ) {
      this.emitter.fireEvent(Events.PLAYER_DAMAGE);
      //this.finished(ZState.Attacking);
      this.owner.animation.playIfNotAlready(ZombieAnimations.Attacking,false)
      this.contactCooldown.start();
    }

    //if (this.owner.onCeiling || this.owner.onGround) {
      //this.parent.direction.y *= -1;
    //}
  }
}
