export class Checkpoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 45;
    this.height = 80;
    this.active = false;
  }

  isNear(player) {
    return (
      Math.abs(player.x - this.x) < 70 &&
      Math.abs(player.y - this.y) < 90
    );
  }
}
