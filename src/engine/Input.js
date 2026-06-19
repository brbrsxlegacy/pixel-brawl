export class Input {
  constructor() {
    this.keys = {};
    this.locked = {};

    window.addEventListener("keydown", (e) => {
      this.keys[e.key.toLowerCase()] = true;
    });

    window.addEventListener("keyup", (e) => {
      const key = e.key.toLowerCase();
      this.keys[key] = false;
      this.locked[key] = false;
    });
  }

  pressed(key) {
    return !!this.keys[key.toLowerCase()];
  }

  justPressed(key) {
    key = key.toLowerCase();

    if (this.keys[key] && !this.locked[key]) {
      this.locked[key] = true;
      return true;
    }

    return false;
  }
}
