import ControllerAI from "@/Wolfie2D/AI/ControllerAI";
import GameEvent from "@/Wolfie2D/Events/GameEvent";
import GameNode from "@/Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "@/Wolfie2D/Nodes/Sprites/AnimatedSprite";
import GameLevel, { Layers } from "@/Autopsy/Scenes/GameLevel";
import { UIElementType } from "@/Wolfie2D/Nodes/UIElements/UIElementTypes";
import Label from "@/Wolfie2D/Nodes/UIElements/Label";
import Vec2 from "@/Wolfie2D/DataTypes/Vec2";
import Color from "@/Wolfie2D/Utils/Color";

export default class MonolithController extends ControllerAI {
  active: boolean;
  message: Label;

  activate(options: Record<string, any>): void {}

  handleEvent(event: GameEvent): void {}

  initializeAI(owner: GameNode, options: Record<string, any>): void {
    this.owner = owner;
    this.message = <Label>(
      this.owner.getScene().add.uiElement(UIElementType.LABEL, Layers.UI, {
        position: this.owner.relativePosition.clone().mult(new Vec2(-0.1, 0.1)),
        text: options.message,
      })
    );
    this.message.textColor = Color.WHITE;
    this.message.font = "Mister Pixel";
  }

  changeActive(val: boolean) {
    if (this.active == val) return;
    this.active = val;
    if (this.active) {
      (<AnimatedSprite>this.owner).animation.playIfNotAlready("Display", true);
      this.message.visible = true;
    } else {
      (<AnimatedSprite>this.owner).animation.playIfNotAlready("Idle", false);
      this.message.visible = false;
    }
  }

  update(deltaT: number): void {
    this.changeActive(
      this.owner.collisionShape.overlaps(
        (<GameLevel>this.owner.getScene()).player.node.collisionShape,
      ),
    );
    this.message.position = this.owner.relativePosition
      .clone()
      .mult(new Vec2(0.5, 0.5))
      .add(new Vec2(0, -50));
  }
}
