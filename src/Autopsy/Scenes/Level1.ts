import GameLevel from "./GameLevel";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Ghost from "../Enemy/Ghost/Ghost";
import { Layers } from "./GameLevel";
import { GhostType } from "../Enemy/Ghost/Ghost";
import Level2 from "./Level2";

const GhostPositions: Array<Vec2> = [
  new Vec2(3840, 416),
  new Vec2(4160, 512),
  new Vec2(3904, 448),
];

export default class Level1 extends GameLevel {
  loadScene() {
    super.loadScene();
    this.load.tilemap("tilemap", "assets/tilemaps/Debug/Level1.json");
    // this.load.tilemap("tilemap", "assets/tilemaps/Debug/Level1_remake_v1.json");
  }

  startScene() {
    super.startScene();
    this.player.node.position = new Vec2(100, 1000);
    this.camera.node.position = this.player.node.position.clone();
    this.add.tilemap("tilemap", new Vec2(1, 1));
    this.viewport.setBounds(0, 0, 6400, 1280);

    this.nextLevel = Level2;

    this.addLevelEnd(new Vec2(4576, 160), new Vec2(32, 128));

    this.initializeGhosts();
  }

  initializeGhosts() {
    for (let i = 0; i < GhostPositions.length; i++) {
      const ghost = new Ghost(
        this.add.animatedSprite("RedSoul", Layers.Main),
        GhostPositions[i],
        GhostType.RED,
      );

      this.enemies.push(ghost);
    }
  }
}
