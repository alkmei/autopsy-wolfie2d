import Scene from "../../Wolfie2D/Scene/Scene";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Color from "../../Wolfie2D/Utils/Color";
import { HAlign } from "../../Wolfie2D/Nodes/UIElements/Label";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Point from "../../Wolfie2D/Nodes/Graphics/Point";
import UILayer from "../../Wolfie2D/Scene/Layers/UILayer";

enum Layers {
  Main = "main",
  Levels = "level",
  Controls = "control",
  Help = "help",
}

export default class MainMenu extends Scene {
  screens: Record<Layers | string, UILayer>;
  currentScreen: Layers;
  loadScene() {
    this.load.image("logo", "/assets/images/autopsy_logo.png");
  }

  startScene() {
    this.screens = {
      [Layers.Main]: this.addUILayer(Layers.Main),
      [Layers.Levels]: this.addUILayer(Layers.Levels),
      [Layers.Controls]: this.addUILayer(Layers.Controls),
      [Layers.Help]: this.addUILayer(Layers.Help),
    };
    // Center the viewport
    const halfSize = this.viewport.getHalfSize();
    this.viewport.setFocus(halfSize);
    this.viewport.setZoomLevel(1);
    this.currentScreen = Layers.Main;

    this.initMainMenu();
  }

  private changeLayer(newLayer: Layers) {
    this.screens[this.currentScreen].setHidden(true);
    this.screens[newLayer].setHidden(false);
    this.currentScreen = newLayer;
  }

  private initMainMenu() {
    this.add.sprite("logo", Layers.Main).position = new Vec2(
      this.viewport.getHalfSize().x,
      200,
    );

    const buttonWidth: number = 500;

    const playButton = this.newButton(new Vec2(buttonWidth / 2, 400), "PLAY");
    playButton.setHAlign(HAlign.LEFT);
    playButton.size.x = buttonWidth;
    playButton.size.y = 80;

    const levelsButton = this.newButton(
      new Vec2(buttonWidth / 2, 400 + 90),
      "LEVELS",
    );
    levelsButton.setHAlign(HAlign.LEFT);
    levelsButton.size.x = buttonWidth;
    levelsButton.size.y = 80;
    levelsButton.onClick = () => this.changeLayer(Layers.Levels);

    const controlsButton = this.newButton(
      new Vec2(buttonWidth / 2, 400 + 90 * 2),
      "CONTROLS",
    );
    controlsButton.setHAlign(HAlign.LEFT);
    controlsButton.size.x = buttonWidth;
    controlsButton.size.y = 80;
    controlsButton.onClick = () => this.changeLayer(Layers.Controls);

    const helpButtonWidth: number = 130;
    const helpButton = this.newButton(
      new Vec2(this.viewport.getHalfSize().x * 2 - helpButtonWidth / 2, 700),
      "HELP",
      50,
    );
    helpButton.setHAlign(HAlign.CENTER);
    helpButton.size.x = helpButtonWidth;
    helpButton.size.y = 80;
    helpButton.onClick = () => this.changeLayer(Layers.Help);
  }

  private newButton(
    position: Vec2,
    text: string,
    fontSize: number = 60,
  ): Button {
    const button = <Button>this.add.uiElement(
      UIElementType.BUTTON,
      Layers.Main,
      {
        position: position,
        text: text,
      },
    );
    button.backgroundColor = Color.TRANSPARENT;
    button.borderColor = Color.WHITE;
    button.borderWidth = 2;
    button.borderRadius = 0;
    button.setPadding(new Vec2(50, 10));
    button.font = "MEGAPIX";
    button.fontSize = fontSize;
    button.textColor = new Color(231, 224, 241);

    return button;
  }
}
