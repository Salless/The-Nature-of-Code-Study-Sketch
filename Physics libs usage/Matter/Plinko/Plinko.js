let Bodies = Matter.Bodies,
    Engine = Matter.Engine,
    World = Matter.World,
    Constraint = Matter.Constraint;

let spheres = [],
    colluns = [],
    particles = [],
    ground;

let engine, world;

function setup() {
    createCanvas(800, 600);
    
    // create Matter.Engine
    engine = Engine.create()
    world = engine.world;
    world.gravity.y = 2;
    //world.gravity.x = 1;
    
    // setup colluns
    colluns.push(new Collun(0, 30, height * 2), new Collun(width, 30, height * 2));
    let pad = width/12
    for (let i = pad; i < width; i += pad) {
        colluns.push(new Collun(i, 10, 240));
    }
    ground = new Ground();

    //setup Spheres
    let startH = height/7;
    let heightDif = 30;

    let rowNum = 8;
    let spacing = width / (rowNum+1);

    let radius = 4;
    
    for (let i = 0; i < 11; i++) {
        for (let j = spacing; j < width; j += spacing) {
            if (i % 2 == 0) {
                spheres.push(new FixedSphere(j, startH + i * heightDif, radius));
            } else {
                if (j == spacing) {
                    spheres.push(new FixedSphere(j - spacing * 0.5, startH + i * heightDif, radius));
                }
                spheres.push(new FixedSphere(j + spacing * 0.5, startH + i * heightDif, radius));
            }
        }
    }
    addParticle();
}
function addParticle() {
    let spacing = 50;
    for (let i = 0; i < (width/spacing) -1; i++) {
        let spawm = spacing * (i+1);
        particles.push(new Particle(random(spawm-0.5, spawm+0.5), height*0.05, 12));
    }

}
function draw() {

    background(51);
    Engine.update(engine);

    // add Particle with interval. NOTE: Search performace imporviment.
    if (frameCount % 30 == 0 && particles.length < 120) {
        addParticle();
    }
    // draw Particles
    particles.forEach(p => {
        p.display()
    })
    // draw ground
    ground.display();
    // draw colluns
    colluns.forEach(c => {
        c.display();
    })

    // draw spheres
    spheres.forEach(s => {
        s.display();
    })
    // TODO remove Particle
}
