let spring, blob;
let c = 0
function setup() {
    createCanvas(600, 400);
    spring = new Spring();
    blob = new Blob();
}
function draw() {
    background(51);
    
    translate(width/2, 10);


    blob.display();
    spring.display(blob);
    spring.stretch(blob);
    spring.constrainLen(blob)
}
class Spring {
    constructor() {
        this.rest = 100;
        this.k = 0.01;
        this.pos = createVector(0, 0);

    }
    
    
    display = function(b) {
        line(this.pos.x, this.pos.y, b.pos.x, b.pos.y);
        fill(0);
        ellipse(this.pos.x, this.pos.y, 10)
    }
    stretch(b) {
        const force = p5.Vector.sub(b.pos, this.pos);
        const cur = force.mag();
        
        let x = cur - this.rest
        force.setMag(-1 * this.k * x);
        b.applyForce(force)
    }
    constrainLen(b) {
        const dir = p5.Vector.sub(b.pos, this.pos);
        let d = dir.mag();
        dir.normalize();
        if (d < 40) {
            dir.mult(40);
            b.pos = p5.Vector.add(this.pos, dir);
            b.vel.mult(0)
        } else if (d > 200){
            dir.mult(200);
            b.pos = p5.Vector.add(this.pos, dir);
            b.vel.mult(0);
        }
    }
}

class Blob {
    constructor() {
        this.pos = createVector(0, 200)
        
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);

        this.mass = 1;
    }
    display() {
        rectMode(CENTER);
        fill(127);
        rect(this.pos.x, this.pos.y, 40, 40)
        this.update()
    }
    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0)
    }
    applyForce(force) {
        const f = p5.Vector.div(force, this.mass);
        this.acc.add(f);
    }
}

