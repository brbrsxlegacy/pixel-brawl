export class Hitbox {
  constructor(owner, x, y, width, height, damage, knockback) {
    this.owner = owner;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.damage = damage;
    this.knockback = knockback;
    this.active = true;
    this.life = 8;
  }

  update() {
    this.life--;
    if (this.life <= 0) this.active = false;
  }

  intersects(target) {
    return (
      this.x < target.x + target.width &&
      this.x + this.width > target.x &&
      this.y < target.y + target.height &&
      this.y + this.height > target.y
    );
  }
}
