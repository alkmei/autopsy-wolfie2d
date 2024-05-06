import GameLevel, { Layers } from "../GameLevel";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Level4 from "./Level4";
import Monolith from "@/Autopsy/Enemy/Monolith/Monolith";
import { GameEventType } from "@/Wolfie2D/Events/GameEventType";
import Ghost from "@/Autopsy/Enemy/Ghost/Ghost";
import Spider from "@/Autopsy/Enemy/Spider/Spider";
import Zombie from "@/Autopsy/Enemy/Zombie/Zombie";
import Sprite from "@/Wolfie2D/Nodes/Sprites/Sprite";

export default class Level3 extends GameLevel {
  loadScene() {
    super.loadScene();
    this.load.tilemap("tilemap", "assets/tilemaps/Level2/Level2.json");
    this.load.spritesheet(
      "Monolith",
      "assets/spritesheets/Monolith/Monolith.json",
    );

    this.load.image("bg", "assets/tilemaps/Level2/lvl2bg.png");
    this.addParallaxLayer(Layers.Parallax, new Vec2(0.005, 0.01), -1);

    this.load.spritesheet("Ghost", "assets/spritesheets/RedSoul/RedSoul.json");
    this.load.spritesheet("Spider", "assets/spritesheets/Spider/Spider.json");
    this.load.spritesheet("Zombie", "assets/spritesheets/Zombie/Zombie.json");
    this.load.audio("bluddington", "assets/music/bluddington.mp3");
  }

  startScene() {
    super.startScene();
    this.player.node.position = new Vec2(100, 2900);
    this.camera.node.position = this.player.node.position.clone();
    this.add.tilemap("tilemap", new Vec2(1, 1));
    this.viewport.setBounds(0, 0, 1888, 3168);

    const background = this.add.sprite("bg", Layers.Parallax);
    background.alpha = 0.4;
    background.position = new Vec2(300, 200);
    background.scale = new Vec2(1, 1);

    this.emitter.fireEvent(GameEventType.PLAY_MUSIC, {
      key: "bluddington",
      loop: true,
      holdReference: true,
    });

    const levelEnd = this.resourceManager
      .getTilemap("tilemap")
      .layers.find(x => x.name == "LevelEnd").objects[0];
    this.nextLevel = Level4;
    this.addLevelEnd(
      new Vec2(levelEnd.x, levelEnd.y + levelEnd.height / 2),
      new Vec2(levelEnd.width, levelEnd.height),
    );
    this.initializeMonoliths();
    this.initializeGhosts();
    this.initializeSpiders();
    this.initializeZombies();
  }

  updateScene(deltaT: number) {
    super.updateScene(deltaT);
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
}
