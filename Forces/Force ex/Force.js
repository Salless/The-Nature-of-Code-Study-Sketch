
let pepe = [];
let moon = [];
let setWind = false;
function setup() {
    createCanvas(600, 600);

    moon[0] = new Moon();

    for (let i = 0; i < 1; i++) {
        pepe[i] = new Ball();
    }
}

function draw() {
    background(51);
    fill(102);
    rect(0, 0, width, height/2)
    pepe.forEach( p => {
        if (setWind === true) {
            let wind = createVector(0, -0.5*p.mass);
            p.applyForce(wind);
        }
    
        let grav = createVector(0, 0.2);
        grav.mult(p.mass);
        p.applyForce(grav);
        

        // Friction
        let friction = p5.Vector.mult(p.vel, -1);
        friction.normalize();
        let mi = 0.05;
        friction.mult(mi);
        p.applyForce(friction);

        // Drag = (-2 * D*  v2 * Sa * Dc) (pow-1)
        let drag = p5.Vector.mult(p.vel, -1);
        drag.normalize();
        let dc = 1;
        if (p.pos.y > height/2) {
            dc = 0.5;
        } else {
            dc = 0.02;
        }
        drag.mult(2 * pow(p.vel.mag(), 2) * dc);

        p.applyForce(drag);

        // Grav
        moon.forEach(m => {
            let grav = m.attract(p);
            p.applyForce(grav);
            grav.mult(-1)
            m.applyForce(grav);
        })
        
        p.display();
        p.update();
        p.checkEdges();
    })
    moon[0].display()
    moon[0].update();
}

class Ball {
    constructor() {
        this.y = this.radius;
        this.x = random(width);
        
        this.mass = random(1, 3);
        
        this.pos = createVector(this.x, this.y);
        this.vel = createVector(0, 0);
        this.accel = createVector(0, 0);

        this.radius = this.mass * 15;
        this.volume = this.radius * this.radius * 3.14;
        this.dencity = this.mass / this.volume;
    }
    display() {
        fill(255, 128);
        ellipse(this.pos.x, this.pos.y, this.radius)
    }
    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.accel.add(f);
    }
    update() {
        this.vel.add(this.accel);
        this.pos.add(this.vel);
        this.accel.mult(0);
    }
    checkEdges() {
        let dim = this.mass * 9;
        if (this.pos.x > width - dim) {
            this.pos.x = width-dim;
            this.vel.x *= -1;
        } else if (this.pos.x < dim) {
            this.pos.x = dim;
            this.vel.x *= -1;
        }
        if (this.pos.y > height - dim) {
            this.pos.y = height-dim
            this.vel.y *= -1;
        } else if (this.pos.y < dim) {
            this.pos.y = dim;
            this.vel.y = 1;
        }
    }
}

class Moon{
    constructor() {
        this.x = width /2;
        this.y = height * 0.05;
        this.pos = createVector(this.x, this.y);
        this.vel = createVector(0, 0);
        this.accel = createVector(0, 0);
        this.mass = 110;
    }
    attract(object) {
        if (this.pos.x > object.pos.x && object.pos.x > this.pos.x + 40 && object.pos.y < this.pos.y && object.pos.y > this.pos.y + 40) {
        
            return createVector(0.1, 0.1);
        } else {

        
        let dir = p5.Vector.sub(this.pos, object.pos);
        let d = dir.mag();
        d = constrain(d, 10, 50);        
        
        dir.normalize();

        
        const Grav = 1;
        const g  = this.mass * object.mass * Grav / pow(d, 2);
        
        dir.mult(g);
        return dir
        }
    }
    applyForce(force) {
        const f = p5.Vector.div(force, this.mass);
        this.accel.add(f);
    }
    update() {
        this.vel.add(this.accel);
        this.pos.add(this.vel);
        this.accel.mult(0);
    }
    display() {
        fill(200, 100)
        ellipse(this.pos.x, this.y, 40, 40);
    }
}

function mousePressed() {
    setWind = true;
}
function mouseReleased() {
    setWind = false;
}