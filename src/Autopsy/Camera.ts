import GameNode from "../Wolfie2D/Nodes/GameNode";
import Point from "../Wolfie2D/Nodes/Graphics/Point";
import Updateable from "../Wolfie2D/DataTypes/Interfaces/Updateable";
import Vec2 from "../Wolfie2D/DataTypes/Vec2";
import MathUtils from "../Wolfie2D/Utils/MathUtils";
import Timer from "../Wolfie2D/Timing/Timer";

export default class Camera implements Updateable {
  node: GameNode;
  private following: GameNode;
  offset: Vec2;

  constructor(point: Point, offset: Vec2) {
    this.node = point;
    this.offset = offset;
  }

  update(deltaT: number): void {
    const offsetFollow = this.following.position.clone().add(this.offset);
    if (
      Math.abs(this.node.position.y - this.following.position.clone().y) >
      Math.abs(this.offset.y)
    )
      this.node.position.y = MathUtils.lerp(
        this.node.position.y,
        offsetFollow.y,
        2 * deltaT,
      );

    this.node.position.x = offsetFollow.x;
  }

  follow(node: GameNode) {
    this.following = node;
  }
}
