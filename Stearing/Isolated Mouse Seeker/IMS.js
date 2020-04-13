
let followers = [];
let mouse;

let stop;
function setup() {
    createCanvas(600, 600);
    for (let i = 0; i < 20; i++) {
        followers.push(new Follower(random(width), random(height)));
    }
    mouse = new Mouse(mouseX, mouseY);
    stop = false;
}
function draw() {
    background(51);
    followers.forEach(f => {
        f.display();
        f.update();
        f.behave();
    })
    mouse.update()
    mouse.display()
}
class Follower {
    constructor(x, y) {
        this.pos = createVector(x, y)
        this.vel = createVector(0, 0)
        this.acce = createVector(0, 0)
    
        this.maxSpeed = 1;
        this.maxForce = 0.02;

        this.r = 6;
    }
    display() {
        push();

        translate(this.pos.x, this.pos.y);

        fill(0, 200, 0, 127);
        rotate(this.vel.heading() + 2* PI);
        triangle(this.r*2, 0, 0, this.r, 0, -this.r);
        
        pop();
    }
    applyForce(f) {
        this.acce.add(f);
    }
    update() {
        this.vel.add(this.acce);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acce.mult(0);
    }
    behave() {
        if (!stop) {
            this.disperse(followers);
        }
        this.seek(mouse);
    }
    seek(target) {
        let desired = p5.Vector.sub(target.pos, this.pos);
        desired.setMag(this.maxSpeed);

        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);

        this.applyForce(steer);
    }
    disperse(followers) {
        let sum = createVector(0, 0);
        let c = 0;
        followers.forEach(f => {
            let d = dist(this.pos.x, this.pos.y, f.pos.x, f.pos.y);
            if (d > 0 && d < 80) {
                let dif = p5.Vector.sub(this.pos, f.pos);
                dif.normalize();
                dif.div(d);
                sum.add(dif);
                c++;
            }
        })
        if (c > 0) {
            sum.div(c);
            sum.setMag(this.maxSpeed);
            let steer = p5.Vector.sub(sum, this.vel);
            steer.limit(this.maxForce);
            this.applyForce(steer);
        }
    }
}

class Mouse {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.r = 4;
    }
    display() {
        push();

        fill(255, 0 ,0);
        ellipse(this.pos.x, this.pos.y, this.r * 5);
        

        fill(0);
        ellipse(this.pos.x, this.pos.y, this.r);

        pop();
    }
    update() {
        this.pos = createVector(mouseX, mouseY);
    }
}

function mousePressed() {
    stop = true;
}
function mouseReleased() {
    stop = false;
}