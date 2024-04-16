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
        this.ctx.fillStyle = `${collision.vertical ? "#c9a130" : "#ffcb3b"}${calcFogAlpha(distance)}`;
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

const calcFogAlpha = (distance: number) => {
  // Define fog parameters
  const maxDistance = 900; // Maximum distance at which fog is fully opaque
  const minDistance = 10; // Minimum distance at which fog starts to appear
  const maxAlpha = 255; // Maximum alpha value (fully opaque)
  const minAlpha = 0; // Minimum alpha value (fully transparent)

  // Clamp distance within the defined range
  const clampedDistance = Math.max(
    minDistance,
    Math.min(maxDistance, distance),
  );

  // Calculate alpha based on distance
  const alpha =
    maxAlpha -
    ((clampedDistance - minDistance) / (maxDistance - minDistance)) *
      (maxAlpha - minAlpha);

  // Convert alpha to hexadecimal representation
  return ("00" + Math.round(alpha).toString(16)).slice(-2);
};

const fixFishEye = (distance: number, angle: number, playerAngle: number) => {
  const diff = angle - playerAngle;
  return distance * Math.cos(diff);
};

const toRadian = (x: number) => (x * Math.PI) / 180;
