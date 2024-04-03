import Vec2 from "./Wolfie2D/DataTypes/Vec2";

export enum Action {
  Left = "left",
  Right = "right",
  Jump = "jump",
}

export default class Constants {
  static readonly SCALE = new Vec2(3, 3);
}
