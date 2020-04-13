let Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

let engine;
let pepe = [];

function setup() {
    createCanvas(600, 600);
    engine = Engine.create()

    World.add(engine.world, Bodies.rectangle(width/2, height - 60, width, 30, {isStatic: true, restitution: 0, friction: 0}));

    Engine.run(engine);
}
function draw() {
    background(51);
    
    pepe.forEach(p => {
        push();
        fill(255, 127);
        rectMode(CENTER);
        rect(p.position.x, p.position.y, 40, 40);
        pop();
    });
}

function mousePressed() {
    
    
    let p = Bodies.rectangle(mouseX, mouseY, 40, 40, {density: 0.2, friction: 1, restitution: 0});
    pepe.push(p);
    World.add(engine.world, p);
}