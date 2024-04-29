import GameLevel, { Layers } from "../GameLevel";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Level5 from "./Level5";
import { GameEventType } from "@/Wolfie2D/Events/GameEventType";
import Zombie from "@/Autopsy/Enemy/Zombie/Zombie";

export default class Level4 extends GameLevel {
  loadScene() {
    super.loadScene();
    this.load.tilemap("tilemap", "assets/tilemaps/Debug/Level1.json");
    this.load.spritesheet(
      "Zombie",
      "assets/spritesheets/Zombie/Zombie.json",
    );
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

    this.addLevelEnd(new Vec2(4576, 128), new Vec2(32, 135));
    this.initializeZombies();
  }

  initializeZombies() {
    //const zombiePositions = this.resourceManager
      //.getTilemap("tilemap")
      //.layers.find(x => x.name == "Zombies").objects;
    const zombiePositions = [new Vec2(1236,1044), new Vec2(2240, 692), new Vec2(3840, 604)];
    for (let i = 0; i < 3; i++) {
      const zombie = new Zombie(
        this.add.animatedSprite("Zombie", Layers.Main),
        new Vec2(zombiePositions[i].x, zombiePositions[i].y),
        "World"
      );

      this.enemies.push(zombie);
    }
  }
}
