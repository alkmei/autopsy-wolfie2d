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
};

export const PhysicsGroups = {
  PLAYER_PHYS: "PLAYER_PHYS",
  ENEMY_PHYS: "ENEMY_PHYS",
  HITBOX_PHYS: "HITBOX_PHYS",
};

export const SpriteSizes = {
  SOUL: new Vec2(18, 24),
  PLAYER: new Vec2(18, 24),
};
