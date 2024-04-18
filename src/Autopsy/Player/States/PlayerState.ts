import State from "../../../Wolfie2D/DataTypes/State/State";
import StateMachine from "../../../Wolfie2D/DataTypes/State/StateMachine";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import Input from "../../../Wolfie2D/Input/Input";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Player from "../Player";

export default abstract class PlayerState extends State {
  owner: AnimatedSprite;
  parent: StateMachine;
  player: Player;
  stateName: string; // For debug purposes

  constructor(parent: StateMachine, owner: GameNode, player: Player) {
    super(parent);
    this.owner = <AnimatedSprite>owner;
    this.player = player;
  }

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
}
