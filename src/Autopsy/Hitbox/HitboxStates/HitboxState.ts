import State from "../../../Wolfie2D/DataTypes/State/State";
import StateMachine from "../../../Wolfie2D/DataTypes/State/StateMachine";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import HitboxController from "../HitboxController";

export default abstract class HitboxState extends State {
  owner: AnimatedSprite;
  parent: HitboxController;
  stateName: string; // For debug purposes

  hasHit: boolean;

  constructor(parent: StateMachine, owner: GameNode) {
    super(parent);
    this.owner = <AnimatedSprite>owner;
    this.hasHit = true;
  }

  update(deltaT: number): void {}
}
