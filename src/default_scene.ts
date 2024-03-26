import Vec2 from "./Wolfie2D/DataTypes/Vec2";
import Input from "./Wolfie2D/Input/Input";
import Sprite from "./Wolfie2D/Nodes/Sprites/Sprite";
import Scene from "./Wolfie2D/Scene/Scene";

export default class default_scene extends Scene {
  private logo: Sprite;

  loadScene(): void {
    this.load.tilemap("level1", "hw5_assets/tilemaps/level1.json");
  }

  startScene(): void {
    this.addLayer("primary");
    this.addLayer("cast");
    this.add.tilemap("level1", new Vec2(2, 2));

    let center = this.viewport.getCenter();

    let options = {
      size: new Vec2(40, 40),
      position: new Vec2(80, 80),
    };
  }

  updateScene(deltaT: number): void {
    const direction = Vec2.ZERO;

    direction.x =
      (Input.isKeyPressed("a") ? -1 : 0) + (Input.isKeyPressed("d") ? 1 : 0);

    direction.y =
      (Input.isKeyPressed("w") ? -1 : 0) + (Input.isKeyPressed("s") ? 1 : 0);

    direction.normalize();

    const speed = 100 * deltaT;
    const velocity = direction.scale(speed);
  }
}
