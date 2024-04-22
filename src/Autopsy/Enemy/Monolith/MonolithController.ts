import ControllerAI from "@/Wolfie2D/AI/ControllerAI";
import GameEvent from "@/Wolfie2D/Events/GameEvent";
import GameNode from "@/Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "@/Wolfie2D/Nodes/Sprites/AnimatedSprite";
import GameLevel, { Layers } from "@/Autopsy/Scenes/GameLevel";
import { UIElementType } from "@/Wolfie2D/Nodes/UIElements/UIElementTypes";

export default class MonolithController extends ControllerAI {
  active: boolean;
  message: string;

  activate(options: Record<string, any>): void {}

  handleEvent(event: GameEvent): void {}

  initializeAI(owner: GameNode, options: Record<string, any>): void {
    this.owner = owner;
    this.message = options.message;
  }

  update(deltaT: number): void {
    if (this.active) {
      (<AnimatedSprite>this.owner).animation.playIfNotAlready("Display", true);
    } else {
      (<AnimatedSprite>this.owner).animation.playIfNotAlready("Idle", false);
    }

    this.active = this.owner.collisionShape.overlaps(
      (<GameLevel>this.owner.getScene()).player.node.collisionShape,
    );
  }
}
