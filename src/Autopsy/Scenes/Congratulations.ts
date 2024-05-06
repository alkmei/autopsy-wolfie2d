import Scene from "../../Wolfie2D/Scene/Scene";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Color from "../../Wolfie2D/Utils/Color";
import UILayer from "../../Wolfie2D/Scene/Layers/UILayer";
import MainMenu from "./MainMenu";
import Label from "@/Wolfie2D/Nodes/UIElements/Label";

enum Layers {
  Main = "main",
}

export default class Congratulations extends Scene {
  screens: Record<Layers | string, UILayer>;
  textColor = new Color(231, 224, 241);
  currentScreen: Layers;
  loadScene() {
    this.load.image("logo", "/assets/images/autopsy_logo.png");
    this.screens = {
      [Layers.Main]: this.addUILayer(Layers.Main),
    };
  }

  startScene() {
    // Center the viewport
    const halfSize = this.viewport.getHalfSize();
    this.viewport.setFocus(halfSize);
    this.viewport.setZoomLevel(1);
    this.currentScreen = Layers.Main;

    this.initMain();
  }

  private initMain() {
    const label = <Label>this.add.uiElement(UIElementType.LABEL, Layers.Main, {
        position: new Vec2(600, 300),
        text: "CONGRATULATIONS!",
      });
      label.textColor = Color.WHITE;
      label.size = new Vec2(600, 35);
      label.font = "MEGAPIX";
      label.fontSize = 70;

    const menuButton = this.newButton(
      new Vec2(600, 700),
      "RETURN TO MENU",
      42,
      Layers.Main,
    );
    menuButton.onClick = () => {
      this.sceneManager.changeToScene(MainMenu);
    };
    menuButton.size.x = 450;
    menuButton.size.y = 75;
  }

  private newButton(
    position: Vec2,
    text: string,
    fontSize: number,
    layer: Layers,
    levelButton: Boolean = false,
  ): Button {
    const button = <Button>this.add.uiElement(UIElementType.BUTTON, layer, {
      position: position,
      text: text,
    });
    button.backgroundColor = Color.TRANSPARENT;
    button.borderColor = Color.WHITE;
    button.borderWidth = 1;
    button.borderRadius = 0;
    button.setPadding(new Vec2(50, 10));
    button.font = "MEGAPIX";
    button.fontSize = fontSize;
    button.textColor = this.textColor;

    const transWhite = new Color(255, 255, 255, 0.1);
    const invisibleWhite = new Color(255, 255, 255, 0);
    if (!levelButton) {
      button.onEnter = () => {
        button.backgroundColor = transWhite;
      };
      button.onLeave = () => {
        button.backgroundColor = invisibleWhite;
      };
    } else {
      button.onEnter = () => {
        button.textColor = new Color(246, 242, 252);
      };
      button.onLeave = () => {
        button.textColor = this.textColor;
      };
    }

    return button;
  }
}
