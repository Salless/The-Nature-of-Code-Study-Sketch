class Follower {
    constructor(genes) {
        this.origin = createVector(30, height/2);
        this.pos = p5.Vector.mult(this.origin, 1);

        this.vel = createVector(0, 0);
        this.accel = createVector(0, 0);

        if (genes) {
            this.crusters = genes;
        } else {
            this.crusters = []
            for (let i = 0; i < rocketLifespan; i++) this.crusters.push(new Cruster())
        }

        this.mass = 2;
        this.r = 4;
        this.fitness = 0;
     
        this.maxVel = 3
        this.maxSteer = 0.15
    }
    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.accel.add(f);
    }
    applyCruster() {
        let curCruster = this.crusters[count]
        this.applyForce(curCruster.force);
    }
    update() {
        this.applyCruster()
        // this.checkBorders();

        // Update Physics
        this.vel.add(this.accel);
        this.vel.limit(this.maxVel);
        this.pos.add(this.vel);
        this.accel.mult(0);
    
    }
    checkBorders() {
        let bor = 50;
        let bounce = 2;

        let desired = null;
        
        if (this.pos.x < bor) {
            desired = createVector(this.maxVel, bounce * this.vel.y);
        } else if (this.pos.x > width - bor) {
            desired = createVector(-this.maxVel, bounce * this.vel.y)
        }

        if (this.pos.y < 200) {
            desired = createVector(this.vel.x, this.maxVel)
        } else if (this.pos.y > height - 200) {
            this.vel.y 
            desired = createVector(this.vel.x, -this.maxVel)
        }

        if (desired != null) {
            desired.normalize();
            desired.mult(this.maxVel);
            const steer = p5.Vector.sub(desired, this.vel);
            steer.limit(this.maxSteer);
            this.applyForce(steer);
        }
    } 
    display() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());

        noStroke();
        fill(255, 127);
        triangle(this.r * 2, 0, 0, this.r, 0, -this.r);
        pop();
    }
    calcFitness(target) {
        let d = dist(target.pos.x, target.pos.y, this.pos.x, this.pos.y);
        if (d < 0.1) d = 0.1;
        this.fitness = map(d, 0, width, width, 0)
        // this.fitness = pow(this.fitness, 2) + 0.01;
    }

    crossover(p) {
        let genes = [];
        
        // Heredity
        let len = this.crusters.length
        let midpoint = floor(random(len));
        for (let i = 0; i < len; i++) {
            if (i < midpoint) genes[i] = this.crusters[i]
            else genes[i] = p.crusters[i]
        }

        return new Follower(genes);
    }
    mutate() {
        let mr = 0.01
        for (let i = 0; i < this.crusters.length; i++) {
            if (random(1) < mr) {
                let curCruster = this.crusters[i]
                curCruster.force = createVector(random(curCruster.range), random(curCruster.range));
            }
        }
        
    }
}