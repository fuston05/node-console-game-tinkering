const GameBoard = require("./GameBoard");
const rl = require("../readline");

class Game {
  constructor(config) {
    this.gameBoard = new GameBoard(config);
    this.playing = false;
    this.winner = null;
    this.player = null;
    this.warning = null;
    this.commands = {
      q: this.quit,
    };
  }

  start() {
    this.gameBoard.buildGrid();
    this.playing = true;
    this.warning = null;
    this.player = "X";
    this.winner = null;
  }

  playRound() {
    console.log(`\nPlayer turn: ${this.player}\n`);

    this.warning ? console.log("\nWarning: ", this.warning, "\n") : null;

    rl.question("Enter x, y coords (or Q to quit) ", (userInput) => {
      let input = this.parseInput(userInput);

      if (!input) return;

      if (typeof input === "object") {
        // set coords
        this.setCoord(input);
        if (this.winner) return;

        if (!this.warning && this.player === "X") {
          this.player = "O";
        } else if (!this.warning && this.player === "O") {
          this.player = "X";
        }
        this.playRound();
      } else {
        // run command
        this.runCommand(input);
      }
    });
  }

  parseInput(inp) {
    let nReg = /^[1-3]{1}(?:[, ])*[1-3]{1}$/g;
    let lReg = /^[a-z]{1}$/gi;

    if (inp.match(nReg)) {
      // is exactly 2 nums 1, 2, or 3?
      return this.formatCoords(inp);
    } else if (inp.match(lReg)) {
      // is a single letter command
      return this.formatCommand(inp);
    } else {
      // input not understood
      console.log(
        "\nCommands: single letter only; i.e. 'Q' \nCoordinates: 2 digits, numbers 1-3 only; i.e. '3, 1'\n"
      );

      return false;
    }
  }

  formatCoords(inp) {
    // remove ',' and ' '
    let tempInp = inp.replace(/[, ]*/g, "").split("");

    return tempInp.map((ele) => {
      return parseInt(ele);
    });
  }

  formatCommand(inp) {
    return inp.toLowerCase().trim();
  }

  setCoord(inp) {
    this.warning = null;
    let char = this.player;
    if (this.gameBoard.grid[inp[0] + 1][inp[1] + 1].char === "_") {
      this.gameBoard.grid[inp[0] + 1][inp[1] + 1].char = char;
      this.gameBoard.update();

      if (this.isWinner(this.player)) {
        console.log(`\n**** Player ${this.player} wins! ****\n`);

        rl.question("Play again? (y or n) ", (answer) => {
          if (answer.toLowerCase().trim() === "y") {
            console.log("\nrestarting game\n");
            this.start();
          } else {
            this.quit();
          }
        });
      }
    } else {
      this.warning = `Cannot play at ${inp}`;
    }
  }

  runCommand(inp) {
    this.commands[inp]();
  }

  isWinner(player) {
    // winner: [1][1], [1][2], [1][3] // any rows
    // or [1][1], [2][1], [1][3] // any column
    //  or [1][1], [2][2], [3][3] //diag
    // or reverse [1][3], [2][2], [3][1] //diag
    const grid = this.gameBoard.grid;
    if (
      // any row
      (grid[2][2].char === player &&
        grid[2][3].char === player &&
        grid[2][4].char === player) ||
      (grid[3][2].char === player &&
        grid[3][3].char === player &&
        grid[3][4].char === player) ||
      (grid[4][2].char === player &&
        grid[4][3].char === player &&
        grid[4][4].char === player) ||
      // any cols
      (grid[2][2].char === player &&
        grid[3][2].char === player &&
        grid[4][2].char === player) ||
      (grid[2][3].char === player &&
        grid[3][3].char === player &&
        grid[4][3].char === player) ||
      (grid[2][4].char === player &&
        grid[3][4].char === player &&
        grid[4][4].char === player) ||
      // any diag
      (grid[2][2].char === player &&
        grid[3][3].char === player &&
        grid[4][4].char === player) ||
      (grid[2][4].char === player &&
        grid[3][3].char === player &&
        grid[4][2].char === player)
    ) {
      this.winner = player;
      return player;
    } else return null;
    e;
  }

  quit() {
    console.log("\n**********************");
    console.log("*    Exiting Game    *");
    console.log("**********************\n");
    process.exit();
  }
}

module.exports = Game;
