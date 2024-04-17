import Scene from "@/Wolfie2D/Scene/Scene";
import Player from "@/ThreeD/Player/Player";
import { GraphicType } from "@/Wolfie2D/Nodes/Graphics/GraphicTypes";
import Vec2 from "@/Wolfie2D/DataTypes/Vec2";
import CanvasRenderer from "@/Wolfie2D/Rendering/CanvasRenderer";
import RayCaster from "@/ThreeD/RayCaster";
import Input from "@/Wolfie2D/Input/Input";
import { Action } from "@/globals";
import MathUtils from "@/Wolfie2D/Utils/MathUtils";
import { EaseFunctionType } from "@/Wolfie2D/Utils/EaseFunctions";
import Sprite from "@/Wolfie2D/Nodes/Sprites/Sprite";

export default class GameLevel extends Scene {
  player: Player;
  ctx: CanvasRenderingContext2D;
  threeD: boolean;

  scythe: Sprite;

  loadScene() {
    this.load.tilemap("tilemap", "assets/tilemaps/Debug/Level1.json");
    this.load.image("scythe", "assets/spritesheets/Scythe/scythe.png");
    this.addLayer("main");
    this.addUILayer("wep");
    this.ctx = (<CanvasRenderer>this.renderingManager).context;
    this.threeD = true;
  }

  startScene() {
    this.add.tilemap("tilemap");
    this.scythe = this.add.sprite("scythe", "wep");
    this.scythe.position = new Vec2(500, 700);
    this.scythe.scale = new Vec2(0.8, 0.8);
    this.scythe.rotation = toRadian(30);
    this.scythe.tweens.add("attack", {
      startDelay: 0,
      duration: 500,
      effects: [
        {
          property: "rotation",
          start: toRadian(30),
          end: -toRadian(180),
          ease: EaseFunctionType.IN_OUT_QUINT,
        },
        {
          property: "positionX",
          start: 500,
          end: 800,
          ease: EaseFunctionType.IN_OUT_QUINT,
        },
      ],
      reverseOnComplete: true,
    });

    this.tilemaps[0].visible = false;
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
    this.tilemaps[0].visible = !this.threeD;
    if (Input.isJustPressed(Action.Attack)) this.threeD = !this.threeD;
    if (Input.isJustPressed(Action.Jump)) this.scythe.tweens.play("attack");
  }

  render() {
    if (this.threeD)
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

          this.ctx.fillStyle = `${collision.vertical ? "#707070" : "#808080"}`;
          this.drawSlice(((32 * 5) / distance) * 277, i);
        }
      }
    super.render();
  }
}

const calcFogAlpha = (distance: number) => {
  const maxDistance = 900;
  const minDistance = 10;
  const maxAlpha = 255;
  const minAlpha = 0;

  const clampedDistance = MathUtils.clamp(distance, minDistance, maxDistance);

  const alpha =
    maxAlpha -
    ((clampedDistance - minDistance) / (maxDistance - minDistance)) *
      (maxAlpha - minAlpha);

  return ("00" + Math.round(alpha).toString(16)).slice(-2);
};

const fixFishEye = (distance: number, angle: number, playerAngle: number) => {
  const diff = angle - playerAngle;
  return distance * Math.cos(diff);
};

const toRadian = (x: number) => (x * Math.PI) / 180;
