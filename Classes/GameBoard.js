const NodeObj = require("./NodeObj");

class GameBoard {
  constructor({ hSpace = 2, vSpace = 1, vGut = 1, borderSym = "" }) {
    this.playing = true;
    this.grid = [
      ["*", "*", "*", "*", "*", "*"],
      ["*", "0", "1", "2", "3", "*"],
      ["*", "1", " ", " ", " ", "*"],
      ["*", "2", " ", " ", " ", "*"],
      ["*", "3", " ", " ", " ", "*"],
      ["*", "*", "*", "*", "*", "*"],
    ];
    this.border = borderSym;
    this.hSpacing = hSpace;
    this.vSpacing = vSpace;
    this.gridWidth = this.grid.length + this.hSpacing * (this.grid.length - 1);
    this.hGutter = this.tWidth / 2 - this.gridWidth / 2;
    this.vGutter = vGut;
  }

  tWidth = process.stdout.columns;
  tHeight = process.stdout.rows;

  buildGrid = () => {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid.length; j++) {
        if (this.grid[i][j] === "*") {
          this.grid[i][j] = new NodeObj(`${this.border}`);
        } else if (i === 1 && j > 0 && j < 5) {
          this.grid[i][j] = new NodeObj(`${j - 1}`);
        } else if (i > 1 && i < 5 && j === 1) {
          this.grid[i][j] = new NodeObj(`${i - 1}`);
        } else {
          this.grid[i][j] = new NodeObj("_");
        }
        this.update();
      }
    }
  };

  update = () => {
    if(!this.playing){
        return false;
    }
    console.clear();

    let out = "\n".repeat(this.vGutter);

    for (let i = 0; i < this.grid.length; i++) {
      out += " ".repeat(this.hGutter);

      for (let j = 0; j < this.grid.length; j++) {
        this.grid[i][j].hasOwnProperty("char")
          ? (out += this.grid[i][j].char)
          : (out += " ");
        j < this.grid.length - 1 ? (out += " ".repeat(this.hSpacing)) : null;
      }

      i < this.grid.length - 1 ? (out += "\n".repeat(this.vSpacing)) : null;
    }
    out += "\n".repeat(this.vGutter);
    console.log(out);
  };
}

module.exports = GameBoard;
