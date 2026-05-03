function range(start, stop, step) {
    return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
}
class Board {
    constructor() {
        this.size = 9;
        this.grid = [];
        this.unsolved = [];
        // generate grid //
        for (let i = 0; i < this.size; i++) {
            this.grid[i] = new Array();
            for (let j = 0; j < this.size; j++) {
                this.grid[i][j] = 0;
            }
        }

        for (let i = 0; i < this.size; i++) {
            this.unsolved[i] = new Array();
            for (let j = 0; j < this.size; j++) {
                this.unsolved[i][j] = 0;
            }
        }
    }

    init() {
        for (let x = 0; x < this.size; x += 1) {
            for (let y = 0; y < this.size; y += 1) {
                this.grid[x][y] = 0;
                this.unsolved[x][y] = 0;
            }
        }
    }

    generate(difficulty) {
        let sudoku = this.solve(0, 0);
        this.punchHoles(difficulty);
        return sudoku;
    }

    solve(x, y) {
        if (x === this.size) {
            x = 0;
            y++;
        } // wrap row
        if (y === this.size) return true;

        const options = this.checkCell(x, y);
        this.shuffle(options);

        for (const num of options) {
            this.grid[x][y] = num;

            if (this.solve(x + 1, y)) {
                return true;
            }

            this.grid[x][y] = 0;
        }

        return false;
    }

    shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    checkCell(cellX, cellY) {
        let options = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        // check row //
        for (let i = 0; i < this.size; i++) {
            if (this.grid[cellX][i] != 0) {
                // ← cellX, vary i (column)
                let index = options.indexOf(this.grid[cellX][i]);
                if (index !== -1) options.splice(index, 1);
            }
        }
        // check column //
        for (let i = 0; i < this.size; i++) {
            if (this.grid[i][cellY] != 0) {
                // ← vary i (row), cellY
                let index = options.indexOf(this.grid[i][cellY]);
                if (index !== -1) options.splice(index, 1);
            }
        }

        // check 3x3 //
        let boxX = Math.floor(cellX / 3) * 3;
        let boxY = Math.floor(cellY / 3) * 3;

        for (let i = boxX; i < boxX + 3; i++) {
            for (let j = boxY; j < boxY + 3; j++) {
                let index = options.indexOf(this.grid[i][j]);
                if (index !== -1) options.splice(index, 1);
            }
        }
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

    // (y * width)+ x
    punchHoles(difficulty) {
        let clues;
        if (difficulty == 1) {
            clues = Math.floor(random(35, 45));
        } else if (difficulty == 2) {
            clues = Math.floor(random(27, 35));
        } else if (difficulty == 3) {
            clues = Math.floor(random(20, 27));
        } else if (difficulty == 4) {
            clues = 17;
        }

        let randCords = subset(shuffle(range(0, 80, 1)), 0, clues);
        // console.log(clues);

        for (let i = 0; i < randCords.length; i++) {
            let x = randCords[i] % this.size;
            let y = Math.floor(randCords[i] / this.size);
            // console.log(x, y);
            this.unsolved[x][y] = this.grid[x][y];
        }
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
                if (this.unsolved[x][y] != 0) {
                    text(this.unsolved[x][y], textPosX, textPosY);
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

    outputText() {
        let text = "";
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                if (this.unsolved[x][y] == 0) {
                    text += "0";
                } else {
                    text += String(this.unsolved[x][y]);
                }
            }
        }
        return text;
    }
}
