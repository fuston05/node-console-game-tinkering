const GameBoard = require("./Classes/GameBoard");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const config = {
  hSpace: 6,
  vSpace: 3,
  vGut: 2,
  borderSym: "#",
};

const gameBoard = new GameBoard(config);
gameBoard.buildGrid();

let player = "X";
console.log(`Player turn: ${player}`);

const formatCoords = (inp) => {
  // remove ',' and ' '
  let tempInp = inp.replace(/[, ]*/g, "").split("");

  return tempInp.map((ele) => {
    return parseInt(ele);
  });
};

const formatCommand = (inp) => {
  return inp.toLowerCase().trim();
};

const parseInput = (inp) => {
  let nReg = /^[1-3]{1}(?:[, ])*[1-3]{1}$/g;
  let lReg = /^[a-z]{1}$/gi;

  if (inp.match(nReg)) {
    // is exactly 2 nums 1, 2, or 3?
    return formatCoords(inp);
  } else if (inp.match(lReg)) {
    // is a single letter command
    return formatCommand(inp);
  } else {
    // input not understood
    console.log(
      "\nCommands: single letter only; i.e. 'Q' \nCoordinates: 2 digits, numbers 1-3 only; i.e. '3, 1'\n"
    );

    return false;
  }
};

const isWinner = (player) => {
  // winner: [1][1], [1][2], [1][3] // any rows
  // or [1][1], [2][1], [1][3] // any column
  //  or [1][1], [2][2], [3][3] //diag
  // or reverse [1][3], [2][2], [3][1] //diag
  const grid = gameBoard.grid;
  if (
    // any row
    (grid[2][2] === player && grid[2][3] === player && grid[2][4] === player) ||
    (grid[3][2] === player && grid[3][3] === player && grid[3][4] === player) ||
    (grid[4][2] === player && grid[4][3] === player && grid[4][4] === player) ||
    // any cols
    (grid[2][2] === player && grid[2][3] === player && grid[2][4] === player) ||
    (grid[3][2] === player && grid[3][3] === player && grid[3][4] === player) ||
    (grid[4][2] === player && grid[4][3] === player && grid[4][4] === player) ||
    // any diag
    (grid[2][2] === player && grid[3][3] === player && grid[4][4] === player) ||
    (grid[2][4] === player && grid[3][3] === player && grid[4][2] === player)
  ) {
    return player;
  } else return null;
};

const setCoord = (inp) => {
  let char = player;
  console.log("setCoord: ", inp);
  console.log("char: ", char);
  gameBoard.grid[inp[0] + 1][inp[1] + 1].char = char;
  gameBoard.update();

  if (isWinner(player)) {
    console.log(`Player ${player} wins!`);
  } else {
    // toggle player
    player = player = "X" ? "O" : "X";
  }
};

const runCommand = (inp) => {
  console.log("runCommand: ", inp);
};

rl.question("Enter x, y coords (or Q to quit) ", (userInput) => {
  let input = parseInput(userInput);
  console.log("type: ", typeof input);
  console.log("input: ", input);

  if (!input) return;

  console.log("success!");

  if (typeof input === "object") {
    // set coords
    setCoord(input);
  } else {
    // run command
    runCommand(input);
  }
});
