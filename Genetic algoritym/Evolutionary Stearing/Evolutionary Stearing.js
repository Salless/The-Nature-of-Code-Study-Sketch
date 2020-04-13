

let debug = false;

let st = [];
let food = []
let pred = []
let wPad, hPad, mr;
let mDragged, t1;
let grow, gCount;

function setup() {
    createCanvas(600, 600);
    wPad = width * 0.06;    // 40
    hPad = width * 0.06;    // 40
    
    mr = 0.01;
    mDragged = false;

    grow = {'chance': 0.05, 
            'rate': 1500, // Frames
            'radius': 30, 
            'competitiveSpace': 20}; // r + sqrt(2)
    gCount = 0;

    // if (debug) frameRate(10);

    // Initialize Food
    for (let i = 0; i < 20; i++) {
        food[i] = new Food(rDim('w'), rDim('h'));
    }
    // Initialize Predators
    for (let i = 0; i < 4; i++) {
        let d = map(i, 0, 3, wPad, width - wPad)
        pred[i] = new Predator(d, hPad);
    }
    // Initialize Steeres
    for (let i = 0; i < 0; i++) {    
        st[i] = new Steer(rDim('w'), rDim('h'));
    }

}

function draw() {
    background(51);
    food.forEach(f => {
        f.live();
    })
    pred.forEach(p => {
        p.live();
    })

    for (let i = st.length-1; i >= 0; i--) {
        let cur = st[i]
        cur.live();
        if (! cur.isAlive()) {
            cur.body();
            st.splice(i, 1);
        } 
    }
    generate();
    if (mDragged) {
        t1 += 1;
        if (t1 % 8 == 0) {
            st.push(new Steer(mouseX, mouseY));
        }
    }
}
function mousePressed() {
    console.log(food);
    if (mouseX > wPad && mouseX < width - wPad) {
        if (mouseY > hPad && mouseY < height - hPad) {
            mDragged = true;
            st.push(new Steer(mouseX, mouseY));
            t1 = 0;
        }
    }

}
function mouseReleased() {
    mDragged = false;
}
function generate() {
    if (0.001 > random(1)) {
        st.push(new Steer(rDim('w'), rDim('h')));
    }
}
function rDim(mode) {
    if (mode == 'w') {
        return random(wPad, width - wPad);
    } else if (mode == 'h') {
        return random(hPad, height - hPad);
    }
}
class Food {
    constructor(x, y) {
        this.pos = createVector(x, y)
    }
    live() {
        this.show();
        
        this.grow();
        
    }
    grow() {
        // Basic simulation of plant growth
        if (food.length < 100) {

            let c = grow.competitiveSpace;

            if (gCount == grow.rate) {
                gCount = 0;
                if (grow.chance < random(1)) {
                    let x = random(-grow.radius, grow.radius)
                    let y = random(-grow.radius, grow.radius)
                    if (! -c < x < c) {
                        if (! -c < y < c) {
                        food.push(new Food(this.pos.x + x, this.pos.y + y));
                    }
                    }
                }
            }
        } else if (food.length == 0) {
            food.push(new Food())
        }
        gCount += 1;
        
        if (debug) {
            push();
            translate(this.pos.x, this.pos.y);
            rectMode(CENTER);
            noFill();
            strokeWeight(0.8);
            
            stroke(255, 0, 0);
            rect(0, 0, grow.competitiveSpace, grow.competitiveSpace);
            
            stroke(0, 255, 255);
            rect(0, 0, grow.radius, grow.radius);
            
            pop();
        }
    }
    show() {
        push();
        fill(0, 255, 0);
        noStroke()
        ellipse(this.pos.x, this.pos.y, 4, 4);
        pop();
    }
}