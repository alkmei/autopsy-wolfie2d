import Point from "@/Wolfie2D/Nodes/Graphics/Point";
import Vec2 from "@/Wolfie2D/DataTypes/Vec2";
import Updateable from "@/Wolfie2D/DataTypes/Interfaces/Updateable";
import Input from "@/Wolfie2D/Input/Input";

export default class Player implements Updateable {
  node: Point;
  velocity: Vec2;
  angle: number;

  constructor(node: Point) {
    this.node = node;
    this.angle = Math.PI / 2;
    this.velocity = Vec2.ZERO;
    this.node.addPhysics();
  }

  getInputDirection(): Vec2 {
    let direction = Vec2.ZERO;
    direction.x =
      (Input.isPressed("left") ? -1 : 0) + (Input.isPressed("right") ? 1 : 0);
    direction.y =
      (Input.isPressed("up") ? -1 : 0) + (Input.isPressed("down") ? 1 : 0);
    return direction;
  }

  update(deltaT: number): void {
    this.velocity = this.getInputDirection()
      .normalize()
      .smult(300 * deltaT);

    const turnDirection =
      (Input.isPressed("lookleft") ? -1 : 0) +
      (Input.isPressed("lookright") ? 1 : 0);
    this.angle += turnDirection * deltaT;
    this.node.move(this.velocity.rotateCCW(this.angle + Math.PI / 2));
  }
}
