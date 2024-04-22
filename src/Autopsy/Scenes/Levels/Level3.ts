import GameLevel, { Layers } from "../GameLevel";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Level4 from "./Level4";
import SpiderBoss from "@/Autopsy/Enemy/SpiderBoss/SpiderBoss";

export default class Level3 extends GameLevel {
  triggeredBoss: Boolean;

  loadScene() {
    super.loadScene();
    this.load.tilemap("tilemap", "assets/tilemaps/Level3/Level3.json");
    this.load.spritesheet(
      "SpiderBoss",
      "assets/spritesheets/SpiderBoss/SpiderBoss.json",
    );
  }

  startScene() {
    super.startScene();
    this.player.node.position = new Vec2(150, 250);
    this.camera.node.position = this.player.node.position.clone();
    this.add.tilemap("tilemap", new Vec2(1, 1));
    this.viewport.setBounds(0, 0, 2048, 1280);

    this.triggeredBoss = false;
    this.nextLevel = Level4;
  }

  update(deltaT: number): void {
    super.update(deltaT);
    if (!this.triggeredBoss && this.player.node.position.x > 672) {
      this.triggeredBoss = true;
      this.spawnBoss();
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
  }
}
