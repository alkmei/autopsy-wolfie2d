import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import GhostController from "./GhostController";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Label from "../../../Wolfie2D/Nodes/UIElements/Label";
import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";

export enum GhostType{
    RED = "red",
    BLUE = "blue"
}

export default class Ghost {
  node: AnimatedSprite;
  health: number;
  type: string; //red(HP) or blue(MP)


  constructor(sprite: AnimatedSprite, pos: Vec2, type: string) {
    this.node = sprite;
    this.node.addPhysics(
        new AABB(new Vec2(0, 0), new Vec2(18, 24)),
        new Vec2(0, 0),
    );
    this.node.addAI(GhostController);
    this.node.setGroup("ghost")
    this.node.position = pos;
    this.node.animation.play("Idle", true);
    this.health = 10;
    this.type = type;


  }
}