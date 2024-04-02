import Scene from "../../Wolfie2D/Scene/Scene";
import Player from "../Player/Player";

enum Layers {
  Main = "main",
}

export default class GameLevel extends Scene {
  player: Player;

  loadScene() {
    this.load.spritesheet("reaper", "assets/spritesheets/Reaper/reaper.json");
    this.addLayer(Layers.Main, 1);
  }

  startScene() {
    this.player = new Player(this.add.animatedSprite("reaper", Layers.Main));
  }
}
