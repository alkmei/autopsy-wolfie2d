import PlayerActionState from "./PlayerActionState";

export default class Attack extends PlayerActionState {
  onEnter(options: Record<string, any>): void {}

  onExit(): Record<string, any> {
    return undefined;
  }

  update(deltaT: number): void {}
}
