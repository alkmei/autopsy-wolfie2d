import GameLevel from "../GameLevel";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Ghost from "../../Enemy/Ghost/Ghost";
import { Layers } from "../GameLevel";
import { GhostType } from "../../Enemy/Ghost/Ghost";
import Level2 from "./Level2";
import GameEvent from "@/Wolfie2D/Events/GameEvent";
import Monolith from "@/Autopsy/Enemy/Monolith/Monolith";

export default class Level1 extends GameLevel {
  loadScene() {
    super.loadScene();
    this.load.tilemap("tilemap", "assets/tilemaps/Level1/Level1.json");
    // red soul enemy
    this.load.spritesheet(
      "RedSoul",
      "assets/spritesheets/RedSoul/RedSoul.json",
    );

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

    this.nextLevel = Level2;

    this.addLevelEnd(new Vec2(4576, 128), new Vec2(32, 135));

    this.initializeGhosts();

    const monolith = new Monolith(
      this.add.animatedSprite("Monolith", Layers.Main),
      new Vec2(100, 1058),
      "hi",
    );
  }

  initializeGhosts() {
    const ghostPositions = this.resourceManager
      .getTilemap("tilemap")
      .layers.find(x => x.name == "Ghosts").objects;
    for (let i = 0; i < ghostPositions.length; i++) {
      const ghost = new Ghost(
        this.add.animatedSprite("RedSoul", Layers.Main),
        new Vec2(ghostPositions[i].x, ghostPositions[i].y),
        GhostType.RED,
      );

      this.enemies.push(ghost);
    }
  }
}
