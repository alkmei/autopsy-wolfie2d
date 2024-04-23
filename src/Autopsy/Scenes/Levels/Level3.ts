import GameLevel, { Layers } from "../GameLevel";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Level4 from "./Level4";
import SpiderBoss from "@/Autopsy/Enemy/SpiderBoss/SpiderBoss";
import Spider from "@/Autopsy/Enemy/Spider/Spider";
import Ghost, { GhostType } from "@/Autopsy/Enemy/Ghost/Ghost";
import { GameEventType } from "@/Wolfie2D/Events/GameEventType";

export default class Level3 extends GameLevel {
  triggeredBoss: Boolean;
  boss: SpiderBoss;

  loadScene() {
    super.loadScene();
    this.load.tilemap("tilemap", "assets/tilemaps/Level3/Level3.json");

    this.load.spritesheet(
      "RedSoul",
      "assets/spritesheets/RedSoul/RedSoul.json",
    );
    this.load.spritesheet("Spider", "assets/spritesheets/Spider/Spider.json");
    this.load.spritesheet(
      "SpiderBoss",
      "assets/spritesheets/SpiderBoss/SpiderBoss.json",
    );

    this.load.audio("bluddington", "assets/music/bluddington.mp3");
  }

  startScene() {
    super.startScene();
    this.player.node.position = new Vec2(150, 250);
    this.camera.node.position = this.player.node.position.clone();
    this.add.tilemap("tilemap", new Vec2(1, 1));
    this.viewport.setBounds(0, 0, 2048, 1280);

    this.triggeredBoss = false;
    this.nextLevel = Level4;

    this.emitter.fireEvent(GameEventType.PLAY_MUSIC, {
      key: "bluddington",
      loop: true,
      holdReference: true,
    });
  }

  unloadScene() {
    this.emitter.fireEvent(GameEventType.STOP_SOUND, { key: "bluddington" });
    super.unloadScene();
  }

  update(deltaT: number): void {
    super.update(deltaT);
    if (!this.triggeredBoss && this.player.node.position.x > 672) {
      this.triggeredBoss = true;
      this.spawnBoss();
      this.firstWave();
    }
  }

  spawnBoss() {
    const bossPosition = this.resourceManager
      .getTilemap("tilemap")
      .layers.find(x => x.name == "BossSpawn").objects;
    const spiderBoss = new SpiderBoss(
      this.add.animatedSprite("SpiderBoss", Layers.Main),
      new Vec2(bossPosition[0].x, bossPosition[0].y),
    );

    this.boss = spiderBoss;
    this.enemies.push(spiderBoss);
  }

  firstWave() {
    const spiderSpawn = this.resourceManager
      .getTilemap("tilemap")
      .layers.find(x => x.name == "SpiderSpawn").objects;
    const ghostSpawn = this.resourceManager
      .getTilemap("tilemap")
      .layers.find(x => x.name == "GhostSpawn").objects;

    // spawn spiders at the top
    for (let i = 0; i < spiderSpawn.length; i++) {
      const spider = new Spider(
        this.add.animatedSprite("Spider", Layers.Main),
        new Vec2(spiderSpawn[i].x, spiderSpawn[i].y),
      );
      this.enemies.push(spider);
    }

    // spawn ghosts
    for (let i = 0; i < ghostSpawn.length; i++) {
      const ghost = new Ghost(
        this.add.animatedSprite("RedSoul", Layers.Main),
        new Vec2(ghostSpawn[i].x, ghostSpawn[i].y),
        GhostType.RED,
      );
      this.enemies.push(ghost);
    }
  }
}
