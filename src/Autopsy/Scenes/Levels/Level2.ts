import GameLevel, { Layers } from "../GameLevel";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "@/Wolfie2D/Events/GameEventType";
import Zombie from "@/Autopsy/Enemy/Zombie/Zombie";
import Monolith from "@/Autopsy/Enemy/Monolith/Monolith";
import Ghost from "@/Autopsy/Enemy/Ghost/Ghost";
import Level3 from "@/Autopsy/Scenes/Levels/Level3";
import Sprite from "@/Wolfie2D/Nodes/Sprites/Sprite";
import { GraphicType } from "@/Wolfie2D/Nodes/Graphics/GraphicTypes";
import Color from "@/Wolfie2D/Utils/Color";

export default class Level2 extends GameLevel {
  blockerPositions: Vec2[];
  blockerCrossed: number = 0;
  blockerActive: boolean = false;
  leftBlocker: Sprite;
  rightBlocker: Sprite;

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
    this.load.audio("fire", "assets/music/fire3.mp3");
    this.load.image("bg", "assets/tilemaps/Level6/blue_sky.png");
    this.addParallaxLayer(Layers.Parallax, new Vec2(0.005, 0.01), -1);
    this.nextLevel = Level3;
  }

  unloadScene() {
    this.emitter.fireEvent(GameEventType.STOP_SOUND, { key: "calm" });
    this.emitter.fireEvent(GameEventType.STOP_SOUND, { key: "fire" });
    super.unloadScene();
  }

  startScene() {
    super.startScene();
    this.player.node.position = new Vec2(100, 1000);
    this.camera.node.position = this.player.node.position.clone();
    this.add.tilemap("tilemap", new Vec2(1, 1));
    this.viewport.setBounds(0, 0, 6400, 1280);
    const background = this.add.sprite("bg", Layers.Parallax);
    background.alpha = 1;
    background.position = new Vec2(300, 200);
    background.scale = new Vec2(1, 1);

    this.emitter.fireEvent(GameEventType.PLAY_MUSIC, {
      key: "calm",
      loop: true,
      holdReference: true,
    });

    const levelEnd = this.resourceManager
      .getTilemap("tilemap")
      .layers.find(x => x.name == "LevelEnd").objects[0];
    this.addLevelEnd(
      new Vec2(levelEnd.x, levelEnd.y + levelEnd.height / 2),
      new Vec2(levelEnd.width, levelEnd.height),
    );

    this.initializeZombies();
    this.initializeMonoliths();
    this.initializeGhosts();
    this.initializeBlocker();
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

  initializeBlocker() {
    this.blockerPositions = this.resourceManager
      .getTilemap("tilemap")
      .layers.find(x => x.name == "Blocker")
      .objects.map(m => new Vec2(m.x + 16, m.y));
  }

  updateScene(deltaT: number) {
    super.updateScene(deltaT);
    this.handleBlocker();
  }

  handleBlocker() {
    if (
      this.blockerCrossed < this.blockerPositions.length &&
      this.player.node.position.x >=
        this.blockerPositions[this.blockerCrossed].x + 32
    ) {
      this.goViolent();
      this.leftBlocker = this.add.sprite("Blocker", Layers.Main);
      this.leftBlocker.position = this.blockerPositions[this.blockerCrossed];
      this.leftBlocker.addPhysics();
      this.rightBlocker = this.add.sprite("Blocker", Layers.Main);
      this.rightBlocker.position =
        this.blockerPositions[this.blockerCrossed + 1];
      this.rightBlocker.addPhysics();
      this.blockerCrossed += 2;
      this.blockerActive = true;
    }

    if (this.blockerActive) {
      const activeEnemies = this.enemies.filter(
        enemy =>
          enemy.node.position.x > this.leftBlocker.position.x &&
          enemy.node.position.x < this.rightBlocker.position.x,
      );
      console.log(
        this.leftBlocker.position.x,
        this.rightBlocker.position.x,
        activeEnemies.length,
      );
      if (activeEnemies.length < 1) {
        this.blockerActive = false;
        this.leftBlocker.destroy();
        this.rightBlocker.destroy();
        this.goCalm();
      }
    }
  }

  goViolent() {
    this.emitter.fireEvent(GameEventType.STOP_SOUND, { key: "calm" });
    this.emitter.fireEvent(GameEventType.PLAY_MUSIC, {
      key: "fire",
      loop: true,
      holdReference: true,
    });
  }

  goCalm() {
    this.emitter.fireEvent(GameEventType.STOP_SOUND, { key: "fire" });
    this.emitter.fireEvent(GameEventType.PLAY_MUSIC, {
      key: "calm",
      loop: true,
      holdReference: true,
    });
  }
}
