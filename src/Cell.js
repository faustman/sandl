class Cell {
  constructor(index, board) {
    this.index = index;

    this.board = board;
  }

  isLastRow() {
    return this.board.fieldLength() - this.index <= this.board.size;
  }

  isFirstRow() {
    return this.index < this.board.size;
  }

  setLadder(ladder) {
    this.ladder = ladder;
  }

  isLadder() {
    return !!this.ladder;
  }

  isLadderStart() {
    return this.isLadder() && this.ladder.from === this.index;
  }

  setSnake(snake) {
    this.snake = snake;
  }

  isSnake() {
    return !!this.snake;
  }

  isSnakeHead() {
    return this.isSnake() && this.snake.from === this.index;
  }

  isEmpty() {
    return !this.isFirst() && !this.isLast() && !this.isLadder() && !this.isSnake();
  }

  isFirst() {
    return this.index === 0;
  }

  isLast() {
    return this.index >= this.board.fieldLength() - 1;
  }
}

module.exports = Cell;
