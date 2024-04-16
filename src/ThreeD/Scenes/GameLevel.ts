import Scene from "@/Wolfie2D/Scene/Scene";
import Player from "@/ThreeD/Player/Player";
import { GraphicType } from "@/Wolfie2D/Nodes/Graphics/GraphicTypes";
import Vec2 from "@/Wolfie2D/DataTypes/Vec2";
import CanvasRenderer from "@/Wolfie2D/Rendering/CanvasRenderer";
import RayCaster from "@/ThreeD/RayCaster";

export default class GameLevel extends Scene {
  player: Player;
  ctx: CanvasRenderingContext2D;

  loadScene() {
    this.load.tilemap("tilemap", "assets/tilemaps/Debug/Level1.json");
    this.addLayer("main");
    this.ctx = (<CanvasRenderer>this.renderingManager).context;
  }

  startScene() {
    this.add.tilemap("tilemap");
    this.player = new Player(
      this.add.graphic(GraphicType.POINT, "main", {
        position: new Vec2(100, 1000),
      }),
    );
    this.viewport.follow(this.player.node);
  }

  drawSlice(height: number, x: number) {
    const halfHeight = 800 / 2;
    const y = halfHeight - height / 2;
    this.ctx.fillRect(x, y, 1, height);
  }

  updateScene(deltaT: number) {
    this.player.update(deltaT);
    // console.log(
    //   this.tilemaps[0].getTileAtWorldPosition(
    //     this.player.node.position.clone().add(new Vec2(0, 20)),
    //   ),
    // );
  }

  render() {
    if (this.player) {
      // const position = this.player.node.relativePosition;
      for (let i = 0; i < 1200; i++) {
        const collision = RayCaster.cast(
          this.tilemaps[0],
          this.player.node.position.clone(),
          this.player.angle - toRadian(60 / 2) + toRadian(60 / 1200) * i,
        );
        const distance = fixFishEye(
          collision.distance,
          collision.angle,
          this.player.angle,
        );
        // this.ctx.fillStyle = collision.vertical ? "#c9a130" : "#ffcb3b";
        this.ctx.fillStyle = `${collision.vertical ? "#c9a130" : "#ffcb3b"}${mapNumberToHexString(collision.distance)}`;
        this.drawSlice(((32 * 5) / distance) * 277, i);
      }
    }
    super.render();

    // this.ctx.strokeStyle = "#ffffff";
    // for (let i = 0; i < 1200; i++) {
    //   const collision = RayCaster.simpleCast(
    //     this.tilemaps[0],
    //     this.player.node.position.clone(),
    //     this.player.angle - toRadian(90 / 2) + toRadian(90 / 1200) * i,
    //   );
    //   collision.x += this.player.node.relativePosition.x;
    //   collision.y += this.player.node.relativePosition.y;
    //   if (i % 1199 == 0) {
    //     // console.log(collision);
    //   }
    //
    //   this.ctx.beginPath();
    //   this.ctx.moveTo(position.x, position.y);
    //   this.ctx.lineTo(collision.x, collision.y);
    //   this.ctx.stroke();
    //   this.ctx.closePath();
    // }
  }
}

const mapNumberToHexString = (number: number) => {
  if (number > 900) {
    return "00"; // Hex string representation of 0
  } else if (number >= 800) {
    const mappedValue = Math.round(255 - (number - 800) * (255 / 100));
    return mappedValue.toString(16); // Convert to hex and pad with 0 if needed
  } else {
    return "ff"; // or handle numbers less than or equal to 800 as needed
  }
};

const fixFishEye = (distance: number, angle: number, playerAngle: number) => {
  const diff = angle - playerAngle;
  return distance * Math.cos(diff);
};

const toRadian = (x: number) => (x * Math.PI) / 180;
