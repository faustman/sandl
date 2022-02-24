const Cell = require('../src/Cell');
const Board = require("../src/Board");
const Random = require("../src/Random");

describe('Cell', () => {
  describe('#isLastRow', () => {
    describe('should return true if index in the last row', () => {
      test('5x5 field', () => {
        const size = 5;

        const board = new Board({ size: 5 });

        expect(new Cell(3, board).isLastRow()).toEqual(false);
        expect(new Cell(13, board).isLastRow()).toEqual(false);
        expect(new Cell(20, board).isLastRow()).toEqual(true);
        expect(new Cell(21, board).isLastRow()).toEqual(true);
        expect(new Cell(24, board).isLastRow()).toEqual(true);
      });
    });
  });

  describe('#isFirstRow', () => {
    describe('should return true if index in the first row', () => {
      test('5x5 field', () => {
        const size = 5;

        const board = new Board({ size: 5 });

        expect(new Cell(1, board).isFirstRow()).toEqual(true);
        expect(new Cell(4, board).isFirstRow()).toEqual(true);
        expect(new Cell(21, board).isFirstRow()).toEqual(false);
        expect(new Cell(24, board).isFirstRow()).toEqual(false);
      });
    });
  });

  describe('#isLadder', () => {
    test('shows is ladder exists', () => {
      const cell = new Cell();

      expect(cell.isLadder()).toBe(false);

      cell.setLadder({ from: 1, to: 12 });

      expect(cell.isLadder()).toBe(true);
    });
  });

  describe('#isSnake', () => {
    test('shows is snake exists', () => {
      const cell = new Cell();

      expect(cell.isSnake()).toBe(false);

      cell.setSnake({ from: 1, to: 12 });

      expect(cell.isSnake()).toBe(true);
    });
  });

  describe('#isFirst', () => {
    test('returns true only if index zero', () => {
      expect(new Cell(0).isFirst()).toBe(true);

      const anyIndexGtZero = Random.between(1);
      expect(new Cell(anyIndexGtZero).isFirst()).toBe(false);
    });
  });

  describe('#isLast', () => {
    test('returns true only if index last element in board field', () => {
      const board = new Board({ size: 5 });

      const lastIndex = board.fieldLength() - 1;

      expect(new Cell(lastIndex, board).isLast()).toBe(true);

      const anyIndexLtLastIndex = Random.between(0, lastIndex - 1);

      expect(new Cell(anyIndexLtLastIndex, board).isLast()).toBe(false);
    });
  });

  describe('#isEmpty', () => {
    test('not first, not last, not ladder', () => {
      const board = new Board({ size: 5 });

      const lastIndex = board.fieldLength() - 1;

      expect(new Cell(0, board).isEmpty()).toEqual(false);
      expect(new Cell(lastIndex, board).isEmpty()).toEqual(false);

      const anyIndexBetween = Random.between(1, lastIndex - 1);

      expect(new Cell(anyIndexBetween, board).isEmpty()).toEqual(true);

      const cellWithLadder = new Cell(anyIndexBetween, board);

      cellWithLadder.setLadder({ from: 1, to: 2 });

      expect(cellWithLadder.isEmpty()).toEqual(false);

      const cellWithSnake = new Cell(anyIndexBetween, board);

      cellWithSnake.setSnake({ from: 1, to: 2 });

      expect(cellWithSnake.isEmpty()).toEqual(false);
    });
  });
});
