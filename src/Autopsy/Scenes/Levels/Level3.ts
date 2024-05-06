import GameLevel, { Layers } from "../GameLevel";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "@/Wolfie2D/Events/GameEventType";
import Zombie from "@/Autopsy/Enemy/Zombie/Zombie";
import Monolith from "@/Autopsy/Enemy/Monolith/Monolith";
import Ghost from "@/Autopsy/Enemy/Ghost/Ghost";

export default class Level3 extends GameLevel {
  badMood: boolean = false;
  blockerPositions: Vec2[];

  loadScene() {
    super.loadScene();
    this.load.tilemap("tilemap", "assets/tilemaps/Level6/Level6.json");
    this.load.spritesheet("Zombie", "assets/spritesheets/Zombie/Zombie.json");
    this.load.image("Blocker", "assets/spritesheets/Blocker/x.png");
    this.load.spritesheet(
      "Monolith",
      "assets/spritesheets/Monolith/Monolith.json",
    );
    this.load.audio("calm", "assets/music/calm.mp3");
  }

  unloadScene() {
    this.emitter.fireEvent(GameEventType.STOP_SOUND, { key: "calm" });
    super.unloadScene();
  }

  startScene() {
    super.startScene();
    this.player.node.position = new Vec2(100, 1000);
    this.camera.node.position = this.player.node.position.clone();
    this.add.tilemap("tilemap", new Vec2(1, 1));
    this.viewport.setBounds(0, 0, 6400, 1280);

    this.emitter.fireEvent(GameEventType.PLAY_MUSIC, {
      key: "calm",
      loop: true,
      holdReference: true,
    });

    this.initializeZombies();
    this.initializeMonoliths();
    this.initializeGhosts();
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

  updateScene(deltaT: number) {
    super.updateScene(deltaT);
    if (this.player.node.position.x >= 3264 && !this.badMood) {
      this.darkenMood();
    }
  }

  darkenMood() {
    this.badMood = true;
    this.emitter.fireEvent(GameEventType.STOP_SOUND, { key: "calm" });
  }
}
