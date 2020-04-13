
let res, rows, cols;

let board = []

function setup () {
    createCanvas(600, 600);
    frameRate(15);

    res = 20;

    rows = width / res;
    cols = height / res;

    for (let i = 0; i < cols; i++) {
        board.push(new Array(rows))
        for (let j = 0; j < rows; j++) {
            board[i][j] = new Cell(i, j);
        }
    }

}
function draw () {
    background(51);

    for (let i = 1; i < cols-1 ; i++) {
        for (let j = 1; j < rows-1; j++) {
            let c = board[i][j];
            if (c.isAlive) {
                c.display();
            }
            c.generate();
        }
    }
    
  

}

class Cell {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        
        
        this.isAlive = false;
        this.init();
    }
    init() {
        if (random(1) < 0.20) this.isAlive = true
    }
    display() {
        push();
        translate(this.i * res, this.j * res);
        fill(255, 127);
        rect(0, 0, res, res);
        pop();
    }
    generate() {
             
        let neighbors = []
        
        let neighborsCounter = 0;
        
        
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                neighbors.push(board[this.i + i][this.j + j]);
            }
        }
        neighbors.splice(5, 1);
        
        neighbors.forEach(n => {
            if (n.isAlive) neighborsCounter++
        })

        // apply rules
        if      ((neighborsCounter < 2) && (this.isAlive))   this.isAlive = false;        // Loneliness
        else if ((neighborsCounter > 3) && (this.isAlive))   this.isAlive = false;        // Overpop
        else if ((neighborsCounter == 3) && (!this.isAlive)) this.isAlive = true;         // Reproduction
                                                                                          // Stasis
    }
    
}