let board;

function preload() {
    font = loadFont("/assets/Rubik-VariableFont_wght.ttf");
}

function setup() {
    createCanvas(500, 500);
    board = new Board();
}

function draw() {
    background(255);
    board.render();
    noLoop();
}
