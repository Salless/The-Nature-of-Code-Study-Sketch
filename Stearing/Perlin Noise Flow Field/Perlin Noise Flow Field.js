
let inc = 0.1;
let scl = 20;
let cols, rows;

let particles = []

let zoff = 0;

let flowField;

function setup() {
    createCanvas(600, 600);
    cols = floor(width/scl);
    rows = floor(height/scl);
    for (let i = 0; i < 20; i++) {
        particles.push(new Particle(random(width), random(height)))
    }
    flowField = new Array(cols * rows);
}
function draw() {
    background(51);
    let r;
    let yoff = 0;
    for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
            r = noise(xoff, yoff, zoff) * TWO_PI;

            let index = x + y * cols;
            let v = p5.Vector.fromAngle(r)
            flowField[index] = v;
            
            xoff += inc;

            push();

            translate(x * scl, y * scl);
            stroke(0, 200, 0);
            rotate(v.heading());
            line(0, 0, scl, 0);

            pop();
        }
        yoff += inc
    }

    particles.forEach(p => {
        p.follow(flowField, r);
        p.display();
        p.update();
    })


    zoff += 0.01;
}
function mousePressed() {
    particles.push(new Particle(mouseX, mouseY));
}