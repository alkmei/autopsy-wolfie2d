import Scene from "../../Wolfie2D/Scene/Scene";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Color from "../../Wolfie2D/Utils/Color";
import Label, { HAlign } from "../../Wolfie2D/Nodes/UIElements/Label";
import UILayer from "../../Wolfie2D/Scene/Layers/UILayer";
import { PhysicsGroups, levelPhysics } from "../../globals";
import Level1 from "./Levels/Level1";
import Level2 from "./Levels/Level2";
import Level3 from "./Levels/Level3";
import Level4 from "./Levels/Level4";
import Level5 from "./Levels/Level5";
import Level6 from "./Levels/Level6";

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
    this.load.image("levelSelect", "/assets/images/level_selection.png");
    this.screens = {
      [Layers.Main]: this.addUILayer(Layers.Main),
      [Layers.Levels]: this.addUILayer(Layers.Levels),
      [Layers.Controls]: this.addUILayer(Layers.Controls),
      [Layers.Help]: this.addUILayer(Layers.Help),
      [Layers.Back]: this.addUILayer(Layers.Back),
    };
  }

  startScene() {
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
    const buttonWidth = 120;
    const backButton = this.newButton(
      new Vec2(buttonWidth / 2, this.viewport.getHalfSize().y * 2 - 100),
      "BACK",
      40,
      Layers.Back,
    );
    backButton.size.x = buttonWidth;
    backButton.size.y = 70;
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
          position: new Vec2(600, 200 + 40 * index),
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

    [
      "Cheats",
      "",
      "Invincibility: I",
      "Change Level: 1-6",
    ].forEach((value, index) => {
      const helpLine = <Label>this.add.uiElement(
        UIElementType.LABEL,
        Layers.Help,
        {
          position: new Vec2(600, 500 + 40 * index),
          text: value,
        },
      );
      helpLine.textColor = this.textColor;
      helpLine.font = "Mister Pixel";
    });
  }

  private initLevelsLayer() {
    const levelSelectImg = this.add.sprite("levelSelect", Layers.Levels);
    levelSelectImg.position = new Vec2(600, 400);
    levelSelectImg.scale = new Vec2(0.8, 0.8);

    const fontSize = 40;
    const buttonSize = new Vec2(70, 70);
    const paddingSize = new Vec2(15, 15);

    const levelOne = this.newButton(
      new Vec2(255, 540),
      "1",
      fontSize,
      Layers.Levels,
    );
    const levelTwo = this.newButton(
      new Vec2(360, 320),
      "2",
      fontSize,
      Layers.Levels,
    );
    const levelThree = this.newButton(
      new Vec2(565, 495),
      "3",
      fontSize,
      Layers.Levels,
    );
    const levelFour = this.newButton(
      new Vec2(773, 550),
      "4",
      fontSize,
      Layers.Levels,
    );
    const levelFive = this.newButton(
      new Vec2(914, 342),
      "5",
      fontSize,
      Layers.Levels,
    );
    const levelSix = this.newButton(
      new Vec2(798, 118),
      "6",
      fontSize,
      Layers.Levels,
    );

    levelOne.font = "Mister Pixel";
    levelOne.setPadding(paddingSize);
    levelOne.size = buttonSize;
    levelOne.borderColor = Color.TRANSPARENT;
    levelOne.onClick = () => {
      this.sceneManager.changeToScene(Level1, {}, levelPhysics);
    };

    levelTwo.font = "Mister Pixel";
    levelTwo.setPadding(paddingSize);
    levelTwo.size = buttonSize;
    levelTwo.borderColor = Color.TRANSPARENT;
    levelTwo.onClick = () => {
      this.sceneManager.changeToScene(Level2, {}, levelPhysics);
    };

    levelThree.font = "Mister Pixel";
    levelThree.setPadding(paddingSize);
    levelThree.size = buttonSize;
    levelThree.borderColor = Color.TRANSPARENT;
    levelThree.onClick = () => {
      this.sceneManager.changeToScene(Level3, {}, levelPhysics);
    };

    levelFour.font = "Mister Pixel";
    levelFour.setPadding(paddingSize);
    levelFour.size = buttonSize;
    levelFour.borderColor = Color.TRANSPARENT;
    levelFour.onClick = () => {
      this.sceneManager.changeToScene(Level4, {}, levelPhysics);
    };

    levelFive.font = "Mister Pixel";
    levelFive.setPadding(paddingSize);
    levelFive.size = buttonSize;
    levelFive.borderColor = Color.TRANSPARENT;
    levelFive.onClick = () => {
      this.sceneManager.changeToScene(Level5, {}, levelPhysics);
    };

    levelSix.font = "Mister Pixel";
    levelSix.setPadding(paddingSize);
    levelSix.size = buttonSize;
    levelSix.borderColor = Color.TRANSPARENT;
    levelSix.onClick = () => {
      this.sceneManager.changeToScene(Level6, {}, levelPhysics);
    };
  }

  private initControlsMenu() {
    [
      "(A), (D): Move left and right respectively.",
      "(Space): Jump.",
      "(J): Attack.",
      "(Shift): Dash.",
      "(ESC): Pause game.",
    ].forEach((value, index) => {
      const controlLine = <Label>this.add.uiElement(
        UIElementType.LABEL,
        Layers.Controls,
        {
          position: new Vec2(600, 200 + 40 * index),
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
    playButton.onClick = () => {
      this.sceneManager.changeToScene(Level1, {}, levelPhysics);
    };

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
    button.borderWidth = 1;
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
