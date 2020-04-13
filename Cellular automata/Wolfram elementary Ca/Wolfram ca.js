

let resolution = 4;
let rows, cols, ca, rowsCount;



function setup() {
    createCanvas(600, 600);

    rows = height  / resolution;
    cols = width / resolution;
    
    rowsCount = 0;
    
    ca = new Ca([0, 1, 0, 1, 1, 0, 1, 0]);
    
    background(51);

}

function draw() {
    ca.display();
    
}

class Ca {
    constructor(rules) {
        this.cells = [];
        for (let r = 0; r < cols; r++) {
            this.cells[r] = 0;
        }
        this.cells[floor(cols / 2)] = 1;

        this.generation = 0;
        this.ruleset = rules;
    }
    generate() {
        let len = this.cells.length;
        let nextgen = new Array(len);

        for (let i = 1; i < len-1; i++) {
            nextgen[i] = this.applyRules(this.cells[i-1], this.cells[i], this.cells[i+1]);
        }
        nextgen[0] = this.ruleset[0];
        nextgen[len-1] = this.ruleset[7];

        this.cells = nextgen;
        this.generation++;
    }
    applyRules(l, c, r) {
        if (l == 1 && c == 1 && r == 1) return this.ruleset[0]
        if (l == 1 && c == 0 && r == 0) return this.ruleset[1]
        if (l == 1 && c == 0 && r == 1) return this.ruleset[2]
        if (l == 1 && c == 0 && r == 0) return this.ruleset[3]
        if (l == 0 && c == 1 && r == 1) return this.ruleset[4]
        if (l == 0 && c == 1 && r == 0) return this.ruleset[5]
        if (l == 0 && c == 0 && r == 1) return this.ruleset[6]
        if (l == 0 && c == 0 && r == 0) return this.ruleset[7]
        return 0
    }
    display() {
        if (rowsCount < cols) {
            
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    push();
                        if (ca.cells[j]) { fill(0, 127); } else { fill(255, 127); }
                        noStroke();
                        rect(resolution * j, resolution * i, resolution, resolution);
                    pop();
                }
                ca.generate();
                rowsCount++;
            }
        }
    }
}