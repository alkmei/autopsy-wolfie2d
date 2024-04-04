import Scene from "../../Wolfie2D/Scene/Scene";
import Player from "../Player/Player";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Camera from "../Camera";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import PlayerController from "../Player/PlayerController";

enum Layers {
  Main = "main",
  UI = "ui",
  Background = "bg",
  Hidden = "hidden",
  Debug = "debg",
}

export default class GameLevel extends Scene {
  player: Player;
  camera: Camera;

  playerStateLabel: Label;

  loadScene() {
    this.load.spritesheet("reaper", "assets/spritesheets/Reaper/reaper.json");
    this.addLayer(Layers.Main, 1);
    this.addUILayer(Layers.UI);
    this.addLayer(Layers.Debug, 2);
    this.addLayer(Layers.Hidden, 1).setHidden(true);
  }

  startScene() {
    this.player = new Player(this.add.animatedSprite("reaper", Layers.Main));
    this.camera = new Camera(
      this.add.graphic(GraphicType.POINT, Layers.Hidden, {
        position: this.player.node.position.clone(),
      }),
      new Vec2(0, -90),
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
    this.viewport.follow(this.camera.node);
    this.viewport.setZoomLevel(2);
    this.viewport.setSmoothingFactor(0);
  }

  update(deltaT: number) {
    this.camera.update(deltaT);
    super.update(deltaT);
    this.playerStateLabel.text = (<PlayerController>(
      this.player.node.ai
    )).state.stateName;
    this.playerStateLabel.position = this.player.node.position
      .clone()
      .add(new Vec2(0, -40));
  }
}
