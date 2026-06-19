export class SlashEffect {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.life = 12;
    this.maxLife = 12;
  }

  update() {
    this.life--;
  }

  get alive() {
    return this.life > 0;
  }
}
