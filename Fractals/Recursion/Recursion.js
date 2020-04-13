
let breaches = [];
let inited = false;
function setup() {
    createCanvas(600, 600);
}
function draw() {
    background(0);
    if (inited) {
        init()
    }
    
}

function init() {
    translate(width/2, height);
    let len = map(mouseY, height, 0, 100, 300);
    breach(len);
}

function breach(len) {
    len *= 0.66;
    
    stroke(255)
    line(0, 0, 0, -len)
    translate(0, -len);
    
    
    if (len > 5) {
        let weight = map(len, 5, 300, 0.5, 2.5);
        push();
        
        stroke(255);
        strokeWeight(weight);
        rotate(PI / 4);
        breach(len);
        
        ellipse(0, -len, 2);
        
        pop();

        push();
        
        stroke(255);
        strokeWeight(1.5);
        
        rotate(-PI / 4);
        breach(len);
        
        ellipse(0, 0, 2);
        
        pop();
    }
}

function mousePressed() {
    if (0 < mouseX && mouseX < width && 0 < mouseY && mouseY < height) {
        inited = true;
    }
}