{
    const range = (start, stop, step = 1) =>
        Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
}
class Board {
    constructor() {
        this.size = 9;
        this.grid = [];

        for (let i = 0; i < this.size; i++) {
            this.grid[i] = new Array();
            for (let j = 0; j < this.size; j++) {
                this.grid[i][j] = 0;
            }
        }
    }

    generate() {
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                let options = this.checkCell(x, y);

                if (options.length == 0) {
                    this.backtrack(x, y);
                } else {
                    this.setCell(x, y, options);
                }
            }
        }
    }

    checkCell(cellX, cellY) {
        let options = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        // check row //
        for (let i = 0; i < this.size; i++) {
            if (this.grid[i][cellY] != 0) {
                let index = options.indexOf(this.grid[i][cellY]);
                options.splice(index, 1);
            }
        }

        // check column //
        for (let i = 0; i < this.size; i++) {
            if (this.grid[cellX][i] != 0) {
                let index = options.indexOf(this.grid[cellX][i]);
                options.splice(index, 1);
            }
        }

        // check 3x3 //

        return options;
    }

    setCell(x, y, numOptions) {
        this.grid[x][y] = numOptions[floor(random(0, numOptions.length - 1))];
    }

    backtrack(backtrackX, backtrackY) {
        console.log("backtracking");
        if (backtrackX - 1 == 0) {
            console.log("on edge", backtrackX);
        }
        this.grid[backtrackX - 1][backtrackY] = 0;
    }

    //-------------RENDER-------------//

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
                if (this.grid[x][y] != 0) {
                    text(this.grid[x][y], textPosX, textPosY);
                }
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
