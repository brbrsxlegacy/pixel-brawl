export class Market {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 90;
    this.height = 90;
  }

  isNear(player) {
    const dx = player.x - this.x;
    const dy = player.y - this.y;
    return Math.abs(dx) < 90 && Math.abs(dy) < 90;
  }
}
