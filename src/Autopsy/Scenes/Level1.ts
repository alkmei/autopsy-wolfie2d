import GameLevel from "./GameLevel";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Ghost from "../Enemy/Ghost/Ghost";
import { Layers } from "./GameLevel";
import { GhostType } from "../Enemy/Ghost/Ghost";

export default class Level1 extends GameLevel {
  loadScene() {
    super.loadScene();
    this.load.tilemap("tilemap", "assets/tilemaps/Debug/Level1.json");
  }

  startScene() {
    super.startScene();
    this.player.node.position = new Vec2(100, 1000);
    this.camera.node.position = this.player.node.position.clone();
    this.add.tilemap("tilemap", new Vec2(1, 1));
    this.viewport.setBounds(0, 0, 6400, 1280);

    this.initializeGhosts();

  }

  initializeGhosts() {
    for (let i = 0; i < 1; i++) {
      const ghost = new Ghost(
        this.add.animatedSprite("RedSoul", Layers.Main),
        new Vec2(200, 1000),
        GhostType.RED,
      );

      this.enemies.push(ghost);
    }
  }
}
