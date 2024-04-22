import State from "../../../../Wolfie2D/DataTypes/State/State";
import StateMachine from "../../../../Wolfie2D/DataTypes/State/StateMachine";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import SpiderBossController from "../SpiderBossController";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import GameLevel from "../../../Scenes/GameLevel";
import GameNode from "../../../../Wolfie2D/Nodes/GameNode";
import { Events } from "../../../../globals";

export default abstract class SpiderBossState extends State {
  owner: GameNode;
  parent: SpiderBossController;
  followingCDTimer: Timer;
  stuckTimer: Timer;
  contactCooldown: Timer;
  knockbackTimer: Timer;
  playerPos: Vec2;
  canFollow: boolean;
  stateName: string; // For debug purposes

  constructor(parent: StateMachine, owner: GameNode) {
    super(parent);
    this.owner = owner;
  }

  handleInput(event: GameEvent): void {}

  update(deltaT: number): void {
  }
}
