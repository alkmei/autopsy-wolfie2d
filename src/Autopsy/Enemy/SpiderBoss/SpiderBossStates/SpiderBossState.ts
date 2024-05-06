import State from "../../../../Wolfie2D/DataTypes/State/State";
import StateMachine from "../../../../Wolfie2D/DataTypes/State/StateMachine";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import SpiderBossController from "../SpiderBossController";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import SpiderBoss from "../SpiderBoss";

export default abstract class SpiderBossState extends State {
  owner: AnimatedSprite;
  parent: SpiderBossController;
  playerPos: Vec2;
  boss: SpiderBoss;
  stateName: string; // For debug purposes

  constructor(parent: StateMachine, owner: AnimatedSprite, boss: SpiderBoss) {
    super(parent);
    this.owner = owner;
    this.boss = boss;
  }

  handleInput(event: GameEvent): void {}

  update(deltaT: number): void {}
}
