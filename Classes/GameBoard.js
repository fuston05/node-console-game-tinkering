const NodeObj = require("./NodeObj");
const { getBoardLayout } = require("../utils.js");
const Game = require("./Game");

class GameBoard {
  constructor(score, players) {
    this.score = score;
    this.player_1 = () => players.one;
    this.player_2 = () => players.two;
    this.grid = [
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
    ];
    const { border, hSpacing, vSpacing, hGutter, vGutter, tWidth } =
      getBoardLayout();
    this.tWidth = tWidth;
    this.border = border;
    this.hSpacing = hSpacing;
    this.vSpacing = vSpacing;
    this.hGutter = hGutter;
    this.vGutter = vGutter;
  }

  scoreBoard() {
    let p_x = `Player X (${this.player_1()}): ${this.score.X}`;
    let p_o = `Player O (${this.player_2()}): ${this.score.O}`;

    let midMargin = this.tWidth * 0.4;
    let leftMargin = this.tWidth / 2 - (p_x.length + midMargin / 2);

    let out = "*".repeat(this.tWidth);
    out += " ".repeat(leftMargin);
    out += p_x;
    out += " ".repeat(midMargin);
    out += p_o;
    out += "\n";
    out += "*".repeat(this.tWidth);

    console.log(out);
  }

  initGrid() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid.length; j++) {
        if (i === 0 || i === 5 || j === 5 || (i > 0 && j === 0)) {
          // set up border
          this.grid[i][j] = new NodeObj(`${this.border}`);
        } else if (i === 1 && j > 0 && j < 5) {
          // horizontal nums row
          this.grid[i][j] = new NodeObj(`${j - 1}`);
        } else if (i > 1 && i < 5 && j === 1) {
          // vertical nums col
          this.grid[i][j] = new NodeObj(`${i - 1}`);
        } else {
          // play area
          this.grid[i][j] = new NodeObj("_");
        }
      }
    }
  }

  updateGrid() {
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
  }

  updateView = () => {
    console.clear();

    this.scoreBoard();

    this.updateGrid();
  };
}

module.exports = GameBoard;
