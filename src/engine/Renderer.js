export class Renderer {
  constructor() {
    this.canvas = document.getElementById("game");
    this.ctx = this.canvas.getContext("2d");

    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  render(player, enemy, hitboxes, camera, menu, hud, effects, market, message, checkpoint, gameOver, winner) {
    const ctx = this.ctx;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (menu.active) {
      this.drawMenu();
      return;
    }

    ctx.save();
    camera.apply(ctx);

    this.drawWorld();
    this.drawMarket(market);
    this.drawCheckpoint(checkpoint);
    this.drawPlayer(player);
    this.drawPlayer(enemy);

    for (const effect of effects) this.drawSlashEffect(effect);
    for (const hitbox of hitboxes) this.drawHitbox(hitbox);

    ctx.restore();

    hud.draw(ctx, player, enemy);

    if (message) this.drawMessage(message);
    if (gameOver) this.drawGameOver(winner);
  }

  drawMenu() {
    const ctx = this.ctx;

    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.fillStyle = "#FFD54A";
    ctx.beginPath();
    ctx.arc(150, 120, 60, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#1b1b1b";
    ctx.fillRect(this.canvas.width / 2 - 220, this.canvas.height / 2 - 120, 440, 240);

    ctx.fillStyle = "#ffffff";
    ctx.font = "36px monospace";
    ctx.textAlign = "center";
    ctx.fillText("PIXEL BRAWL", this.canvas.width / 2, this.canvas.height / 2 - 35);

    ctx.font = "20px monospace";
    ctx.fillText("ENTER BAS VE OYNA", this.canvas.width / 2, this.canvas.height / 2 + 35);

    ctx.textAlign = "left";
  }

  drawWorld() {
    const ctx = this.ctx;

    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(-2000, -1000, 5000, 3000);

    ctx.beginPath();
    ctx.arc(150, 120, 50, 0, Math.PI * 2);
    ctx.fillStyle = "#FFD54A";
    ctx.fill();

    ctx.fillStyle = "#5E9C36";
    ctx.fillRect(-2000, 600, 5000, 120);

    ctx.fillStyle = "#3E7A26";
    ctx.fillRect(-2000, 620, 5000, 100);
  }

  drawPlayer(player) {
    const ctx = this.ctx;

    if (player.state === "idle") ctx.fillStyle = player.color;
    if (player.state === "run") ctx.fillStyle = "#00FF88";
    if (player.state === "jump") ctx.fillStyle = "#FFD54A";

    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(player.x + 8, player.y + 10, 8, 8);
    ctx.fillRect(player.x + 25, player.y + 10, 8, 8);
  }

  drawSlashEffect(effect) {
    const ctx = this.ctx;
    const alpha = effect.life / effect.maxLife;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(effect.x, effect.y);
    ctx.scale(effect.direction, 1);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(8, -18, 54, 8);

    ctx.fillStyle = "#FFD54A";
    ctx.fillRect(18, -8, 42, 6);

    ctx.restore();
  }

  drawHitbox(hitbox) {
    const ctx = this.ctx;

    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.fillRect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
  }

  drawMarket(market) {
    const ctx = this.ctx;

    ctx.fillStyle = "#8B5A2B";
    ctx.fillRect(market.x, market.y, market.width, market.height);

    ctx.fillStyle = "#D9A441";
    ctx.fillRect(market.x + 10, market.y + 20, 70, 15);

    ctx.fillStyle = "#333";
    ctx.fillRect(market.x + 35, market.y + 45, 20, 45);

    ctx.fillStyle = "#fff";
    ctx.font = "14px monospace";
    ctx.fillText("SHOP", market.x + 22, market.y - 10);
  }

  drawCheckpoint(checkpoint) {
    const ctx = this.ctx;

    const pulse = checkpoint.active
      ? 18 + Math.sin(checkpoint.glow) * 8
      : 12;

    ctx.save();

    if (checkpoint.active) {
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.arc(checkpoint.x + 22, checkpoint.y - 10, pulse, 0, Math.PI * 2);
      ctx.fillStyle = "#FFD54A";
      ctx.fill();
    }

    ctx.globalAlpha = 1;

    ctx.fillStyle = "#555";
    ctx.fillRect(checkpoint.x, checkpoint.y, checkpoint.width, checkpoint.height);

    ctx.fillStyle = checkpoint.active ? "#FFD54A" : "#888";
    ctx.beginPath();
    ctx.arc(checkpoint.x + 22, checkpoint.y - 10, 18, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.font = "14px monospace";
    ctx.fillText("SAVE", checkpoint.x - 2, checkpoint.y - 35);

    ctx.restore();
  }

  drawMessage(message) {
    const ctx = this.ctx;

    ctx.save();

    ctx.fillStyle = "#000";
    ctx.fillRect(ctx.canvas.width / 2 - 160, 90, 320, 45);

    ctx.fillStyle = "#fff";
    ctx.font = "20px monospace";
    ctx.textAlign = "center";
    ctx.fillText(message, ctx.canvas.width / 2, 120);

    ctx.restore();
  }

  drawGameOver(winner) {
    const ctx = this.ctx;

    ctx.save();

    ctx.fillStyle = "rgba(0,0,0,0.75)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.font = "42px monospace";
    ctx.textAlign = "center";
    ctx.fillText(winner, ctx.canvas.width / 2, ctx.canvas.height / 2 - 20);

    ctx.font = "20px monospace";
    ctx.fillText("ENTER = RESTART", ctx.canvas.width / 2, ctx.canvas.height / 2 + 35);

    ctx.restore();
  }
}
