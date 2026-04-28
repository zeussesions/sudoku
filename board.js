class Board {
    constructor() {
        this.size = 9;
        this.numbers = [];

        for (let i = 0; i < this.size; i++) {
            this.numbers[i] = new Array();
            for (let j = 0; j < this.size; j++) {
                this.numbers[i][j] = 0;
            }
        }
    }

    render() {
        textAlign(CENTER, CENTER);
        strokeWeight(1);
        textSize(40);
        textFont(font);

        for (let x = 0; x < this.size; x += 1) {
            for (let y = 0; y < this.size; y += 1) {
                let posx = (width / this.size) * x;
                let posy = (height / this.size) * y;

                strokeWeight(1);
                rect(posx, posy, width / this.size, height / this.size);

                let textPosX = posx + width / this.size / 2;
                let textPosY = posy + height / this.size / 2.3;
                text(this.numbers[x][y], textPosX, textPosY);
            }
        }

        // ---  draw lines --- //
        strokeWeight(6);
        line(width / 3, 0, width / 3, height);
        line((width / 3) * 2, 0, (width / 3) * 2, height);
        line(0, height / 3, width, height / 3);
        line(0, (height / 3) * 2, width, (height / 3) * 2);
    }
}
