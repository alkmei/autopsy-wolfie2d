import GameLevel, { Layers } from "../GameLevel";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Level3 from "./Level3";
import Monolith from "@/Autopsy/Enemy/Monolith/Monolith";
import { GameEventType } from "@/Wolfie2D/Events/GameEventType";
import Ghost from "@/Autopsy/Enemy/Ghost/Ghost";
import Spider from "@/Autopsy/Enemy/Spider/Spider";

export default class Level2 extends GameLevel {
  loadScene() {
    super.loadScene();
    this.load.tilemap("tilemap", "assets/tilemaps/Level2/Level2.json");
    this.load.spritesheet(
      "Monolith",
      "assets/spritesheets/Monolith/Monolith.json",
    );
    this.load.spritesheet("Ghost", "assets/spritesheets/RedSoul/RedSoul.json");
    this.load.spritesheet("Spider", "assets/spritesheets/Spider/Spider.json");
    this.load.audio("bluddington", "assets/music/bluddington.mp3");
  }

  startScene() {
    super.startScene();
    this.player.node.position = new Vec2(100, 1000);
    this.camera.node.position = this.player.node.position.clone();
    this.add.tilemap("tilemap", new Vec2(1, 1));
    this.viewport.setBounds(0, 0, 6400, 1280);

    this.emitter.fireEvent(GameEventType.PLAY_MUSIC, {
      key: "bluddington",
      loop: true,
      holdReference: true,
    });

    this.nextLevel = Level3;
    this.initializeMonoliths();
    this.initializeGhosts();
    this.initializeSpiders();
  }

  unloadScene() {
    this.emitter.fireEvent(GameEventType.STOP_SOUND, { key: "bluddington" });
    super.unloadScene();
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
    this.resourceManager
      .getTilemap("tilemap")
      .layers.find(x => x.name == "Ghosts")
      .objects.forEach(m => {
        this.enemies.push(
          new Ghost(
            this.add.animatedSprite("Ghost", Layers.Main),
            new Vec2(m.x, m.y),
            "red",
          ),
        );
      });
  }

  initializeSpiders() {
    this.resourceManager
      .getTilemap("tilemap")
      .layers.find(x => x.name == "Spiders")
      .objects.forEach(m => {
        this.enemies.push(
          new Spider(
            this.add.animatedSprite("Spider", Layers.Main),
            new Vec2(m.x, m.y),
          ),
        );
      });
  }
}
