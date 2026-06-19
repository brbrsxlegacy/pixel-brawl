import { Renderer } from "./Renderer.js";
import { Input } from "./Input.js";

export class Game {
  constructor() {
    this.renderer = new Renderer();
    this.input = new Input();
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
    // Part 2'de physics gelecek
  }

  render() {
    this.renderer.render();
  }
}
