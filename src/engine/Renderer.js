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

  render(player) {
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

    ctx.fillStyle = "#31D6FF";
    ctx.fillRect(player.x, player.y, player.width, player.height);
  }
}
