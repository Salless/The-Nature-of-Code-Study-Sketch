
let per;
let points = [];
function setup() {
    createCanvas(600, 600);
    for(let i = 0; i < 20; i++) {
        points.push(new Point());
    }
    per = new Perceptron(points)
}
function draw() {
    background(51);
    stroke(0);
    line(0, 0, width, height);
    points.forEach(p => {
        p.show();
    })
    
}
function mousePressed() {
    points.forEach(p => {
        let inputs = [p.x, p.y]
        let err = per.train(inputs, p.label);
        let col = err == 0 ? color(0, 255, 0) : color(255, 0, 0);

        fill(col);
        ellipse(p.x, p.y, 4);
    })
}

class Perceptron {
    constructor(pool) {
        this.pool = pool instanceof Array ? pool : [0, 0, 0, 0];
        this.weights = [];
        for (let i = 0; i < 2; i++) {
            this.weights[i] = random(-1, 1);
        }
        this.lr = 0.1;
    }
    guess() {
        let sum = 0;
        for (let i = 0; i < this.weights.length; i++) {
            sum += this.pool[i] * this.weights[i]
        }
        return this.activate(sum)
    }
    train(t) {
        let g = this.guess()
        let error = t - g;
        for (let i = 0; i < this.weights.length; i++) {
            this.weights[i] += error * this.pool * this.lr;
        }
        return error;
    }
    activate(n) {
        return n > 1 ? 1 : -1;
    }
}


class Point {
    constructor() {
        this.x = random(width);
        this.y = random(height);        
        this.label = this.x > this.y ? 1 : -1;
     }

    show() {
        stroke(0);
        let alpha = this.label == 1 ? 0 : 255;
        fill(0, 0, 0, alpha);
        ellipse(this.x, this.y, 12);
    }
}