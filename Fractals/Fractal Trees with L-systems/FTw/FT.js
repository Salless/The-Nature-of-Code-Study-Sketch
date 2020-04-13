
let gen, angle;
let axion, len;
let patten;
let rules = [];

function setup() {
    createCanvas(600, 600);

    axion = 'f';
    patten = axion;
    rules[0] = {a: 'f', b: 'ff+[+f-f-f]-[-f+f+f]'};
    
    gen = 0;
    angle = radians(25);
    len = 30;
    
    turtle();
    let button = createButton('generate');
    button.mousePressed(generate);
    background(51)
}

function draw() {
}

function turtle() {
    stroke(255, 127);
    translate(width/2, height)
    for (let i = 0; i < patten.length; i++) {
        let cur = patten.charAt(i);
        if (cur == 'f') {line(0, 0, 0, -len); translate(0, -len)}
        else if(cur == '+') rotate(angle);
        else if (cur == '-') rotate(-angle);
        else if (cur == '[') push();
        else if (cur == ']') pop();
    }
    gen++;
}

function generate() {
    let nextSentence = "";
    for (let i = 0; i < patten.length; i++) {
        let current = patten.charAt(i);
        let found = false;
        for (let j = 0; j < rules.length; j++) {
            if (current == rules[j].a) {
                found = true;
                nextSentence += rules[j].b
                break;
            }
        }
        if (!found) nextSentence += current;
    }
    patten = nextSentence;
    if (gen < 6) turtle();
    len *= 0.67
}