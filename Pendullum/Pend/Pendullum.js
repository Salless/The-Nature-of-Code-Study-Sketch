
let pepe;

function setup() {
    createCanvas(600, 600);
    pepe = new Pendullum(300);
}
function draw() {
    background(51);

    
    
    pepe.move();
    pepe.display();
}

class Pendullum {
    constructor(len, t=PI/4) {
        this.len = len;
        this.teta = t;
        this.origin = createVector(width/2, 0);
    
        this.pos = createVector(0, 0);
        
        this.an_vel = 0;
        
        this.r = 40;
        
        this.dragged = false;
    }
    display() {
        
        if (this.dragged) { fill(0) } else { fill(255, 128) }

        ellipse(this.pos.x, this.pos.y, this.r, this.r);
        line(this.origin.x, this.origin.y, this.pos.x, this.pos.y);
    }
    move() {
    
        this.pos.set(this.len*sin(this.teta), this.len*cos(this.teta), 0);
        this.pos.add(this.origin);
    
        if (!this.dragged) {
            let an_acc = -0.01 * sin(this.teta);
            this.an_vel += an_acc;
            this.an_vel *= 0.99;
            this.teta += this.an_vel;
        } else {
            this.pos.set(mouseX, mouseY, 0);
            let diff = p5.Vector.sub(this.origin, createVector(mouseX, mouseY));
            this.teta = atan2(-1*diff.y, diff.x) - radians(90);
            this.an_vel = 0;
        }
    }
}

function mousePressed() {
    let d = dist(mouseX, mouseY, pepe.pos.x, pepe.pos.y);
    if (d < pepe.r) {
        pepe.dragged = true;
    }

}

function mouseReleased() {
    if (pepe.dragged) {
        pepe.dragged = false;
    }
}