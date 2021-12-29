const readline = require('readline-sync');
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const WINNING_SCORE = 3;


// helper functions
function prompt(message) {
  /* Displays the message */
  console.log(message);
}


function emptySquares(board) {
  /* Returns an array of empty squares */
  return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
}

// print out message from an array in a readable format.
function joinOr(array, delimeter=', ', lastDelimeter='or') {
  let out = '';
  if (array.length === 0) {
    return out;
  } else if (array.length === 1) {
    return String(array[0]);
  } else if (array.length === 2) {
    return String(array[0]) + ' ' + lastDelimeter + ' ' + String(array[1]);
  }

  for (let i = 0; i < array.length; i++) {
    if (i === array.length - 1) {
      out += lastDelimeter + ' ' + String(array[i]);
      return out;
    }
    out += String(array[i]) + delimeter;
  }
}


function winningLines() {
  return [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
    [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
    [1, 5, 9], [3, 5, 7]             // diagonals
  ];
}

// returns true if the player or computer is about to win, false otherwise.
// if it returns true, it means that the computer made an offensive or
// a defensive move
function almostWinning(board, marker) {
  const ALMOST_WINS = 2; // number of squares marked, a turn before the computer or player wins
  let winningCombination = 0;
  let index;
  
  for (let line = 0; line < winningLines().length; line++) {
    let sq = winningLines()[line];
    let sqExists = [false, false, false];

    if (board[sq[0]] === marker) {
      sqExists[0] = true;
    };
    if (board[sq[1]] === marker) {
      sqExists[1] = true;
    };
    if (board[sq[2]] === marker) {
      sqExists[2] = true;
    };
    
    winningCombination = sqExists.reduce((prev, curr) => {
      return Number(prev) + Number(curr);
    }, 0);

    if (winningCombination === ALMOST_WINS) {
      let boardIndex = sq[sqExists.indexOf(false)];
      if (emptySquares(board).includes(String(boardIndex))) {
        board[boardIndex] = COMPUTER_MARKER;
        return true;
      }
    }
  }
  return false;
}

// Determines who goes first
function playerFirst(board) {
  while (true) {
    displayBoard(board);
    
    playerChoosesSquare(board);
    if (someoneWon(board) || boardFull(board)) {
      break
    };

    computerChoosesSquare(board);
    if (someoneWon(board) || boardFull(board)) {
      break
    };
  }
}

function computerFirst(board) {
  while (true) {
    computerChoosesSquare(board);
    if (someoneWon(board) || boardFull(board)) {
      break
    };

    displayBoard(board);

    playerChoosesSquare(board);
    if (someoneWon(board) || boardFull(board)) {
      break
    };
  }
}

function randomFirst(board) {
  let rand = Math.floor(Math.random() * 2);
  if (rand === 0) {
    playerFirst(board);
  } else {
    computerFirst(board);
  }
}


// (1) Display the initial empty 3x3 board.
function displayBoard(board) {
  console.clear();

  console.log(`You are ${HUMAN_MARKER}. Computer is ${COMPUTER_MARKER}`);

  console.log('');
  console.log('     |     |');
  console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['4']}  |  ${board['5']}  |  ${board['6']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['7']}  |  ${board['8']}  |  ${board['9']}`);
  console.log('     |     |');
  console.log('');
}


function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 9; square++) {
    board[String(square)] = INITIAL_MARKER;
  }

  return board;
}


// (2) Ask the user to mark a square.
function playerChoosesSquare(board) {
  let square; // declared here so we can use it outside the loop

  while (true) {
    prompt(`Choose a square (${joinOr(emptySquares(board))}):`);
    square = readline.question().trim(); // input trimmed to allow spaces in input
    if (emptySquares(board).includes(square)) break; // break if it's a valid square

    prompt("Sorry, that's not a valid choice.");
  }
  board[square] = HUMAN_MARKER;
}


// (3) Computer marks a square.
function computerChoosesSquare(board) {
  const MIDDLE = 5;

  let computerAlmostWins = almostWinning(board, 'O');
  if (computerAlmostWins) {
    return;
  }

  let playerAlmostWins = almostWinning(board, 'X');
  if (playerAlmostWins) {
    return;
  }
  if (board[MIDDLE] === ' ') {
    board[MIDDLE] = COMPUTER_MARKER;
    return;
  }

  index = Math.floor(Math.random() * emptySquares(board).length);
  let square = emptySquares(board)[index];
  board[square] = COMPUTER_MARKER;
} 



// (5) If it's a winning board, display the winner.
function someoneWon(board) {
  return !!detectWinner(board);
}

function detectWinner(board) {
  for (let line = 0; line < winningLines().length; line++) {
    let [sq1, sq2, sq3] = winningLines()[line];

    if (board[sq1] === HUMAN_MARKER &&
        board[sq2] === HUMAN_MARKER &&
        board[sq3] === HUMAN_MARKER) {
      return 'Player';
    } else if (board[sq1] === COMPUTER_MARKER &&
      board[sq2] === COMPUTER_MARKER &&
      board[sq3] === COMPUTER_MARKER) {
      return 'Computer';
    }
  }
  return null;
}

// (6) If the board is full, display tie.
function boardFull(board) {
  return emptySquares(board).length === 0;
}

function chooseStart() {
  const CHOICES = ['player', 'computer', 'choose'];
  prompt(`Who goes first? Please choose between ${joinOr(CHOICES)}`);
  while (true) {
    let answer = readline.question();
    if (!CHOICES.includes(answer)) {
      console.log(`Invalid choice. Please choose between ${joinOr(CHOICES)}`);
      continue;
    } else {
      return answer;
    }
  }
}



// (7) Play
while(true) {
  let board = initializeBoard();
  let whoFirst = chooseStart();

  if (whoFirst === 'player') {
    playerFirst(board);
  } else if (whoFirst === 'computer') {
    computerFirst(board);
  } else {
    randomFirst(board);
  }

  displayBoard(board);

  if (someoneWon(board)) {
    prompt(`${detectWinner(board)} won!`);
  } else {
    prompt("It's a tie!");
  }

  prompt('Play again? (y or n)');
  let answer = readline.question().toLowerCase()[0];
  if (answer !== 'y') break;
}

prompt('Thanks for playing Tic Tac Toe!');
