export class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.shake = 0;
  }

  follow(target, canvas) {
    const targetX = target.x - canvas.width / 2 + target.width / 2;
    const targetY = target.y - canvas.height / 2 + target.height / 2;

    this.x += (targetX - this.x) * 0.08;
    this.y += (targetY - this.y) * 0.08;
  }

  addShake(amount) {
    this.shake = Math.max(this.shake, amount);
  }

  apply(ctx) {
    const sx = (Math.random() - 0.5) * this.shake;
    const sy = (Math.random() - 0.5) * this.shake;

    ctx.translate(-this.x + sx, -this.y + sy);

    this.shake *= 0.85;
    if (this.shake < 0.1) this.shake = 0;
  }
}
