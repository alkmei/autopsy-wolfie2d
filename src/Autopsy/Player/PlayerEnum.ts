export enum MovementState {
  Grounded = "grounded",
  Ascending = "ascending",
  Descending = "descending",
}

export enum ActionState {
  Dash = "dash",
  Attack = "attack",
  AttackUpper = "attackUpper",
  AttackDown = "attackDown",
  Idle = "idle",
  Jump = "jump",
  Dead = "dead",
}

export enum PlayerAnimations {
  Idle = "Idle",
  Walk = "Walk",
  Up = "Up",
  Down = "Down",
  Dash = "Dash",
  ScytheUpper = "Scythe Upper",
  ScytheDown = "Scythe Down",
  ScytheSlash = "Scythe Slash",
  TakeDamage = "Take Damage",
  Dying = "Dying",
  Dead = "Dead",
}

export enum PlayerSounds {
  Dash = "playerDash",
  Hurt = "playerHurt",
  Heal = "playerHeal",
  Slash = "playerSlash",
  Death = "playerDeath",
  Jump = "playerJump",
}
