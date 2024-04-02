import Scene from "../../Wolfie2D/Scene/Scene";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Color from "../../Wolfie2D/Utils/Color";
import Label, { HAlign } from "../../Wolfie2D/Nodes/UIElements/Label";
import UILayer from "../../Wolfie2D/Scene/Layers/UILayer";

enum Layers {
  Main = "main",
  Levels = "level",
  Controls = "control",
  Help = "help",
  Back = "back",
}

export default class MainMenu extends Scene {
  screens: Record<Layers | string, UILayer>;
  textColor = new Color(231, 224, 241);
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
      [Layers.Back]: this.addUILayer(Layers.Back),
    };

    // Center the viewport
    const halfSize = this.viewport.getHalfSize();
    this.viewport.setFocus(halfSize);
    this.viewport.setZoomLevel(1);
    this.currentScreen = Layers.Main;

    for (const screensKey in this.screens)
      this.screens[screensKey].setHidden(true);

    this.initMainMenu();
    this.initLevelsLayer();
    this.initHelpLayer();
    this.initControlsMenu();
    this.initBackLayer();

    this.screens[Layers.Main].setHidden(false);
  }

  private changeLayer(newLayer: Layers) {
    this.screens[this.currentScreen].disable();
    this.screens[newLayer].enable();
    this.currentScreen = newLayer;
    this.screens[Layers.Back].setHidden(this.currentScreen == Layers.Main);
  }

  private initBackLayer() {
    const buttonWidth = 100;
    const backButton = this.newButton(
      new Vec2(buttonWidth / 2, this.viewport.getHalfSize().y * 2 - 100),
      "BACK",
      30,
      Layers.Back,
    );
    backButton.size.x = buttonWidth;
    backButton.size.y = 50;
    backButton.onClick = () => {
      this.changeLayer(Layers.Main);
    };
  }

  private initHelpLayer() {
    [
      "You play as an undertaker and have to hunt souls that",
      " have escaped from hell using an arsenal of weapons. ",
    ].forEach((value, index) => {
      const helpLine = <Label>this.add.uiElement(
        UIElementType.LABEL,
        Layers.Help,
        {
          position: new Vec2(this.viewport.getCenter().x, 100 + index * 40),
          text: value,
        },
      );
      helpLine.textColor = this.textColor;
      helpLine.font = "Mister Pixel";
    });

    const authorLineWidth = 500;
    const authorLine = <Label>this.add.uiElement(
      UIElementType.LABEL,
      Layers.Help,
      {
        position: new Vec2(
          this.viewport.getHalfSize().x * 2 - authorLineWidth / 2 - 10,
          this.viewport.getHalfSize().y * 2 - 20,
        ),
        text: "By Alvin Mei, Yu-Xiang Zheng, Andrew Ton",
      },
    );
    authorLine.size.x = authorLineWidth;
    authorLine.setHAlign(HAlign.RIGHT);
    authorLine.textColor = this.textColor;
    authorLine.font = "Mister Pixel";
  }

  private initLevelsLayer() {}

  private initControlsMenu() {
    [
      "(Left Arrow), (Right Arrow): Move left and right respectively.",
      "(Z): Jump.",
      "(X): Attack.",
      "(Shift): Alt attack",
      "(Space): Dash.",
      "(A, S, D, F): Switch weapons",
      "(ESC): Pause game.",
    ].forEach((value, index) => {
      const controlLine = <Label>this.add.uiElement(
        UIElementType.LABEL,
        Layers.Controls,
        {
          position: new Vec2(this.viewport.getCenter().x, 200 + 40 * index),
          text: value,
        },
      );
      controlLine.textColor = this.textColor;
      controlLine.font = "Mister Pixel";
      controlLine.size.x = 1000;
      controlLine.setHAlign(HAlign.LEFT);
    });
  }

  private initMainMenu() {
    this.add.sprite("logo", Layers.Main).position = new Vec2(
      this.viewport.getHalfSize().x,
      200,
    );

    const buttonWidth: number = 500;

    const playButton = this.newButton(
      new Vec2(buttonWidth / 2, 400),
      "PLAY",
      60,
      Layers.Main,
    );
    playButton.setHAlign(HAlign.LEFT);
    playButton.size.x = buttonWidth;
    playButton.size.y = 80;

    const levelsButton = this.newButton(
      new Vec2(buttonWidth / 2, 400 + 90),
      "LEVELS",
      60,
      Layers.Main,
    );
    levelsButton.setHAlign(HAlign.LEFT);
    levelsButton.size.x = buttonWidth;
    levelsButton.size.y = 80;
    levelsButton.onClick = () => this.changeLayer(Layers.Levels);

    const controlsButton = this.newButton(
      new Vec2(buttonWidth / 2, 400 + 90 * 2),
      "CONTROLS",
      60,
      Layers.Main,
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
      Layers.Main,
    );
    helpButton.setHAlign(HAlign.CENTER);
    helpButton.size.x = helpButtonWidth;
    helpButton.size.y = 80;
    helpButton.onClick = () => this.changeLayer(Layers.Help);
  }

  private newButton(
    position: Vec2,
    text: string,
    fontSize: number,
    layer: Layers,
  ): Button {
    const button = <Button>this.add.uiElement(UIElementType.BUTTON, layer, {
      position: position,
      text: text,
    });
    button.backgroundColor = Color.TRANSPARENT;
    button.borderColor = Color.WHITE;
    button.borderWidth = 2;
    button.borderRadius = 0;
    button.setPadding(new Vec2(50, 10));
    button.font = "MEGAPIX";
    button.fontSize = fontSize;
    button.textColor = this.textColor;

    const transWhite = new Color(255, 255, 255, 0.1);
    const invisibleWhite = new Color(255, 255, 255, 0);
    button.onEnter = () => {
      button.backgroundColor = transWhite;
    };
    button.onLeave = () => {
      button.backgroundColor = invisibleWhite;
    };

    return button;
  }
}
