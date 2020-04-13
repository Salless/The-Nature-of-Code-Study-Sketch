
let engine;
let bodies = [];
let ramps = []
let ground,
 clickPos,
 mDragged,
 debugPoints = [];

function setup() {
    createCanvas(600, 600);
    engine = Matter.Engine.create();
    
    mDragged = false;

    ground = new Ramp(width/2, height - 15, width, 30, PI);
    // Matter.Engine.run(engine);

    ramps.push(new Ramp(250, 200, width * 0.4, 20, PI/6))
    ramps.push(new Ramp(300, 400, width * 0.5, 10, PI* 1.85))
    ramps.push(new Ramp(450, 300, 300, 20, PI * 1.5))
}
function draw() {
    background(51);
    Matter.Engine.update(engine);

    for (let i = 0; i < bodies.length; i++) {
        bodies[i].display();

        if (bodies[i].isOffWorld()) {
            bodies[i].remove()
            bodies.splice(i, 1);
            i--;
        }
    }
    ramps.forEach(r => {
        r.display();
    });
    
    ground.display();
    debugPoints.forEach(d => {
        push();
        fill(0, 255, 0);
        rectMode(CENTER);
        ellipse(d.x, d.y, 8);
        pop();
    })
    if (mDragged) {
        push();
        stroke(127);
        line(clickPos.x, clickPos.y, mouseX, mouseY);
        pop();
    }
}
function mousePressed() {
    clickPos = {x: mouseX, y: mouseY};
    debugPoints.push(clickPos);
}
function mouseDragged() {
    mDragged = true;
}
function mouseReleased() {
    let minDist = 10
    let d = dist(clickPos.x, clickPos.y, mouseX, mouseY)
    
    if (d < minDist) {
        bodies.push(new Sphere(mouseX, mouseY, floor(random(2, 4)) * 10));
    } else {
        ramps.push(createRamp(clickPos.x, clickPos.y, mouseX, mouseY, d));
    }
    mDragged = false;
}
class Sphere {
    constructor(x, y, r) {
        let op = {
            friction: 0.1,
            restitution: 0,
            isStatic: false
        }
        this.r = r;
        this.body = Matter.Bodies.circle(x, y, r, op);
        
        Matter.World.add(engine.world, this.body);
    }

    display() {
        push();
        rectMode(CENTER);
        strokeWeight(1);
        stroke(168);
        fill(108);
        ellipse(this.body.position.x, this.body.position.y, this.r * 2);
        pop();
    }
    isOffWorld() {
        return (this.body.position.y > height + 100)
    }
    remove() {
        Matter.World.remove(engine.world, this.body);
    }
}

class Ramp {
    constructor(x, y, w, h, an) {
        // angle in radians
        let op = {
            angle: an,
            friction: 0.01,
            isStatic: true
        };
        this.body = Matter.Bodies.rectangle(x, y, w, h, op);
        this.w = w;
        this.h = h;
        Matter.World.add(engine.world, this.body);
    }
    display() {
        push();

        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        rectMode(CENTER);

        noStroke();
        fill(0);
        rect(0, 0, this.w, this.h);
        fill(255,127);
        rect(-this.w/2 + this.w*0.05, 0, this.w*0.1, this.h);

        pop();

    }
}

function createRamp(x0, y0, x, y, d) {
    // Personal notes: search effective way to get an angle between two points
    let l1 = createVector(x0, y0);
    let l2 = createVector(x, y);
    // let p = l1.dot(l2);
    // let debug = p / (l1.mag() * l2.mag());
    let debug = l1.angleBetween(l2);
    let theta = acos(debug)
    console.log(debug, theta, arguments);
    return new Ramp(x0 + d/2, y0, w=d, h=15, an=theta);
}