import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import { Events } from "../../globals";
import HitboxController from "./HitboxController";

export enum HState {
    Active = "Active",
  }

export default class Hitbox {
  node: AnimatedSprite;

  constructor(player: AnimatedSprite, sprite: AnimatedSprite, eventType: string, center: Vec2, halfSize: Vec2, invertX: boolean, offset: Vec2) {
    this.node = sprite;
    this.node.addPhysics(
        new AABB(center, halfSize),
        new Vec2(0, 0),
    );
      
    this.node.addAI(HitboxController, { player: player, invertX: invertX, offset: offset, eventType: eventType});   
  }
}