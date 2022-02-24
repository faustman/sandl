class Solver {
  constructor(board, { dice = 6} = {}) {
    this.board = board;
    this.dice = dice;
  }

  findFastestRolls() {
    const rolls = [];

    let curCell = 0;
    let curRoll = this.dice;

    do {
      curRoll = this.dice;

      if (curCell + curRoll >= this.board.fieldLength() - 1) {
        rolls.push((this.board.fieldLength() - 1) - curCell);

        break;
      }

      const rollOptions = this.board.field.slice(curCell + 1, (curCell + 1 + curRoll));

      // find tallest ladder
      const ladders = rollOptions.filter((cell) => cell.isLadderStart());

      if (ladders.length > 0) {
        const farthestLadder = ladders.reduce((prev, current) => (prev.ladder.to > current.ladder.to) ? prev : current, ladders[0]);

        rolls.push(farthestLadder.index - curCell);

        curCell = farthestLadder.ladder.to;
      } else {
        let bestRoll;

        for (curRoll; curRoll > 1; curRoll--) {
          bestRoll = rollOptions[curRoll - 1];

          if (!bestRoll.isSnakeHead()) {
            break;
          }
        }

        if (!bestRoll) {
          continue;
        }

        rolls.push(bestRoll.index - curCell);

        curCell = bestRoll.index;
      }
    } while (curCell < this.board.fieldLength() - 1);


    return rolls;
  }
}

module.exports = Solver;
