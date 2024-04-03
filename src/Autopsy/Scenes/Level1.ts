import GameLevel from "./GameLevel";
import Constants from "../../globals";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";

export default class Level1 extends GameLevel {
  loadScene() {
    super.loadScene();
    this.load.tilemap("tilemap", "assets/tilemaps/Debug/Debug.json");
  }

  startScene() {
    super.startScene();
    this.add.tilemap("tilemap", new Vec2(1, 1));
  }
}
