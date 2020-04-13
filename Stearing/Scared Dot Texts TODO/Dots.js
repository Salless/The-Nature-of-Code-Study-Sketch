function Dot(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acce = createVector(0, 0);
    this.target = createVector(x, y);
}