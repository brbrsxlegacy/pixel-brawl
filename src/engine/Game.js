import { Renderer } from "./Renderer.js";
import { Input } from "./Input.js";
import { Physics } from "./Physics.js";
import { Player } from "../entities/Player.js";

export class Game {
  constructor() {
    this.renderer = new Renderer();
    this.input = new Input();
    this.physics = new Physics();
    this.player = new Player();

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

    this.physics.update(this.player, this.renderer.canvas.height);
  }

  render() {
    this.renderer.render(this.player);
  }
}
