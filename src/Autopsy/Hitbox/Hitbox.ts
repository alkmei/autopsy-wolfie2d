import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import HitboxController from "./HitboxController";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import { PhysicsGroups } from "../../globals";

export enum HState {
  Active = "Active",
  Contact = "Contact",
  Manager = "Manager",
}

export default class Hitbox {
  node: AnimatedSprite;

  constructor(
    owner: AnimatedSprite,
    sprite: AnimatedSprite,
    eventType: string,
    center: Vec2,
    halfSize: Vec2,
    invertX: boolean,
    offset: Vec2,
  ) {
    this.node = sprite;

    this.node.addPhysics(new AABB(center, halfSize), new Vec2(0, 0));
    this.node.setGroup(PhysicsGroups.HITBOX_PHYS);

    this.node.addAI(HitboxController, {
      invertX: invertX,
      offset: offset,
      eventType: eventType,
      owner: owner,
    });
  }
}
