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
  ENEMY_DAMAGE: "ENEMY_DAMAGE",

  PLAYER_DEATH: "PLAYER_DEATH",
  ENEMY_DEATH: "ENEMY_DEATH",
};
