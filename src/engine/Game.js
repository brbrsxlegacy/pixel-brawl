import { BotAI } from "../ai/BotAI.js";
import { Checkpoint } from "../world/Checkpoint.js";
import { Market } from "../world/Market.js";
import { SlashEffect } from "../entities/SlashEffect.js";
import { Menu } from "../ui/Menu.js";
import { HUD } from "../ui/HUD.js";
import { Camera } from "./Camera.js";
import { Renderer } from "./Renderer.js";
import { Input } from "./Input.js";
import { Physics } from "./Physics.js";
import { Player } from "../entities/Player.js";

export class Game {
  constructor() {
    this.renderer = new Renderer();
    this.input = new Input();
    this.physics = new Physics();
    this.camera = new Camera();

    this.player = new Player(300, 100, "#31D6FF");
    this.enemy = new Player(650, 100, "#FF5C8A");

    this.effects = [];
    this.hitboxes = [];

    this.market = new Market(120, 510);
    this.checkpoint = new Checkpoint(520, 520);
    this.botAI = new BotAI();

    this.playerSpawn = { x: 300, y: 100 };
    this.enemySpawn = { x: 650, y: 100 };

    this.spawnX = this.player.x;
    this.spawnY = this.player.y;

    this.message = "";
    this.messageTimer = 0;

    this.gameOver = false;
    this.winner = "";

    this.menu = new Menu();
    this.hud = new HUD();

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
    if (this.menu.active) {
      if (this.input.justPressed("enter")) this.menu.startGame();
      return;
    }

    if (this.gameOver) {
      if (this.input.justPressed("enter")) location.reload();
      return;
    }

    this.checkpoint.update();

    if (this.input.pressed("a")) this.player.move(-1);
    if (this.input.pressed("d")) this.player.move(1);
    if (this.input.pressed("w") || this.input.pressed(" ")) this.player.jump();

    if (this.input.justPressed("j")) {
      const hitbox = this.player.attack();

      if (hitbox) {
        this.hitboxes.push(hitbox);

        this.effects.push(
          new SlashEffect(
            this.player.x + this.player.width / 2,
            this.player.y + 22,
            this.player.direction
          )
        );
      }
    }

    const botAction = this.botAI.update(this.enemy, this.player);

    if (botAction === "attack") {
      const botHitbox = this.enemy.attack();
      if (botHitbox) this.hitboxes.push(botHitbox);
    }

    if (this.market.isNear(this.player) && this.input.justPressed("e")) {
      const upgraded = this.player.upgradeSword();

      this.message = upgraded
        ? `KILIC LVL ${this.player.swordLevel}`
        : "YETERSIZ COIN";

      this.messageTimer = 90;
    }

    if (this.checkpoint.isNear(this.player) && this.input.justPressed("e")) {
      this.checkpoint.active = true;
      this.spawnX = this.checkpoint.x;
      this.spawnY = this.checkpoint.y - this.player.height;

      this.message = "CHECKPOINT SAVED";
      this.messageTimer = 90;
    }

    this.physics.update(this.player, this.renderer.canvas.height);
    this.physics.update(this.enemy, this.renderer.canvas.height);

    this.player.updateCooldowns();
    this.enemy.updateCooldowns();

    this.player.updateAnimationState();
    this.enemy.updateAnimationState();

    for (const hitbox of this.hitboxes) {
      hitbox.update();

      if (hitbox.active && hitbox.owner === this.player && hitbox.intersects(this.enemy)) {
        this.enemy.damage += hitbox.damage;

        const dir = this.player.direction;
        const force = hitbox.knockback * (1 + this.enemy.damage / 100);

        this.enemy.vx += dir * force;
        this.enemy.vy -= force * 0.45;

        this.camera.addShake(10);
        hitbox.active = false;
      }

      if (hitbox.active && hitbox.owner === this.enemy && hitbox.intersects(this.player)) {
        this.player.damage += hitbox.damage;

        const dir = this.enemy.direction;
        const force = hitbox.knockback * (1 + this.player.damage / 100);

        this.player.vx += dir * force;
        this.player.vy -= force * 0.45;

        this.camera.addShake(8);
        hitbox.active = false;
      }
    }

    this.hitboxes = this.hitboxes.filter(h => h.active);

    for (const effect of this.effects) effect.update();
    this.effects = this.effects.filter(effect => effect.alive);

    this.checkKO(this.player, this.playerSpawn, "BOT");
    this.checkKO(this.enemy, this.enemySpawn, "PLAYER");

    if (this.messageTimer > 0) this.messageTimer--;
    else this.message = "";

    this.camera.follow(this.player, this.enemy, this.renderer.canvas);
  }

  checkKO(player, spawn, opponentName) {
    if (player.y > 900 || player.x < -900 || player.x > 1800) {
      player.stocks--;

      if (player.stocks <= 0) {
        this.gameOver = true;
        this.winner = `${opponentName} WINS`;
        return;
      }

      player.respawn(spawn.x, spawn.y);

      this.message = `${opponentName} SCORED`;
      this.messageTimer = 70;
    }
  }

  render() {
    this.renderer.render(
      this.player,
      this.enemy,
      this.hitboxes,
      this.camera,
      this.menu,
      this.hud,
      this.effects,
      this.market,
      this.message,
      this.checkpoint,
      this.gameOver,
      this.winner
    );
  }
}
