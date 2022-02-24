const Solver = require('../src/Solver');
const Board = require("../src/Board");

describe('Solver', () => {
  test('case 1', () => {
    /**
     * ┌──────┬──────┬──────┬──────┬──────┐
     * │  H3  │  H1  │  H2  │  H4  │  25  │
     * ├──────┼──────┼──────┼──────┼──────┤
     * │  20  │  19  │  H4  │  H3  │  H2  │
     * ├──────┼──────┼──────┼──────┼──────┤
     * │  11  │  12  │  S1  │  14  │  H1  │
     * ├──────┼──────┼──────┼──────┼──────┤
     * │  10  │   9  │  S1  │   7  │   6  │
     * ├──────┼──────┼──────┼──────┼──────┤
     * │   1  │   2  │   3  │   4  │   5  │
     * └──────┴──────┴──────┴──────┴──────┘
     */
    const board = new Board();

    board.clear();

    board.ladders = [
      { from: 14, to: 21 },
      { from: 15, to: 22 },
      { from: 16, to: 20 },
      { from: 17, to: 23 }
    ];

    board.snakes = [
      { from: 12, to: 7 }
    ];

    board.restore();

    const solver = new Solver(board);

    expect(solver.findFastestRolls()).toEqual([6, 5, 6, 1]);
  });

  test('case 2', () => {
    /**
     * ┌──────┬──────┬──────┬──────┬──────┐
     * │  21  │  22  │  23  │  24  │  25  │
     * ├──────┼──────┼──────┼──────┼──────┤
     * │  20  │  H3  │  18  │  H2  │  16  │
     * ├──────┼──────┼──────┼──────┼──────┤
     * │  H1  │  12  │  H3  │  S1  │  15  │
     * ├──────┼──────┼──────┼──────┼──────┤
     * │  10  │   9  │   8  │   7  │   6  │
     * ├──────┼──────┼──────┼──────┼──────┤
     * │   1  │   2  │  H1  │  S1  │  H2  │
     * └──────┴──────┴──────┴──────┴──────┘
     */
    const board = new Board();

    board.clear();

    board.ladders = [
      { from: 2, to: 10 },
      { from: 4, to: 16 },
      { from: 12, to: 18 }
    ];

    board.snakes = [
      { from: 13, to: 3 }
    ];

    board.restore();

    const solver = new Solver(board);

    expect(solver.findFastestRolls()).toEqual([4, 6, 2]);
  });
});
