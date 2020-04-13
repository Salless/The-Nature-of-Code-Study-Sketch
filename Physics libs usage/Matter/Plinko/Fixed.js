class FixedSphere {
    constructor(x, y, r) {
        this.r = r;
        this.body = Bodies.circle(x, y, this.r, {isStatic: true, restitution: 0.6, friction: 0});
        World.add(world, this.body);
    }
    display() {
        let pos = this.body.position;
        push();
        fill(0, 158, 0);
        stroke(0);
        ellipse(pos.x, pos.y, this.r*2);
        pop();
    }
}

class Ground {
    constructor() {
        this.w = width;
        this.h = 50;
        this.body = Bodies.rectangle(width * 0.5, height, this.w, this.h, {isStatic: true, friction: 1, frictionStatic: 10, restitution: 0})
        World.add(world, this.body)
    }
    display() {
        let pos = this.body.position;
        push();
        rectMode(CENTER);
        fill(0);
        noStroke();
        rect(pos.x, pos.y, this.w, this.h)
        pop();
    }
}
class Collun {
    constructor(x, w, h) {
        this.dim = [w, h]
        this.body = Bodies.rectangle(x, height - 50, w, h, {isStatic: true, frictionStatic: 10});
        World.add(world, this.body);
        // add circle
        // World.add(world, Bodies.circle(x, height - 50 - h, w, {isStatic: true, friction: 0, restitution: 1}))
    }
    display() {
        let pos = this.body.position;
        push();
        rectMode(CENTER);
        fill(6);
        noStroke();
        rect(pos.x, pos.y, this.dim[0], this.dim[1]);
        pop();
    }
}