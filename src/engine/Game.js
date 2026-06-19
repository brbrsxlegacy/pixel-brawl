import { Renderer } from "./Renderer.js";
import { Input } from "./Input.js";
import { Physics } from "./Physics.js";
import { Player } from "../entities/Player.js";

export class Game {
  constructor() {
    this.renderer = new Renderer();
    this.input = new Input();
    this.physics = new Physics();

    this.player = new Player(300, 100, "#31D6FF");
    this.enemy = new Player(650, 100, "#FF5C8A");

    this.hitboxes = [];
    this.running = false;
  }

  start() {
    this.running = true;
    this.loop();
  }

  loop = () => {
    if (!this.running) return;

    this.update();
    this.render();

    requestAnimationFrame(this.loop);
  };

  update() {
    if (this.input.pressed("a")) this.player.move(-1);
    if (this.input.pressed("d")) this.player.move(1);
    if (this.input.pressed("w") || this.input.pressed(" ")) {
      this.player.jump();
    }

    if (this.input.pressed("j")) {
      const hitbox = this.player.attack();
      if (hitbox) this.hitboxes.push(hitbox);
    }

    this.physics.update(this.player, this.renderer.canvas.height);
    this.physics.update(this.enemy, this.renderer.canvas.height);

    this.player.updateCooldowns();

    for (const hitbox of this.hitboxes) {
      hitbox.update();

      if (hitbox.active && hitbox.intersects(this.enemy)) {
        this.enemy.damage += hitbox.damage;

        const dir = this.player.direction;
        const force = hitbox.knockback * (1 + this.enemy.damage / 100);

        this.enemy.vx += dir * force;
        this.enemy.vy -= force * 0.45;

        hitbox.active = false;
      }
    }

    this.hitboxes = this.hitboxes.filter(h => h.active);
  }

  render() {
    this.renderer.render(this.player, this.enemy, this.hitboxes);
  }
}
