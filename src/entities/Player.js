export class Player {
  constructor(x = 300, y = 100) {
    this.x = x;
    this.y = y;

    this.width = 42;
    this.height = 58;

    this.vx = 0;
    this.vy = 0;

    this.speed = 0.8;
    this.maxSpeed = 7;
    this.jumpPower = -15;

    this.onGround = false;
    this.direction = 1;
  }

  move(dir) {
    this.vx += dir * this.speed;
    this.direction = dir;
  }

  jump() {
    if (this.onGround) {
      this.vy = this.jumpPower;
      this.onGround = false;
    }
  }
}
