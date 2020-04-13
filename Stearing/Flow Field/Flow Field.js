let flowField = [];
let followers = [];
let resolution;
let clickedPos = {x: 0, y: 0};


function setup() {
    createCanvas(600, 600);
    resolution = 30;

    for (let i = 0; i < width / resolution; i++) {
        flowField[i] = new Array(10);
        for (let j = 0; j < height / resolution; j++) {
            flowField[i][j] = new Pointer(i * resolution, j * resolution);
        }
    }
}
function draw() {
    background(51);
    flowField.forEach(F => {
        F.forEach(f => {
            f.display();
        })
    })
    followers.forEach(fol => {
        fol.display()
    })
    
}

class Pointer {
    constructor(i, j) {
        this.pos = createVector(i, j);
        this.vel = createVector(0, 0);
    }
    display() {
        push();
        translate(this.pos.x, this.pos.y);
        stroke(0);
        fill(0, 58);
        rect(0, 0, resolution, resolution);
        pop();
    }
}

class Follower {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.r = 8;
    }
    display() {
        push();
        translate(this.pos.x, this.pos.y);
        stroke(0);
        fill(0, 108, 0);
        triangle(-this.r*2, 0, 0, this.r, 0, -this.r)
        pop();
    }
}
function mouseDragged() {
    let d = dist(clickedPos.x, clickedPos.y, mouseX, mouseY);
    if (followers.length < 300 && d > 60) { followers.push(new Follower(mouseX, mouseY)); saveClick(); }
}
function mousePressed() {
    saveClick();

    if (followers.length < 300) {
        followers.push(new Follower(mouseX, mouseY));
    }
}
function saveClick() {
    clickedPos.x = mouseX;
    clickedPos.y = mouseY;
}