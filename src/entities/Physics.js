export class Physics {
  constructor() {
    this.gravity = 0.75;
    this.friction = 0.82;
    this.groundOffset = 120;
  }

  update(player, canvasHeight) {
    player.vy += this.gravity;

    player.x += player.vx;
    player.y += player.vy;

    player.vx *= this.friction;

    if (player.vx > player.maxSpeed) player.vx = player.maxSpeed;
    if (player.vx < -player.maxSpeed) player.vx = -player.maxSpeed;

    const groundY = canvasHeight - this.groundOffset;

    if (player.y + player.height >= groundY) {
      player.y = groundY - player.height;
      player.vy = 0;
      player.onGround = true;
    }
  }
}
