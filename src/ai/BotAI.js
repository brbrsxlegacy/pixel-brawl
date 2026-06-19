export class BotAI {
  update(bot, player) {
    const dx = player.x - bot.x;
    const distance = Math.abs(dx);

    if (distance > 70) {
      if (dx > 0) {
        bot.move(1);
      } else {
        bot.move(-1);
      }
    }

    if (distance < 80 && Math.random() < 0.03) {
      return "attack";
    }

    if (
      player.y < bot.y - 40 &&
      bot.onGround &&
      Math.random() < 0.02
    ) {
      bot.jump();
    }

    return null;
  }
}
