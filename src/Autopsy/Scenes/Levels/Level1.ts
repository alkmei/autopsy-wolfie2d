import GameLevel from "../GameLevel";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Ghost from "../../Enemy/Ghost/Ghost";
import { Layers } from "../GameLevel";
import { GhostType } from "../../Enemy/Ghost/Ghost";
import Level2 from "./Level2";
import Monolith from "@/Autopsy/Enemy/Monolith/Monolith";
import { GameEventType } from "@/Wolfie2D/Events/GameEventType";

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

    this.load.image("bg", "assets/tilemaps/Level1/limbo_bg.jpg");
    this.load.audio("bluddington", "assets/music/bluddington.mp3");
  }

  unloadScene() {
    this.emitter.fireEvent(GameEventType.STOP_SOUND, { key: "bluddington" });
    super.unloadScene();
  }

  startScene() {
    super.startScene();
    this.player.node.position = new Vec2(100, 1000);
    this.camera.node.position = this.player.node.position.clone();
    this.add.tilemap("tilemap", new Vec2(1, 1));

    this.viewport.setBounds(0, 0, 6400, 1280);
    const background = this.add.sprite("bg", Layers.Parallax);
    background.alpha = 0.3;
    background.position = new Vec2(300, 200);
    background.scale = new Vec2(8, 8);

    this.nextLevel = Level2;

    this.addLevelEnd(new Vec2(4576, 128), new Vec2(32, 135));
    this.emitter.fireEvent(GameEventType.PLAY_MUSIC, {
      key: "bluddington",
      loop: true,
      holdReference: true,
    });

    this.initializeGhosts();
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
