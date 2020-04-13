
let slide, angle;
let tree = [];
let count = 0;

function setup() {
    createCanvas(600, 600);

    // slide = createSlider(PI/16, PI/3, PI / 4, 0.005);
    tree[0] = new Branch(createVector(width / 2, height), createVector(width / 2, height - 100));
}
function draw() {
    background(51);

    // angle = slide.value();

    tree.forEach(t => {
        t.show()
    })
}
function mousePressed() {
    let len = tree.length;
    if (count < 5) {
        for (let i = len-1; i >= 0; i++) {
            if (!tree[i].grow) {
                tree.push(tree[i].createRBranch(), tree[i].createLBranch());
            }
            tree[i].grow = true;
        }
        count++;
    }
}