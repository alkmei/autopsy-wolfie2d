import Scene from "../../Wolfie2D/Scene/Scene";
import Player from "../Player/Player";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Camera from "../Camera";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import PlayerController from "../Player/PlayerController";
import Color from "../../Wolfie2D/Utils/Color";
import { Events } from "../../globals";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import Label, { HAlign } from "../../Wolfie2D/Nodes/UIElements/Label";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import MainMenu from "./MainMenu";
import Input from "../../Wolfie2D/Input/Input";
import { Action } from "../../globals";
import Layer from "../../Wolfie2D/Scene/Layer";

enum Layers {
  Main = "main",
  UI = "ui",
  Background = "bg",
  Hidden = "hidden",
  Debug = "debg",
  Pause = "pause",
}

export default class GameLevel extends Scene {
  player: Player;
  camera: Camera;

  playerStateLabel: Label;

  textColor = new Color(231, 224, 241);

  loadScene() {
    this.load.spritesheet("reaper", "assets/spritesheets/Reaper/reaper.json");
    this.addLayer(Layers.Main, 1);
    this.addUILayer(Layers.UI);
    this.addUILayer(Layers.Pause).setHidden(true);
    this.addLayer(Layers.Debug, 2);
    this.addLayer(Layers.Hidden, 1).setHidden(true);
  }

  startScene() {
    this.player = new Player(this.add.animatedSprite("reaper", Layers.Main));
    this.camera = new Camera(
      this.add.graphic(GraphicType.POINT, Layers.Hidden, {
        position: this.player.node.position.clone(),
      }),
      new Vec2(0, -80),
    );

    this.camera.follow(this.player.node);

    this.playerStateLabel = <Label>this.add.uiElement(
      UIElementType.LABEL,
      Layers.Debug,
      {
        position: this.player.node.position.clone(),
        text: (<PlayerController>this.player.node.ai).state.stateName,
      },
    );
    this.playerStateLabel.font = "Mister Pixel";
    this.playerStateLabel.textColor = Color.WHITE;
    this.viewport.follow(this.camera.node);
    this.viewport.setZoomLevel(2);
    this.viewport.setSmoothingFactor(0);

    this.initPauseLayer();
    
    // subscribe to events
    this.receiver.subscribe(Events.MAIN_MENU);
  }

  update(deltaT: number) {
    if (Input.isJustPressed(Action.Pause)) {
      Input.disableInput();
      this.uiLayers.get(Layers.Pause).setHidden(false);
    }

    this.camera.update(deltaT);
    super.update(deltaT);
    this.playerStateLabel.text = (<PlayerController>(
      this.player.node.ai
    )).state.stateName;
    this.playerStateLabel.position = this.player.node.position
      .clone()
      .add(new Vec2(0, -40));

    // handle events
    while (this.receiver.hasNextEvent()) {
      console.log("this should go off if there is event");
      this.handleEvent(this.receiver.getNextEvent());
    }
  }

  handleEvent(event: GameEvent) {
    switch (event.type) {
      case Events.MAIN_MENU: {
        this.sceneManager.changeToScene(MainMenu);
        console.log("attempt to swap to main menu");
        break;
      }
    }
  }

  initPauseLayer() {
    const buttonWidth: number = 450;
    const buttonHeight: number = 65;

    const resumeButton = <Button>this.newButton(
      new Vec2(100, 50),
      "RESUME",
      52,
      Layers.Pause,
    );

    resumeButton.size.x = buttonWidth;
    resumeButton.size.y = buttonHeight;
    resumeButton.onClick = () => {
      Input.enableInput();
      this.uiLayers.get(Layers.Pause).setHidden(true);
    };

    // const controlsButton = this.newButton(
    //   new Vec2(100, 50 + 38),
    //   "CONTROLS",
    //   52,
    //   Layers.Pause,
    // );
    // controlsButton.size.x = buttonWidth;
    // controlsButton.size.y = buttonHeight;
    // controlsButton.onClick = () => {
    // };

    const menuButton = this.newButton(
      new Vec2(100, 50 + 38),
      "MENU",
      52,
      Layers.Pause,
    );

    menuButton.onClickEventId = Events.MAIN_MENU;
    menuButton.size.x = buttonWidth;
    menuButton.size.y = buttonHeight;
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
    button.borderColor = Color.WHITE;
    button.borderWidth = 2;
    button.borderRadius = 0;
    button.setPadding(new Vec2(50, 10));
    button.font = "MEGAPIX";
    button.fontSize = fontSize;
    button.textColor = this.textColor;

    const transColor = new Color(16, 14, 18, 0.9);
    const fillColor = new Color(16, 14, 18, 1);
    button.backgroundColor = fillColor;
    button.onEnter = () => {
      button.backgroundColor = transColor;
    };
    button.onLeave = () => {
      button.backgroundColor = fillColor;
    };

    button.scale.set(1 / this.viewport.getZoomLevel(), 1 / this.viewport.getZoomLevel());

    return button;
  }
}
