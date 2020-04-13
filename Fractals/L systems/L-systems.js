let patten;

let d = 20;
let makingGen;
function setup() {
    createCanvas(600, 600);
    patten = 'aba';
    makingGen = false;
    background(51);
}

function draw() {

    if (!makingGen) {
        for (let i = 0; i < patten.length; i++) {
            let c = patten[i];
            if (c == 'a') {
                push();
                fill(255)
                ellipse(d, 8, 8, 8);
                pop();
                d += 10
            } else if (c == 'b') {
                push();
                stroke(255);
                line(d, 20, d + 4, 20);
                pop();
                d += 10
            }
        }
        makingGen = true;
    }

}
function advenceGen() {
    let next = ''
    for (let i = 0; i < patten.length; i++) {
        let c = patten[i];
        if (c == 'a') next += 'aba'
        else if (c == 'b') next += 'bbb'
    }
    d += 20;
    makingGen = false;
    
    return next
}
function mousePressed() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) patten = advenceGen()
    console.log(patten);
}