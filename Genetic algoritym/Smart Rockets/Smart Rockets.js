
let rockets = [];
let endPoint;
let generations;
let count = 0;

let alpha, rocketLifespan;

function setup() {
    createCanvas(600, 600);
    rocketLifespan = 200;
    generations = 0;
    for (let i = 0; i < 10; i++) rockets[i] = new Follower();

    endPoint = new End();
}
function draw() {
    background(51);
    rockets.forEach(r => {
        r.display();
        r.update();
    })
    count++;
    if (count === rocketLifespan) {
        eval();
        generate();

        count = 0;
    }
    // displayAlpha();
    endPoint.display()
}

class End {
    constructor() {
        this.radius = 16
        this.pos = createVector(width - this.radius - 4, height/2);
        // this.pos = createVector(0, height/2);
    }
    display() {
        push();
        fill(255, 0, 0, 127);
        stroke(0);
        
        ellipse(this.pos.x, this.pos.y, this.radius);
        pop();
    }
}
// Evaluate*
function generate() {
    let maxFit = 0;
    // Get Max fitness
    rockets.forEach(r => {
        r.calcFitness(endPoint);
        if (r.fitness > maxFit) maxFit = r.fitness;
    })
    // Normalize Fitness
    rockets.forEach(r => {
        r.fitness /= maxFit;
    })
    
    let mantingPool = []
    for (let i = 0; i < rockets.length; i++) {
        let n = floor(rockets[i].fitness * 10);
        for (let j = 0; j < n; j++) {
            mantingPool.push(rockets[i]);
        }
    }
    selection(mantingPool)
}
function selection(mantingPool) {
    // Selection
    let nextGen = [];
    for (let i = 0; i < rockets.length; i++) {
        let p1 = random(mantingPool);
        let p2 = random(mantingPool);
        
        let child = p1.crossover(p2);
        child.mutate()
        nextGen.push(child);
    }
    rockets = nextGen;
    generations++;
}

function eval() {
    let total = 0;
    let alphaindex;
    let best = 0;

    for (let i = 0; i < rockets.length; i++) {
        let curRocket = rockets[i]
        total += curRocket.fitness;
        if (curRocket.fitness > best) {
            alphaindex = i
        }
    }
    alpha = rockets[alphaindex];
    let avg = total / rockets.length;
    

    console.log(`generation ${generations} \n avg ${avg} \n alpha \n`)
    console.log(alpha)
}

function displayAlpha() {
    let hero;
    let b = 0;
    rockets.forEach(r => {
        if (r.fitness > b) hero = r;
    })
    push()

    fill(0, 0, 0, 0);
    stroke(255, 0, 0);
    strokeWeight(1);
    ellipse(hero.pos.x, hero.pos.y, 16);

    pop();
    
}