import GameLevel from "../GameLevel";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Level5 from "./Level5";
import WaveLevel from "../WaveLevel/WaveLevel";
import Wave from "../WaveLevel/Wave";
import Ghost from "@/Autopsy/Enemy/Ghost/Ghost";
import OrthogonalTilemap from "@/Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";

export default class Level4 extends WaveLevel {
  loadScene() {
    super.loadScene();
    this.load.tilemap("tilemap", "assets/tilemaps/WaveTest(Level4)/Level4.json");
  }

  startScene() {
    super.startScene();
    this.player.node.position = new Vec2(100, 1000);
    this.camera.node.position = this.player.node.position.clone();
    this.add.tilemap("tilemap", new Vec2(1, 1));
    this.viewport.setBounds(0, 0, 6400, 1280);

    this.nextLevel = Level5;
    
    this.setLevelEndArea(new Vec2(2877, 670), new Vec2(32, 128));

    //this.waves=[new Wave([1])];
    let tmap = this.getTilemap('World') as OrthogonalTilemap;
    this.setTilemap = tmap;
    

  
    this.waves=[new Wave([3]),new Wave([9]),new Wave([27])]

    this.startWave();

  }
}
