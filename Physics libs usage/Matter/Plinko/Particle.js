class Particle {
    constructor(x, y, r) {
        this.r = r
        this.body = Bodies.circle(x, y, r, {restitution: 0.5, friction: 0, dencity: 0.1});
        World.add(world, this.body);
    }
    display() {
        let pos = this.body.position; 
        push();
        noStroke();
        fill(255, 127);
        ellipse(pos.x, pos.y, this.r*2)
        pop();
    }
}