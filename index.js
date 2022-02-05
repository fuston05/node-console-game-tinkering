const Game = require("./Classes/Game");

const config = {
  hSpace: 6,
  vSpace: 3,
  vGut: 2,
  border: "*",
};

const game = new Game(config);


game.start();
game.playRound();
