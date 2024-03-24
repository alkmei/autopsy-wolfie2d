import Graphic from "./Wolfie2D/Nodes/Graphic";
import Vec2 from "./Wolfie2D/DataTypes/Vec2";

export default class Player {
  public node: Graphic;
  public angle: Vec2;

  constructor(sprite: Graphic) {
    this.node = sprite;
    this.angle = new Vec2(0, 0);
  }
}
