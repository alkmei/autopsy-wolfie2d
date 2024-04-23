import GameLevel from "../GameLevel";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "@/Wolfie2D/Events/GameEventType";

export default class Level6 extends GameLevel {
  loadScene() {
    super.loadScene();
    this.load.tilemap("tilemap", "assets/tilemaps/Debug/Level1.json");
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

    this.emitter.fireEvent(GameEventType.PLAY_MUSIC, {
      key: "bluddington",
      loop: true,
      holdReference: true,
    });
  }
}
