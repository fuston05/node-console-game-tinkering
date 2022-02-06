const GameBoard = require("./GameBoard");
const rl = require("../readline");
const { log, styledMessage } = require("../utils.js");

class Game {
  constructor() {
    this.playing = false;
    this.winner = null;
    this.player = null;
    this.warning = null;
    this.players = {
      one: "",
      two: "",
    };
    this.score = {
      X: 0,
      O: 0,
    };
    this.gameBoard = new GameBoard(this.score, this.players);
    this.commands = {
      q: this.quit,
    };
  }

  setPlayers(players) {
    this.players = players;
  }

  reset() {
    this.playing = true;
    this.warning = null;
    this.player = null;
    this.winner = null;
    this.score["X"] = 0;
    this.score["O"] = 0;
    this.player_1 = "";
    this.player_2 = "";
    this.start();
  }

  start() {
    this.player = "X";
    this.winner = null;
    this.initPlayers();
    this.gameBoard.initGrid();
  }

  initPlayers() {
    this.gameBoard.update();
    rl.question("Player one, what is your name? ", (answer) => {
      let name = answer.toString().trim().toLowerCase();
      this.players["one"] = name;
      log.message(`Welcome to the Game, ${name}`, "message");

      rl.question("Player two, what is your name? ", (answer2) => {
        let name2 = answer2.toString().trim().toLowerCase();
        this.players["two"] = name2;
        log.message(`Welcome to the Game, ${name2}`, "message");
        this.gameBoard.update();
        this.playRound();
      });
    });
  }

  playRound() {
    if (this.warning) {
      this.gameBoard.update();
      styledMessage(this.warning, "error");
    }

    log.message(`\nPlayer turn: ${this.player}\n`);

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
      this.warning = `Invalid input: "${inp}"`;

      this.playRound();

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
        this.score[this.player]++;
        this.gameBoard.update();
        styledMessage(`PLAYER ${this.player} WINS!!!`, "message");

        rl.question("Play again? (y or n) ", (answer) => {
          if (answer.toLowerCase().trim() === "y") {
            rl.question("New players? ", (answer) => {
              if (answer.toLowerCase().trim() === "y") {
                console.log("\nrestarting game\n");
                this.reset();
              } else {
                console.log("\nrestarting game\n");
                this.start();
              }
            });
          } else {
            this.quit();
          }
        });
      }
    } else {
      this.warning = `${inp} is taken`;
    }
  }

  runCommand(inp) {
    this.gameBoard.update();
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
  }

  quit() {
    this.playing = false;
    styledMessage("Exiting Game", "message");
    process.exit();
  }
}

module.exports = Game;
