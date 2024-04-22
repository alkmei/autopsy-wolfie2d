import GameLevel, { Layers } from "../GameLevel";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Level3 from "./Level3";
import Monolith from "@/Autopsy/Enemy/Monolith/Monolith";

export default class Level2 extends GameLevel {
  loadScene() {
    super.loadScene();
    this.load.tilemap("tilemap", "assets/tilemaps/Level2/Level2.json");
    this.load.spritesheet(
      "Monolith",
      "assets/spritesheets/Monolith/Monolith.json",
    );
  }

  startScene() {
    super.startScene();
    this.player.node.position = new Vec2(100, 1000);
    this.camera.node.position = this.player.node.position.clone();
    this.add.tilemap("tilemap", new Vec2(1, 1));
    this.viewport.setBounds(0, 0, 6400, 1280);

    this.nextLevel = Level3;
    this.initializeMonoliths();
  }

  initializeMonoliths() {
    this.resourceManager
      .getTilemap("tilemap")
      .layers.find(x => x.name == "Monoliths")
      .objects.forEach(m => {
        new Monolith(
          this.add.animatedSprite("Monolith", Layers.Main),
          new Vec2(m.x, m.y),
          m.name,
        );
      });
  }
}
