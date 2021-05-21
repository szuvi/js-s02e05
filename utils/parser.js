/* eslint-disable no-use-before-define */
function parse(input) {
  if (!isValidCommand(input)) {
    throw new Error('Incorrect input');
  }

  const instructionArr = input.split(' ');
  return {
    type: instructionArr[0],
    start: instructionArr[1],
    end: instructionArr[2],
  };
}

function isValidCommand(command) {
  if (typeof command !== 'string') {
    return false;
  }
  const split = command.split(' ');
  return split.length === 3 && /^[BT]$/.test(split[0]);
}

module.exports = parse;
