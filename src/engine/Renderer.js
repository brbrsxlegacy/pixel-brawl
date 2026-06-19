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

  render(player, enemy, hitboxes) {
    const ctx = this.ctx;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.beginPath();
    ctx.arc(150, 120, 50, 0, Math.PI * 2);
    ctx.fillStyle = "#FFD54A";
    ctx.fill();

    ctx.fillStyle = "#5E9C36";
    ctx.fillRect(0, this.canvas.height - 120, this.canvas.width, 120);

    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

    ctx.fillStyle = "rgba(255,255,255,0.45)";
    for (const hitbox of hitboxes) {
      ctx.fillRect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
    }

    ctx.fillStyle = "#000";
    ctx.font = "24px Arial";
    ctx.fillText(`${Math.floor(enemy.damage)}%`, 30, 40);
  }
}
