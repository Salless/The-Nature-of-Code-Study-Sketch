
let mover;
let follower = [];

function setup() {
    createCanvas(600, 600);
    for (let i = 0; i < 10; i++) {
        follower[i] = new Follower();
    }
    mover = new Mover();
}
function draw() {
    background(51);
    follower.forEach(f => {
        f.move(mover);
        f.display();
        
    })
    
    mover.display();
    mover.update();
}

class Mover {
    constructor() {
        this.pos = createVector(mouseX, mouseY)
    }
    update() {
        this.pos = createVector(mouseX, mouseY);
    }
    display() {
        fill(255, 108);
        ellipse(this.pos.x, this.pos.y, 36, 36)
        noStroke();
        fill(255, 54);
        ellipse(this.pos.x, this.pos.y, 12, 12)
    }

}
class Follower {
    constructor() {
        this.pos = createVector(width / 2, random(height))
        this.v = random(5, 10)
        this.vel = createVector(0, 0);
        this.accel = createVector(0, 0);
    }
    display() {
        fill(255, 108);
        ellipse(this.pos.x, this.pos.y, 6, 6);
    }
    move(target) {
        this.accel = p5.Vector.sub(target.pos, this.pos);
        this.accel.setMag(1);

        this.vel.add(this.accel);
        this.vel.limit(this.v);

        this.pos.add(this.vel);
        
        //this.accel.mult(0);
    }
}