let Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Mouse = Matter.Mouse,
    Constraint = Matter.Constraint;

let engine;

let particles = [];
let ground;
let mConstraint;

function setup() {
    let canvasm = createCanvas(800, 650);
    engine = Engine.create();
    ground = new Ground();

    let amp = new Particle(width/2, 50, 6, true);
    particles.push(amp);
    let prev = amp;
    
    for (let i = 40; i <= 600; i += 40) {
        let p = new Particle(i, 100, 12);
        particles.push(p);
        let cons = Constraint.create({bodyA: p.body, bodyB: prev.body, length: 30, stiffness: 0.6})
        World.add(engine.world, cons);
        prev = p;
    }

    let canvasmouse = Mouse.create(canvasm.elt);
    canvasmouse.pixelRatio = pixelDensity();
    mConstraint = Matter.MouseConstraint.create(engine, {mouse: canvasmouse}); 
    World.add(engine.world, mConstraint);

}
function draw() {
    background(51);
    Engine.update(engine);
    particles.forEach(p => {
        p.display();
    })
    if (mConstraint.body) {
        let pos = mConstraint.body.position;
        let mouse = mConstraint.mouse.position;
        let offSet = mConstraint.constraint.pointB;
        push();
        stroke(0, 255, 0);
        line(pos.x + offSet.x, pos.y+ offSet.y, mouse.x, mouse.y);
        fill(127, 0, 0)
        ellipse(pos.x+offSet.x, pos.y+offSet.y, 8)
        pop();
    }
}

class Particle {
    constructor(x, y, r, fixed=false) {
        this.body = Bodies.circle(x, y, r, {isStatic: fixed})
        World.add(engine.world, this.body);
        this.r = r;
    
    }
    display() {
        push();
        translate(this.body.position.x, this.body.position.y);
        rectMode(CENTER);

        strokeWeight(2);
        line(0, 0, 0, this.r);

        fill(255, 127);
        noStroke();
        ellipse(0, 0, this.r*2)
        
        pop();
    }

}
class Ground {
    constructor() {
        World.add(engine.world, Bodies.rectangle(width/2, height, width, 40, {isStatic: true, friction: 0}));
    }
}
