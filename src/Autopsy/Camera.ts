import GameNode from "../Wolfie2D/Nodes/GameNode";
import Point from "../Wolfie2D/Nodes/Graphics/Point";
import Updateable from "../Wolfie2D/DataTypes/Interfaces/Updateable";
import Vec2 from "../Wolfie2D/DataTypes/Vec2";

export default class Camera implements Updateable {
  node: GameNode;
  private following: GameNode;
  offset: Vec2;

  constructor(point: Point, offset: Vec2) {
    this.node = point;
    this.offset = offset;
  }

  update(deltaT: number): void {
    this.node.position = this.following.position.clone().add(this.offset);
  }

  follow(node: GameNode) {
    this.following = node;
  }
}
