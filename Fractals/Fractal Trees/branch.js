class Branch {
    constructor(b, e) {
        this.begin = b;
        this.end = e;

        this.grow = false;
    }
    show() {
        push();
        stroke(255, 127);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
        pop();
    }
    createRBranch() {
        let angle = PI/4;
        let rdir = p5.Vector.sub(this.end, this.begin);
        rdir.rotate(angle);
        rdir.mult(0.67);
        let rightEnd = p5.Vector.add(this.end, rdir);
        
        return new Branch(this.end, rightEnd)
    }
    createLBranch() {
        let angle = PI/4;
        let ldir = p5.Vector.sub(this.end, this.begin);
        ldir.rotate(-angle);
        ldir.mult(0.67);
        let leftEnd = p5.Vector.add(this.end, ldir);

        return new Branch(this.end, leftEnd);
        
    }
}