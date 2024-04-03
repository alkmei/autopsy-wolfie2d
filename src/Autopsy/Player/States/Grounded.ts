import PlayerState from "./PlayerState";

export default class Grounded extends PlayerState {
  onEnter(options: Record<string, any>): void {}
  onExit(): Record<string, any> {
    return {};
  }
}
