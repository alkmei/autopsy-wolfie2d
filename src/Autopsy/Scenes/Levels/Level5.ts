import GameLevel from "../GameLevel";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Level6 from "./Level6";
import WaveLevel from "../WaveLevel/WaveLevel";
import Wave from "../WaveLevel/Wave";
import Ghost from "@/Autopsy/Enemy/Ghost/Ghost";
import OrthogonalTilemap from "@/Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import { GameEventType } from "@/Wolfie2D/Events/GameEventType";
import Monolith from "@/Autopsy/Enemy/Monolith/Monolith";
import { Layers } from "../GameLevel";

export default class Level5 extends WaveLevel {
  loadScene() {
    super.loadScene();
    this.load.tilemap("tilemap", "assets/tilemaps/Level5/Level5.json");
    this.load.audio("bluddington", "assets/music/what.mp3");

    this.load.spritesheet("Spider", "assets/spritesheets/Spider/Spider.json");
    this.load.spritesheet("Zombie", "assets/spritesheets/Zombie/Zombie.json");

    this.load.spritesheet(
      "Monolith",
      "assets/spritesheets/Monolith/Monolith.json",
    );
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

    this.nextLevel = Level6;

    this.emitter.fireEvent(GameEventType.PLAY_MUSIC, {
      key: "bluddington",
      loop: true,
      holdReference: true,
    });

    this.initializeMonoliths();

    this.setLevelEndArea(new Vec2(2877, 670), new Vec2(32, 128));

    //this.waves=[new Wave([1])];
    let tmap = this.getTilemap("World") as OrthogonalTilemap;
    this.setTilemap = tmap;

    this.waves = [
      new Wave([3, 2, 3]),
      new Wave([9, 5, 9]),
      new Wave([27, 10, 27]),
    ];

    this.startWave();
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
}
