import PlayerState from "../PlayerState";

export default abstract class PlayerMovementState extends PlayerState {
  update(deltaT: number): void {
    let dir = this.getInputDirection();
    if (dir.x == -1) {
      this.owner.invertX = true;
    } else if (dir.x == 1) {
      this.owner.invertX = false;
    }

    this.player.velocity = this.owner.getLastVelocity();
    this.player.velocity.x = dir.x * this.player.speed * deltaT;
  }
}
