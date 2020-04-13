
let particles = [];
let dragged;
function setup() {
    createCanvas(600, 600);
    dragged = false;

    for (let i = 0; i < 50; i++) {
        particles.push(new Particle(random(30, width-30), random(30, height-30), col=0));
    }

}
function draw() {
    background(51);
    particles.forEach(p => {
        p.display();
        p.update();
        p.disperse(particles);
    })


    if (dragged) {
        if (frameCount % 4 == 0) {
            particles.push(new Particle(mouseX, mouseY, col=200))
        }
    }
}

class Particle {
    constructor(x, y, col) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acce = createVector(0, 0);

        this.r = 16;
        this.type = col;
    }
    display() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading() + PI * 2);
        fill(0, this.type, 0, 200);
        stroke(0);
        ellipse(0, 0, this.r);
        line(0, 0, this.r/2, this.vel.heading());
        pop();
    }
    applyForce(f) {
        this.acce.add(f);
    }
    checkBorders() {
        let pad = 30;
        if (this.pos.x < pad) {
            this.vel.x *= -1;
            this.pos.x = pad;
        }
        if (this.pos.x > width - pad) {
            this.vel.x *= -1;
            this.pos.x = width - pad;
        }
        if (this.pos.y < pad) {
            this.vel.y *= -1;
            this.pos.y = pad
        }
        if (this.pos.y > height - pad) {
            this.vel.y *= -1;
            this.pos.y = height - pad;
        }
    }
    update() {
        // if (particles.length >)
        this.checkBorders();
        this.vel.add(this.acce);
        this.vel.limit(5);
        
        this.pos.add(this.vel);

        this.acce.mult(0);
    }
    disperse(particles) {
        let s = createVector(0, 0);
        let c = 0;
        particles.forEach(p => {
            let d  = dist(this.pos.x, this.pos.y, p.pos.x, p.pos.y);
            if (d > 0 && d < this.r * 2) {
                let dif = p5.Vector.sub(this.pos, p.pos);
                
                dif.normalize();
                dif.div(d);

                s.add(dif);
                c++;
            }
        })
        if (c > 0) {
            s.div(c);
            s.setMag(5);
            let steer = p5.Vector.sub(s, this.vel);
            steer.limit(8);
            this.applyForce(steer);
        }

    }
}


function mousePressed() {
    dragged = true
}
function mouseReleased() {
    dragged = false
}