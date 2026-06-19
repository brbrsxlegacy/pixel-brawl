export class Animation {
  constructor(image, frameWidth, frameHeight, frameCount, speed = 6) {
    this.image = image;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.frameCount = frameCount;
    this.speed = speed;

    this.currentFrame = 0;
    this.timer = 0;
  }

  update() {
    this.timer++;

    if (this.timer >= this.speed) {
      this.timer = 0;
      this.currentFrame++;

      if (this.currentFrame >= this.frameCount) {
        this.currentFrame = 0;
      }
    }
  }
}
