let amp = 200;
let angle = 0;

function setup() {
    createCanvas(600, 600);
}
function draw() {
    background(51);
    translate(width/2, height/2);
    
    fill(127);
    stroke(0);
    let x = amp * sin(angle);
    ellipse(x, 0, 40);
    line(0, 0, x, 0);
    angle += 0.015;

    fill(255)
    noStroke();
    rect(-amp, 40, 2 * amp, 2);
}