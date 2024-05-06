import GameLevel, { Layers } from "../GameLevel";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Level5 from "./Level5";
import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";
import Zombie from "../../Enemy/Zombie/Zombie";
import Spider from "../../Enemy/Spider/Spider";
import Ghost from "../../Enemy/Ghost/Ghost";
import Monolith from "../../Enemy/Monolith/Monolith";

export default class Level4 extends GameLevel {
  loadScene() {
    super.loadScene();
    this.load.tilemap("tilemap", "assets/tilemaps/Level4/Level4.json");
    this.load.spritesheet("Zombie", "assets/spritesheets/Zombie/Zombie.json");
    this.load.spritesheet("Spider", "assets/spritesheets/Spider/Spider.json");
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

    this.nextLevel = Level5;

    this.emitter.fireEvent(GameEventType.PLAY_MUSIC, {
      key: "bluddington",
      loop: true,
      holdReference: true,
    });

    this.addLevelEnd(new Vec2(2754, 700), new Vec2(32, 135));
    this.initializeZombies();
    this.initializeGhosts();
    this.initializeSpiders();
  }

  initializeZombies() {
    this.resourceManager
      .getTilemap("tilemap")
      .layers.find(x => x.name == "Zombies")
      .objects.forEach(m => {
        this.enemies.push(
          new Zombie(
            this.add.animatedSprite("Zombie", Layers.Main),
            new Vec2(m.x, m.y),
            "World",
          ),
        );
      });
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
            this.add.animatedSprite("RedSoul", Layers.Main),
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
