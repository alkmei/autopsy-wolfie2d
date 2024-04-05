import GameLevel from "./GameLevel";
import Constants from "../../globals";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";

export default class Level1 extends GameLevel {
  loadScene() {
    super.loadScene();
    this.load.tilemap("tilemap", "assets/tilemaps/Debug/Level1.json");
  }

  startScene() {
    super.startScene();
    this.player.node.position = new Vec2(100, 1000);
    this.add.tilemap("tilemap", new Vec2(1, 1));
    this.viewport.setBounds(0, 0, 6400, 1280);
  }
}
