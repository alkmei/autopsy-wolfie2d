import GameLevel from "../GameLevel";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Level4 from "./Level4";

export default class Level3 extends GameLevel {
  triggeredBoss: Boolean;

  loadScene() {
    super.loadScene();
    this.load.tilemap("tilemap", "assets/tilemaps/Level3/Level3.json");
  }

  startScene() {
    super.startScene();
    this.resourceManager.getTilemap("tilemap").layers.find(x => x.name == "NonCollidable").visible;
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

  }
}
