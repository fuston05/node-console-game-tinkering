const log = require('./log')
const getBoardLayout = require("./getBoardLayout");

const styledMessage = (msg, type) => {
  console.log("\n");
  if(type === 'error'){
    log.error("*".repeat(getBoardLayout().tWidth));
    log.error(
      "*" +
        " ".repeat((getBoardLayout().tWidth - 10) / 2) +
        "Warning:" +
        " ".repeat((getBoardLayout().tWidth - 10) / 2) +
        "*"
    );
    log.error("*".repeat(getBoardLayout().tWidth));
    log.error(
      " ".repeat((getBoardLayout().tWidth - msg.length) / 2) + msg
    );
    log.message("\nTry Again:\n")

  }else if(type === 'message'){
    log.message("*".repeat(getBoardLayout().tWidth));
    log.message(
      "*" +
        " ".repeat((getBoardLayout().tWidth - (msg.length + 2)) / 2) +
        msg +
        " ".repeat((getBoardLayout().tWidth - (msg.length + 2)) / 2) +
        "*"
    );
    log.message("*".repeat(getBoardLayout().tWidth));
    console.log('\n')
  }

};

module.exports = styledMessage;
