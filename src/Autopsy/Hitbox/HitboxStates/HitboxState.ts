import GameLevel from "@/Autopsy/Scenes/GameLevel";
import State from "../../../Wolfie2D/DataTypes/State/State";
import StateMachine from "../../../Wolfie2D/DataTypes/State/StateMachine";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { DamageType } from "../DamageType";
import HitboxController from "../HitboxController";
import { Events } from "@/globals";
import GameEvent from "@/Wolfie2D/Events/GameEvent";

export default class HitboxState extends State {
  owner: AnimatedSprite;
  parent: HitboxController;
  stateName: string; // For debug purposes
  player: AnimatedSprite;
  hasHit: boolean;

  onEnter(options: Record<string, any>): void {}
  handleInput(event: GameEvent): void {}

  constructor(parent: StateMachine, owner: GameNode) {
    super(parent);
    this.owner = <AnimatedSprite>owner;
    this.owner.animation.play("animation", false);
    this.player = (<GameLevel>this.owner.getScene()).player.node;
    this.hasHit = true;
  }

  update(deltaT: number): void {
    // Hitbox damaging enemies
    if (this.hasHit) {
      if (this.parent.eventType === DamageType.TO_ENEMY) {
        const enemies = (<GameLevel>this.owner.getScene()).enemies;
        enemies.forEach(enemy => {
          if (this.owner.collisionShape.overlaps(enemy.node.collisionShape)) {
            this.emitter.fireEvent(Events.ENEMY_DAMAGE, {
              enemy: enemy,
              damage: 1,
            });
            this.hasHit = false;
            enemy.knockback();
          }
        });
      }

      // Hitbox damaging player
      if (this.parent.eventType === DamageType.TO_PLAYER) {
        if (this.owner.collisionShape.overlaps(this.player.collisionShape)) {
          this.emitter.fireEvent(Events.PLAYER_DAMAGE);
          this.hasHit = false;
        }
      }
    }
  }

  onExit(): Record<string, any> {
    return {};
  }
}
