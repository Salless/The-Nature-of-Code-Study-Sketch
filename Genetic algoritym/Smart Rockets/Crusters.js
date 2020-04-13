class Cruster {
    constructor() {
        
        this.range = 1;
        let y = random(-this.range, this.range);
        let x = random(-this.range, this.range);
        // let y = floor(random(-this.range, this.range));
        // let x = floor(random(-this.range, this.range));
        this.force = createVector(x, y);
        this.force.setMag(0.1)

        
    }
}