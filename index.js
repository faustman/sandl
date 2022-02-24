const Board = require('./src/Board');
const Solver = require("./src/Solver");

/**
 * TODO:
 *
 * [x] generate board
 *   [x] generate cells
 *   [x] generate ladders
 *   [x] generate snake
 * [x] draw board
 * [x] find fastest dice rolls
 *
 */

console.log(`Welcome to 🐍&🪜 show! 🎉 \n`);

console.log(`Board:`);
const board = new Board();

console.log(board.draw());

const solver = new Solver(board);

console.log(`\nBest rolls 🎲 : [ ${solver.findFastestRolls().join(', ')} ]`);
