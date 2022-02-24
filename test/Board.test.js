const Board = require('../src/Board');
const Cell = require("../src/Cell");

describe('Board', () => {
  describe('#getNextRowCell', () => {
    describe('should return first cell in next row', () => {
      test('5x5 field', () => {
        const size = 5;

        expect(new Board({ size }).getNextRowCell(3)).toEqual(5);
        expect(new Board({ size }).getNextRowCell(8)).toEqual(10);
        expect(new Board({ size }).getNextRowCell(16)).toEqual(20);
        expect(new Board({ size }).getNextRowCell(19)).toEqual(20);
      });

      it('10x10 field', () => {
        const size = 10;

        expect(new Board({ size }).getNextRowCell(5)).toEqual(10);
        expect(new Board({ size }).getNextRowCell(10)).toEqual(20);
        expect(new Board({ size }).getNextRowCell(18)).toEqual(20);
        expect(new Board({ size }).getNextRowCell(51)).toEqual(60);
      });
    });

    it('should return null if out of field', function () {
      const size = 5;

      expect(new Board({ size }).getNextRowCell(23)).toEqual(null);
    });
  });

  describe('#getPrevRowCell', () => {
    describe('should return first cell in next row', () => {
      test('5x5 field', () => {
        const size = 5;

        expect(new Board({ size }).getPrevRowCell(23)).toEqual(19);
        expect(new Board({ size }).getPrevRowCell(19)).toEqual(14);
        expect(new Board({ size }).getPrevRowCell(10)).toEqual(9);
        expect(new Board({ size }).getPrevRowCell(7)).toEqual(4);
      });

      it('10x10 field', () => {
        const size = 10;

        expect(new Board({ size }).getPrevRowCell(98)).toEqual(89);
        expect(new Board({ size }).getPrevRowCell(50)).toEqual(49);
        expect(new Board({ size }).getPrevRowCell(49)).toEqual(39);
        expect(new Board({ size }).getPrevRowCell(13)).toEqual(9);
      });
    });

    it('should return null if out of field', function () {
      const size = 5;

      expect(new Board({ size }).getPrevRowCell(4)).toEqual(null);
    });
  });

  describe('#findEmptyCellsBetween', () => {
    test('return empty cells from the range', () => {
      const board = new Board();

      const testField = [
        new Cell(0, board),
        new Cell(1, board),
        new Cell(2, board),
        new Cell(3, board),
        new Cell(4, board),
        new Cell(5, board),
        new Cell(6, board),
      ];

      board.field = testField;

      testField[3].setLadder({ from: 1, to: 14 });

      expect(board.findEmptyCellsBetween(2, 5)).toEqual([testField[2], testField[4]]);
      expect(board.findEmptyCellsBetween(2, testField.length)).toEqual([testField[2], testField[4], testField[5]]);

      testField[4].setLadder({ from: 1, to: 14 });

      expect(board.findEmptyCellsBetween(2, 5)).toEqual([testField[2]]);
      expect(board.findEmptyCellsBetween(2, testField.length)).toEqual([testField[2], testField[5]]);
    })
  });

  describe('#generateLadders', () => {
    test('at least one ladder is generated', () => {
      const board = new Board();

      expect(board.ladders.length).toBeGreaterThan(0);
    });

    test('first and last cell always empty', () => {
      const board = new Board();

      expect(board.field[0].isLadder()).toBe(false);
      expect(board.field[board.field.length - 1].isLadder()).toBe(false);
    });

    test('ladders always up', () => {
      const board = new Board();

      board.ladders.forEach((ladder) => {
        expect(ladder.to).toBeGreaterThan(ladder.from);
      });
    });

    test('no ladders on last row', () => {
      const board = new Board();

      board.field.slice(board.field.length - board.size).forEach((cell) => {
        if (cell.isLadder()) {
          expect(cell.ladder.from).not.toEqual(cell.index);
        }
      });
    });

    test('should not stack up', () => {
      const board = new Board();

      board.ladders.forEach((ladder, index) => {
        board.ladders.slice(index + 1).forEach((otherLadder) => {
          expect(ladder.to).not.toEqual(otherLadder.to);
          expect(ladder.to).not.toEqual(otherLadder.from);

          expect(ladder.from).not.toEqual(otherLadder.to);
          expect(ladder.from).not.toEqual(otherLadder.from);
        });
      });
    });
  });

  describe('#generateSnakes', () => {
    test('at least one snake is generated', () => {
      const board = new Board();

      expect(board.snakes.length).toBeGreaterThan(0);
    });

    test('at least one snake is generated even if full of ladders', () => {
      const board = new Board({ ladderFactor: 1 });

      expect(board.snakes.length).toBeGreaterThan(0);
    });

    test('first and last cell always empty', () => {
      const board = new Board();

      expect(board.field[0].isSnake()).toBe(false);
      expect(board.field[board.field.length - 1].isSnake()).toBe(false);
    });

    test('snakes always down', () => {
      const board = new Board();

      board.snakes.forEach((snake) => {
        expect(snake.from).toBeGreaterThan(snake.to);
      });
    });

    test('no snakes on first row', () => {
      const board = new Board();

      board.field.slice(0, board.size).forEach((cell) => {
        if (cell.isSnake()) {
          expect(cell.snake.from).not.toEqual(cell.index);
        }
      });
    });

    test('should not stack up', () => {
      const board = new Board();

      board.snakes.forEach((snake, index) => {
        board.snakes.slice(index + 1).forEach((otherSnake) => {
          expect(snake.to).not.toEqual(otherSnake.to);
          expect(snake.to).not.toEqual(otherSnake.from);

          expect(snake.from).not.toEqual(otherSnake.to);
          expect(snake.from).not.toEqual(otherSnake.from);
        });
      });
    });
  });
});
