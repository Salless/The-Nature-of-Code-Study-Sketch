
let mutationRate, target, pop;

let bestPhrase, allPhrases, st, perfect;

function setup() {
    noCanvas();
    // frameRate(4)
    
    bestPhrase = createP('Best phrase:');
    bestPhrase.class("best");
    
    allPhrases = createP("all phrases");
    allPhrases.position(600, 10);
    allPhrases.class("all");
    
    st = createP("Stats");
    st.class("stats");
    
    target = 'to be or no to be';
    perfect = 1

    mutationRate = 0.01;
    pop = new Population(200, target, mutationRate);
}

function draw() {

    pop.run();

    if (pop.done) {
        noLoop();
    }

    displayInfo();
}

class Population {
    constructor(len, target, mut) {
        this.target = target;

        this.mutationRate = mut;

        this.dna = [];
        this.len = len;
        
        this.mantingPool

        this.best = '';
        this.done = false;

        this.fitness = []

        this.gen = 0;
        for (let i = 0; i < len; i++) {
            this.dna[i] = new Dna(target.length);
        }
    }
    run() {
        this.calcFitness();
        this.generate();

        this.evaluate();
    }
    calcFitness() {
        for (let i = 0; i < this.len; i++) this.dna[i].calcFitness(this.target)
    }
    accReject() {
        let maxFit = 0;
        
        this.dna.forEach(d => {
            if (d.fitness > maxFit) maxFit = d.fitness;
        })


        let safety = 0;
        while(true) {
            let p = this.dna[floor(random(this.len))];
            if (p.fitness > random(maxFit)) {
                return p
            }
            safety++;
            if (safety > 100000) {
                return null;
            }
        }
    }
    generate() {

        let newPop = [];
        for (let i = 0; i < this.len; i++) {
            let p1 = this.accReject()
            let p2 = this.accReject()
            let child = p1.crossover(p2);
            child.mutate(this.mutationRate);

            newPop[i] = child;
        }
        this.dna = newPop
        this.gen++;
    }
    evaluate() {
        let max = 0.0;
        let index = 0;
        for (let i = 0; i <this.len; i++) {
            if (this.dna[i].fitness > max) {
                index = i;
                max = this.dna[i].fitness;
            }
        }

        this.best = this.dna[index].getPhrase();
        if (max >= 1) {
            this.done = true;
        } 
        if (this.best == target) {
            this.done = true;
        }
    }
    getBest() {
        return this.best
    }
    getPop() {
        return this.dna.length;
    }
    getAvFitness() {
        let total = 0
        this.dna.forEach(d => {
            total += d.fitness;
        })
        return total / this.len;
    }
    getGenerations() {
        return this.gen
    }
    allPhrases() {
        let phrases = '';
    
        let limit = min(this.dna.length, 50)
        for ( let i = 0; i < limit; i ++) {
            phrases += this.dna[i].getPhrase() + '<br>';
        }
        return phrases
    }
}


function displayInfo() {
    let answer = pop.getBest()
    bestPhrase.html("Best Phrase: <br>" + answer);
    
    let stats = "total generations:   " + pop.getGenerations() + '<br>';
    stats += "avarege fitness:   " + pop.getAvFitness() + "<br>";
    stats += "Total population:   " + pop.getPop() + '<br>';
    stats += "multation rate:   " + floor(mutationRate * 100) + '%';

    st.html(stats);

    allPhrases.html("all phrases: <br>" + pop.allPhrases())
}