# Snakes & Ladders (S&L) game solver #

This is a solver for the randomly generated S&L game which prints out
the board and the combination of dice rolls that leads to the fastest path on it.

```
Welcome to 🐍&🪜 show! 🎉

Board:
┌──────┬──────┬──────┬──────┬──────┐
│  S2  │  22  │  S1  │  24  │  25  │
├──────┼──────┼──────┼──────┼──────┤
│  H1  │  19  │  18  │  H2  │  16  │
├──────┼──────┼──────┼──────┼──────┤
│  11  │  12  │  13  │  14  │  15  │
├──────┼──────┼──────┼──────┼──────┤
│  S1  │   9  │   8  │  H2  │  S3  │
├──────┼──────┼──────┼──────┼──────┤
│   1  │  S3  │  H1  │  S2  │   5  │
└──────┴──────┴──────┴──────┴──────┘

Legend:
      H{n} - Ladder number {n}
      S{n} - Snake number {n}

Best rolls 🎲 : [ 2, 5 ]
```


# Setup

- Check NodeJS, better to have LTS (16.14)
- jump into project and `npm install`

# Play

There is always a winner!

No more, no less:

```sh
npm start
```


# Tests

```sh
npm test
```
