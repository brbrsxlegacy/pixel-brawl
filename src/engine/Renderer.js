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

  render(player, enemy, hitboxes, camera) {
    const ctx = this.ctx;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.save();

    camera.apply(ctx);

    this.drawWorld();
    this.drawPlayer(player);
    this.drawPlayer(enemy);

    for (const hitbox of hitboxes) {
      this.drawHitbox(hitbox);
    }

    ctx.restore();

    this.drawHUD(enemy);
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

    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
  }

  drawHitbox(hitbox) {
    const ctx = this.ctx;

    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.fillRect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
  }

  drawHUD(enemy) {
    const ctx = this.ctx;

    ctx.fillStyle = "#000";
    ctx.font = "24px Arial";
    ctx.fillText(`${Math.floor(enemy.damage)}%`, 30, 40);
  }
}
