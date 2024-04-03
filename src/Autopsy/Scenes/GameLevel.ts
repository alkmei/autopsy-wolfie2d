import Scene from "../../Wolfie2D/Scene/Scene";
import Player from "../Player/Player";
import Point from "../../Wolfie2D/Nodes/Graphics/Point";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Camera from "../Camera";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";

enum Layers {
  Main = "main",
  UI = "ui",
  Background = "bg",
  Hidden = "hidden",
}

export default class GameLevel extends Scene {
  player: Player;
  camera: Camera;

  loadScene() {
    this.load.spritesheet("reaper", "assets/spritesheets/Reaper/reaper.json");
    this.addLayer(Layers.Main, 1);
    this.addUILayer(Layers.UI);
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

    this.viewport.follow(this.camera.node);
    this.viewport.setZoomLevel(2);
    this.viewport.setSmoothingFactor(0);
  }

  update(deltaT: number) {
    this.camera.update(deltaT);
    super.update(deltaT);
  }
}
