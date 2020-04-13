
let tree;
let max_dist = 100;
let min_dist = 10;

function setup() {
    createCanvas(600, 600)
    tree = new Tree();
}
function draw() {
    background(51);
    tree.show();
    tree.grow();
}

function Tree() {
    this.leaves = [];
    this.branches = [];

    for (let i = 0; i < 100; i++) {
        this.leaves.push(new Leaf);
    }

    this.show = function() {
        for (let i = 0; i < this.leaves.length; i++) {
            this.leaves[i].show()
        }
        for (let i = 0; i < this.branches.length; i++) {
            this.branches[i].show();
        }
    }
    let root = new Branch(createVector(width/2, height), createVector(0, -1));
    this.branches.push(root);

    let cur = root;
    let found = false;

    while(!found) {
        for (let i = 0; i < this.leaves.length; i++) {
            let d = p5.Vector.dist(cur.pos, this.leaves[i].pos);
            if (d < max_dist) {
                found = true;
            }
        }
        
        if (!found) {
            let branch = cur.next();
            cur = branch;
            this.branches.push(cur);
        }
    }

    this.grow = function() {
        for (let i = 0; i < this.leaves.length; i++) {
            let leaf = this.leaves[i];
            let closestBranch = null;
            let record = Infinity;

            for (let j = 0; j < this.branches.length; j++) {
                let branch = this.branches[j];
                let d = p5.Vector.dist(leaf.pos, branch.pos);
                if (d < min_dist) {
                    leaf.reached = true;
                    closestBranch = null;
                    break;
                } else if (d > max_dist) {

                } else if (closestBranch === null || d < record) {
                    closestBranch = branch;
                    record = d;
                }
            }
            if (closestBranch != null) {
                let newDir = p5.Vector.sub(leaf.pos, closestBranch.pos)
                newDir.normalize();
                closestBranch.dir.add(newDir);
                closestBranch.count++;
            }
        }
        
        for (let i = this.leaves.length - 1; i >= 0; i--) {
            if (this.leaves[i].reached) {
                this.leaves.splice(i, 1);
            }
        }
        for (let i = this.branches.length - 1; i >= 0; i--) {
            let branch = this.branches[i]
            if (branch.count > 0) {
                branch.dir.div(branch.count);
                this.branches.push(branch.next());
            }
            branch.reset();
        }
    }
}

function Leaf() {
    this.pos = createVector(random(width), random(height - 100));

    this.reached = false;

    this.show = function() {
        noStroke();
        fill(255, 127)
        ellipse(this.pos.x, this.pos.y, 8, 8);
    }
}
function Branch(pos, dir, parent=null) {
    this.pos = pos;
    this.dir = dir;
    this.origDir = dir.copy();
    this.parent = parent;
    this.count = 0
    this.len = 5;
    this.isGrow = false;

    this.next = function() {
        let nextsDir = p5.Vector.mult(this.dir, this.len)
        let nextsPos = p5.Vector.add(this.pos, nextsDir)
        return new Branch(nextsPos, this.dir.copy(), this);
    }

    this.reset = function() {
        this.dir = this.origDir.copy();
        this.count = 0;  
    }

    this.show = function() {
        if (this.parent != null) {
            stroke(255);
            line(this.parent.pos.x, this.parent.pos.y, this.pos.x, this.pos.y);
            if (this.isGrow) {
                fill(255, 0, 0);
                ellipse(this.pos.x, this.pos.y, 4, 4)
            }
        }
    }
}