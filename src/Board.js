const Cell = require('./Cell');
const Random = require('./Random');
const BoardRenderer = require("./BoardRenderer");

class Board {
  constructor({ size = 5, ladderFactor = 0.2, snakeFactor = 0.2  } = {}) {
    this.size = size;
    this.ladders = [];
    this.ladderFactor = ladderFactor;

    this.snakes = [];
    this.snakeFactor = snakeFactor;

    this.clear();

    this.generateLadders();
    this.generateSnakes();
  }

  clear() {
    const length = Math.pow(this.size, 2);

    this.field = Array.from({ length }, (_, index) => (new Cell(index, this)));
  }

  // For testing purpose
  dump() {
    console.log(this.ladders);
    console.log(this.snakes);
  }

  restore() {
    this.clear();

    for (const ladder of this.ladders) {
      this.field[ladder.from].setLadder(ladder);
      this.field[ladder.to].setLadder(ladder);
    }

    for (const snake of this.snakes) {
      this.field[snake.from].setSnake(snake);
      this.field[snake.to].setSnake(snake);
    }
  }

  draw() {
    const renderer = new BoardRenderer(this);

    return renderer.draw();
  }

  fieldLength() {
    return this.field.length;
  }

  getNextRowCell(index) {
    const mod = index % this.size;

    const nextRowCell = index + this.size - mod;

    return nextRowCell > this.field.length - 1 ? null : nextRowCell;
  }

  getPrevRowCell(index) {
    const mod = index % this.size;

    const prevRowCell = index - mod - 1;

    return prevRowCell < 0 ? null : prevRowCell;
  }

  findEmptyCellsBetween(from, to) {
    return this.field.slice(from, to).filter((cell) => cell.isEmpty());
  }

  /**
   * Ladders going only up,
   * the last row has no direction.
   * Ladders CAN NOT stack (start or end with each other).
   * Ladder CAN NOT start with first cell.
   * Ladder CAN NOT end with last cell.
   */
  generateLadders() {
    for (let cell of this.field) {
      if (cell.isLastRow()) {
        break;
      }

      if (!cell.isEmpty()) {
        continue;
      }

      if (Random.pick(this.ladderFactor)) {
        const nextRowCell = this.getNextRowCell(cell.index);

        const candidates = this.findEmptyCellsBetween(nextRowCell, this.field.length);

        if (candidates.length === 0) {
          break;
        }

        const endCell = candidates[Random.between(0, candidates.length - 1)];

        const ladder = {
          from: cell.index,
          to: endCell.index
        };

        cell.setLadder(ladder);
        endCell.setLadder(ladder);

        this.ladders.push(ladder);
      }
    }

    // Make sure we generate at least one ladder
    if (this.ladders.length === 0) {
      this.ladderFactor = this.ladderFactor + 0.1;

      this.generateLadders();
    }
  }

  /**
   * Snakes going only down,
   * the first row has no direction.
   * Snakes CAN NOT stack (start or end with each other).
   * Snake CAN NOT start with last cell.
   * Snake CAN NOT end with first cell.
   */
  generateSnakes() {
    for (let cell of [...this.field].reverse()) {
      if (cell.isFirstRow()) {
        break;
      }

      if (!cell.isEmpty()) {
        continue;
      }

      if (Random.pick(this.snakeFactor)) {
        const prevRowCell = this.getPrevRowCell(cell.index);

        const candidates = this.findEmptyCellsBetween(0, prevRowCell);

        if (candidates.length === 0) {
          break;
        }

        const endCell = candidates[Random.between(0, candidates.length - 1)];

        const snake = {
          from: cell.index,
          to: endCell.index
        };

        cell.setSnake(snake);
        endCell.setSnake(snake);

        this.snakes.push(snake);
      }
    }

    // Make sure we generate at least one snake if available
    if (this.snakes.length === 0) {
      const candidates = this.findEmptyCellsBetween(0, this.field.length);

      if (candidates > 0) {
        this.snakeFactor = this.snakeFactor + 0.1;

        this.generateSnakes();
      } else {
        // Stole space from ladders
        this.borrowLadder();
      }
    }
  }

  borrowLadder() {
    const index = Random.between(0, this.ladders.length - 1);
    const ladder = this.ladders[index];

    const snake = {
      from: ladder.to,
      to: ladder.from,
    };

    this.field[snake.from].setLadder(null);
    this.field[snake.from].setSnake(snake);

    this.field[snake.to].setLadder(null);
    this.field[snake.to].setSnake(snake);

    this.ladders.splice(index, 1);
    this.snakes.push(snake);
  }
}

module.exports = Board;
