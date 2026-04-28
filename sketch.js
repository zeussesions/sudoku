let size = 9;
let grid = [];

function setup() {
    createCanvas(500, 500);
    for (let i = 0; i < size; i++) {
        grid[i] = new Array();
        for (let j = 0; j < size; j++) {
            grid[i][j] = round(random(1, 9));
        }
    }
}

function draw() {
    background(255);
    for (let x = 0; x < size; x += 1) {
        for (let y = 0; y < size; y += 1) {
            stroke(0);
            strokeWeight(2);

            let posx = (width / size) * x;
            let posy = (height / size) * y;

            rect(posx, posy, width / size, height / size);
            textSize(40);
            // text(grid[x][y], posx + width / size, posy + height / size);
            textAlign(CENTER, CENTER);

            loadFont();
            textFont();
            textPosX = posx + width / size / 2;
            textPosY = posy + height / size / 2;

            text(grid[x][y], textPosX, textPosY);
        }
    }
}
