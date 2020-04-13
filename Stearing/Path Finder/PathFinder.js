
let vehicles = [];
let path;
function setup() {
    createCanvas(600, 600);
    path = new Path();
}
function draw() {
    background(51);
    path.display();
    vehicles.forEach( v => {
        v.display();
        v.update();
        v.follow(path);
    })
}
class Vehicle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(5, 0);
        this.accel = createVector(0, 0);

        this.maxVel = 4; // max velocity
        this.maxSteer = 0.05; //max steer

        this.r = 5;
    }
    display() {
        push();
        
        translate(this.pos.x, this.pos.y);
        rectMode(CENTER);

        rotate(this.vel.heading() + PI*2);

        stroke(0);
        strokeWeight(1)
        fill(0, 200, 12);
        
        triangle(this.r * 3, 0, 0, this.r, 0, -this.r);
        
        pop();
    }
    follow(target) {
        // Follow a target(path) based in his position

        // Predict future position in 50 frames
        let predict = p5.Vector.mult(this.vel, 1);
        predict.setMag(target.radius);

        let predictLoc = p5.Vector.add(this.pos, predict);

        this.showPredict(predictLoc);

        let borders = {str: target.limits[0], end: target.limits[1]}
        let normalPoint = this.getNormalPoint(predictLoc, borders.str, borders.end);

        let dir = p5.Vector.sub(borders.end, borders.str);
        dir.normalize();
        let t = p5.Vector.add(normalPoint, dir);

        if (p5.Vector.dist(predictLoc, normalPoint) > target.radius) {
            // Seek algorithm
            let desired = p5.Vector.sub(t, this.pos);
            if (desired.mad != 0) {
                desired.setMag(this.maxVel);
                let steer = p5.Vector.sub(desired, this.vel);
                steer.limit(this.maxSteer);
                this.applyForce(steer);
            }
    
        }



    }
    getNormalPoint(loc, s, e) {
        let sLoc = p5.Vector.sub(loc, s);
        let sE = p5.Vector.sub(e, s);
        sE.normalize();
        sE.mult(sLoc.dot(sE));
        return p5.Vector.add(s, sE);
    }
    update() {
        this.translate()

        this.vel.add(this.accel);
        
        this.vel.limit(this.maxVel);
        this.accel.mult(0);

        this.pos.add(this.vel);

    }
    showPredict(p) {
        stroke(255, 0, 0);
        strokeWeight(0.4);
        line(this.pos.x, this.pos.y, p.x, p.y);
    }
    applyForce(force) {
        this.accel.add(force)
    }
    translate() {
        let pad = 30;
        if (this.pos.x > width + pad) {
            this.pos.x = 0;
        } else if (this.pos.x < 0 - pad) {
            this.pos.x = width; 
        }
    }
}
class Path{
    constructor() {
        this.pos = createVector(0, height * 0.4); // upper left position
        this.radius = 40; // path's radius

        this.limits = [createVector(0, height* 0.4), createVector(width, height*0.4)];
    }
    display() {
        strokeWeight(this.radius*2);
        stroke(0, 108, 208);
        line(this.limits[0].x, this.limits[0].y, this.limits[1].x, this.limits[1].y);
    }
}

function mousePressed() {
    let r = 20;
    let prev, loc;
    for (let i = 0; i < 4; i++) {
        loc = [random(mouseX - r, mouseX + r), random(mouseY - r, mouseY + r)]
        if (loc != prev) {
            vehicles.push(new Vehicle(loc[0], loc[1]));
        } else {
            i--;
        }
        prev = loc;
    }
}