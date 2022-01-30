const GameBoard = require("./Classes/GameBoard");
const readline = require("readline");
const { join } = require("path");

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
  let c = inp.includes(",")
    ? inp.trim().split(",")
    : inp.includes(" ")
    ? inp.trim().split(" ")
    : inp.trim().split("");

  let newC = [];
  c.forEach((ele) => {
    if (ele !== "") newC.push(ele.trim());
  });
  return newC;
};

rl.question("Enter x, y coords (or Q to quit) ", (coords) => {
  let newC = formatCoords(coords);

  //   number of coords
  if (newC.length !== 2) {
    console.log(`Please enter 2 coords: X, Y`);
    return;
  }

  let x = newC[0].trim();
  let y = newC[1].trim();

  //   number of digits / coord
  if (y.length > 1 || x.length > 1) {
    console.log(
      `One of your coords contains more than one digit: X:${x}, Y: ${y}`
    );
    return;
  }

  if (!x.match(/\d/g)) {
    console.log(`must be a number only`);
    return;
  }

  console.log("c: ", newC);
  console.log(`You entered coords: ${x}, ${y}`);
});
