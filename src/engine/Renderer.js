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

    const ctx = this.ctx;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    if (menu.active) {
      this.drawMenu();
      return;
    }
    
    ctx.save();
    camera.apply(ctx);
    
    this.drawWorld();
    this.drawPlayer(player);
    this.drawPlayer(enemy);
    
    for (const hitbox of hitboxes) {
      this.drawHitbox(hitbox);
    }
    
    ctx.restore();
    
    hud.draw(ctx, player, enemy);
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
  
    if (player.state === "idle") {
      ctx.fillStyle = "#31D6FF";
    }
  
    if (player.state === "run") {
      ctx.fillStyle = "#00FF88";
    }
  
    if (player.state === "jump") {
      ctx.fillStyle = "#FFD54A";
    }
  
    ctx.fillRect(
      player.x,
      player.y,
      player.width,
      player.height
    );
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
  drawMenu() {
    const ctx = this.ctx;
  
    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  
    ctx.fillStyle = "#FFD54A";
    ctx.beginPath();
    ctx.arc(150, 120, 60, 0, Math.PI * 2);
    ctx.fill();
  
    ctx.fillStyle = "#1b1b1b";
    ctx.fillRect(
      this.canvas.width / 2 - 220,
      this.canvas.height / 2 - 120,
      440,
      240
    );
  
    ctx.fillStyle = "#ffffff";
    ctx.font = "36px monospace";
    ctx.textAlign = "center";
    ctx.fillText("PIXEL BRAWL", this.canvas.width / 2, this.canvas.height / 2 - 35);
  
    ctx.font = "20px monospace";
    ctx.fillText("ENTER BAS VE OYNA", this.canvas.width / 2, this.canvas.height / 2 + 35);
  
    ctx.textAlign = "left";
  }
