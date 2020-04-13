
let font;
function preload() {
    font = loadFont('Raleway-Italic.ttf', message => console.log(message), err => console.log(err))
}
function setup() {
    createCanvas(600, 600);
}
function draw() {
    background(51);
}