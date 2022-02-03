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

const formatInput = (inp) => {
  if (inp.length > 1) {
    // coords entered
    let c = inp.includes(",")
      ? inp.trim().split(",")
      : inp.includes(" ")
      ? inp.trim().split(" ")
      : inp.trim().split("");

    let newC = [];
    c.forEach((ele) => {
      if (ele !== "") newC.push(ele.trim());
    });
    console.log("\ninput: ", newC, "\n");
    return newC;
  } else {
    // quit command
    let res = inp.trim().toLowerCase();
    console.log("\ninput: ", res, "\n");
    return res;
  }
};

const inputController = (x = null, y = null, q = null) => {
  // possibilities:
  // Q to quit
  // x: 1, 2, 3
  // y: 1, 2, 3
  // const userInput = inp;
  // const switchObj= {
  //   ['1', '1'] : "",
  //   ['1', '2'] : "",
  //   ['1', '3'] : "",
  //   ['2', '1'] : "",
  //   ['2', '2'] : "",
  //   ['2', '3'] : "",
  //   ['3', '1'] : "",
  //   ['3', '2'] : "",
  //   ['3', '3'] : "",
  // }
};

rl.question("Enter x, y coords (or Q to quit) ", (userInput) => {
  let input = formatInput(userInput);
  console.log("type: ", typeof input);

  let type = typeof input;

  if (type === "string") {
    console.log("string: ", input);
    return;
  }

  //   number of chars/digits
  if (type === "object" && input.length !== 2) {
    console.log(`Please enter 2 coords: X, Y`);
    return;
  }

  //  length of each digit
  if ((type === "object" && input[0].length > 1) || input[1].length > 1) {
    console.log(
      `One of your coords contains more than one digit: X: ${input[0]}, Y: ${input[1]}`
    );
    return;
  }

  // number only
  if (type === "object" && !input[0].match(/\d/g)) {
    console.log(`Numbers only`);
    return;
  }

  if ((type === "object" && input[0] > 3) || input[1] > 3) {
    console.log(`num < 4 only`);
    return;
  }
});
