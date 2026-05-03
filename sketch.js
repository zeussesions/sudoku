let board;
let code;
let title;

function preload() {
    font = loadFont("/assets/Rubik-VariableFont_wght.ttf");
}

function setup() {
    createCanvas(500, 500);
    board = new Board();
    title = createP("Code:");
    code = createP("");
}

function draw() {
    background(255);
    board.init();
    board.generate(1);
    console.log(board.outputText());
    board.render();
    frameRate(2);
    noLoop();
    code.html(board.outputText());
}
