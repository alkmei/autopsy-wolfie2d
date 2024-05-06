import Level1 from "./Autopsy/Scenes/Levels/Level1";
import Level2 from "./Autopsy/Scenes/Levels/Level2";
import Level3 from "./Autopsy/Scenes/Levels/Level3";
import Level4 from "./Autopsy/Scenes/Levels/Level4";
import Level5 from "./Autopsy/Scenes/Levels/Level5";
import Level6 from "./Autopsy/Scenes/Levels/Level6";
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

  Invincible = "invincible",
  Level1 = "level1",
  Level2 = "level2",
  Level3 = "level3",
  Level4 = "level4",
  Level5 = "level5",
  Level6 = "level6",
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
  ZOMBIE: new Vec2(24, 32),
};

export const Levels = {
  Level1: Level1,
  Level2: Level2,
  Level3: Level3,
  Level4: Level4,
  Level5: Level5,
  Level6: Level6,
};

export const EnemyType = {
  GHOST_RED: "ghost_red",
  SPIDER: "spider",
  ZOMBIE: "zombie",
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
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
  },
};
