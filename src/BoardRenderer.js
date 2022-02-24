const V_SPACER = '│';
const H_SPACER = '─';

const TOP_LEFT_SPACER = '┌';
const TOP_MID_SPACER = '┬';
const TOP_RIGHT_SPACER = '┐';

const CENTER_LEFT_SPACER = '├';
const CENTER_RIGHT_SPACER = '┤';
const CENTER_MID_SPACER = '┼';

const BOTTOM_LEFT_SPACER = '└';
const BOTTOM_RIGHT_SPACER = '┘';
const BOTTOM_MID_SPACER = '┴';


const RESET = `\u001b[0m`;
const RED = `\u001b[31m`;
const YELLOW = `\u001b[35m`;

class BoardRenderer {
  constructor(board, { pad = 4 } = {}) {
    this.board = board;
    this.pad = pad;

    this.screenBuffer = Array.from({ length: board.size }, (_, index) => (new Array(board.size)));
  }

  draw() {
    let maxCellSize = 0;

    for (let cell of this.board.field) {
      const row = this.board.size - Math.floor(cell.index / this.board.size) - 1;
      let col = cell.index % this.board.size;

      if (row % 2) {
        col = this.board.size - col - 1;
      }

      let content = (cell.index + 1).toString();

      if (cell.isLadder()) {
        const ladderNumber = this.board.ladders.indexOf(cell.ladder) + 1;
        content = `H${ladderNumber}`;
      }

      if (cell.isSnake()) {
        const snakeNumber = this.board.snakes.indexOf(cell.snake) + 1;
        content = `S${snakeNumber}`;
      }

      this.screenBuffer[row][col] = content;

      maxCellSize = Math.max(maxCellSize, content.length);
    }

    const cellSize = maxCellSize + this.pad;

    const firstLine = `${TOP_LEFT_SPACER}${this.generateBorderLine(cellSize, TOP_MID_SPACER)}${TOP_RIGHT_SPACER}\n`;

    const middleLine = `${CENTER_LEFT_SPACER}${this.generateBorderLine(cellSize, CENTER_MID_SPACER)}${CENTER_RIGHT_SPACER}\n`

    const body = this.screenBuffer.map((col) =>
      `${V_SPACER}${col.map((c) => this.colorize(this.padString(c, cellSize))).join(V_SPACER)}${V_SPACER}\n`
    ).join(middleLine);

    const lastLine = `${BOTTOM_LEFT_SPACER}${this.generateBorderLine(cellSize, BOTTOM_MID_SPACER)}${BOTTOM_RIGHT_SPACER}\n`;

    const legend = `Legend:
      ${YELLOW}H{n}${RESET} - Ladder number {n}
      ${RED}S{n}${RESET} - Snake number {n}`;

    return `${firstLine}${body}${lastLine}\n${legend}`;
  }


  padString(string, cellSize) {
    return string
      .padStart(string.length + Math.ceil((cellSize - string.length) / 2), ' ')
      .padEnd(cellSize, ' ');
  }

  colorize(string) {
    let color;

    if (string.includes('S')) {
      color = RED;
    }

    if (string.includes('H')) {
      color = YELLOW;
    }

    return color ? `${color}${string}${RESET}` : string;
  }

  generateBorderLine(cellSize, middleSpacer) {
    return `${H_SPACER.repeat(cellSize)}${middleSpacer}`.repeat(this.board.size - 1) + H_SPACER.repeat(cellSize);
  }
}

module.exports = BoardRenderer;
