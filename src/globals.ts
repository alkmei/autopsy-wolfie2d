import Vec2 from "./Wolfie2D/DataTypes/Vec2";

export enum Action {
  Left = "left",
  Right = "right",
  Jump = "jump",
  Attack = "attack",
  Dash = "dash",
  Pause = "pause",
  Up = "up",
  Down = "down",
}

export const Events = {
  MAIN_MENU: "MAIN_MENU",

  PLAYER_DAMAGE: "PLAYER_DAMAGE",
  PLAYER_HEAL: "PLAYER_HEAL",
  PLAYER_DEATH: "PLAYER_DEATH",

  ENEMY_DEATH: "ENEMY_DEATH",
  ENEMY_DAMAGE: "ENEMY_DAMAGE",

  LEVEL_END: "LEVEL_END",
  ENTER_LEVEL_END: "ENTER_LEVEL_END",
};

export const PhysicsGroups = {
  PLAYER_PHYS: "PLAYER_PHYS",
  ENEMY_PHYS: "ENEMY_PHYS",
  HITBOX_PHYS: "HITBOX_PHYS",
};

export const SpriteSizes = {
  SOUL: new Vec2(9, 12),
  PLAYER: new Vec2(18, 24),
};

/*
Rows in the collisions array represent each physics group by index, 
first index of the first row is the first phys group itself,
second index in the second row is the second phys group itself, etc.

0 is does not collide, 1 is collide
*/
export const levelPhysics = {
  physics: {
    groupNames: [
      PhysicsGroups.PLAYER_PHYS,
      PhysicsGroups.ENEMY_PHYS,
      PhysicsGroups.HITBOX_PHYS,
    ],
    collisions: [
      [0, 1, 1],
      [0, 1, 1],
      [0, 0, 0],
    ],
  },
};