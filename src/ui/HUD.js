export class HUD {
  draw(ctx, player, enemy) {
    ctx.save();

    ctx.fillStyle = "#1b1b1b";
    ctx.fillRect(20, 20, 240, 85);
    ctx.fillRect(ctx.canvas.width - 260, 20, 240, 85);

    ctx.fillStyle = "#ffffff";
    ctx.font = "18px monospace";

    ctx.fillText("PLAYER", 42, 46);
    ctx.fillText(`${Math.floor(player.damage)}%`, 42, 72);
    ctx.fillText(`STOCK ${player.stocks}`, 42, 96);

    ctx.fillText("BOT", ctx.canvas.width - 230, 46);
    ctx.fillText(`${Math.floor(enemy.damage)}%`, ctx.canvas.width - 230, 72);
    ctx.fillText(`STOCK ${enemy.stocks}`, ctx.canvas.width - 230, 96);

    ctx.restore();
  }
}
