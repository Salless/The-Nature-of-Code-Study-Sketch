
class Dna {
    constructor(n) {
        this.fitness = 0
        this.genes = []
        this.len = n;
        for (let i = 0; i < n; i++) this.genes.push(getNewChar());
    }
    getPhrase() {
        return this.genes.join("");
    }
    calcFitness(t) {
        let count = 0
        for (let i = 0; i < this.len; i++) {
            if (this.genes[i] == t.charAt(i)) {
                count++;
            }
        }
        this.fitness = count / t.length;
        this.fitness = pow(this.fitness, 2) + 0.01
    }
    crossover(p) {
        let child = new Dna(this.len);
        let midPoint = floor(random(this.len));
        for (let i = 0; i < this.len; i++) {
            if (i < midPoint) child.genes[i] = this.genes[i]
            else              child.genes[i] = p.genes[i]
        }
        return child
    }
    mutate(mR) {
        for (let i = 0; i < this.len; i++) {
            if (random(1) < mR) {
                this.genes[i] = getNewChar();
            }
        }
    }
} 
function getNewChar() {
    let c = floor(random(63, 122))
    if (c === 63) c = 32;
    if (c === 64) c = 46;
    return String.fromCharCode(c);
}
