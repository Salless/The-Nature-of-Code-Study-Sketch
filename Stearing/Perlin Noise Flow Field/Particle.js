class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acce = createVector(0, 0);
    
        this.curForce;
    }
    display() {
        push();
        stroke(156, 156, 0);
        strokeWeight(6)
        point(this.pos.x, this.pos.y)
        pop();
    }
    update() {
        this.edges();

        this.vel.add(this.acce);
        this.vel.limit(6);
        this.pos.add(this.vel);
        this.acce.mult(0);

    }
    applyForce(f) {
        this.acce.add(f);
    }
    edges() {
        if (this.pos.x > width) {
            this.pos.x = 0;
        } else if (this.pos.x < 0) {
            this.pos.x = width;
        }
        
        if (this.pos.y > height) {
            this.pos.y = 0;
        } else if (this.pos.y < 0) {
            this.pos.y = height;
        }  
    }
    follow(vectors, perlim) {
        // let x = floor(this.pos.x/scl)
        // let y = floor(this.pos.y/scl)
        // let index = x + y * cols;
        let f = p5.Vector.fromAngle(perlim);
        this.applyForce(f);
    }
}