import { Hitbox } from "./Hitbox.js";
import { attacks } from "../combat/attacks.js";

export class Player {
  constructor(x = 300, y = 100, color = "#31D6FF") {
    this.x = x;
    this.y = y;

    this.width = 42;
    this.height = 58;

    this.coins = 0;
    this.swordLevel = 1;

    this.vx = 0;
    this.vy = 0;

    this.speed = 0.8;
    this.maxSpeed = 7;
    this.jumpPower = -15;

    this.stocks = 3;
    this.dead = false;

    this.onGround = false;
    this.direction = 1;

    this.color = color;
    this.damage = 0;
    this.attackCooldown = 0;
    this.state = "idle";
  }
    updateAnimationState() {
    if (!this.onGround) {
      this.state = "jump";
    } else if (Math.abs(this.vx) > 0.4) {
      this.state = "run";
    } else {
      this.state = "idle";
    }
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

  upgradeSword() {
    const cost = this.swordLevel * 20;
  
    if (this.coins >= cost) {
      this.coins -= cost;
      this.swordLevel++;
      return true;
    }
  
    return false;
  }

  respawn(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.damage = 0;
  }

  attack() {
    if (this.attackCooldown > 0) return null;

    this.attackCooldown = 22;

    const atk = attacks.slash1;
    const hitX =
      this.direction === 1
        ? this.x + this.width
        : this.x - atk.width;

    return new Hitbox(
      this,
      hitX,
      this.y + 14,
      atk.width,
      atk.height,
      atk.damage,
      atk.knockback
    );
  }

  updateCooldowns() {
    if (this.attackCooldown > 0) this.attackCooldown--;
  }
}
