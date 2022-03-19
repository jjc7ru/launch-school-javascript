let readline = require('readline-sync');

class Square {
  static UNUSED_SQUARE = ' ';
  static HUMAN_MARKER = 'X';
  static COMPUTER_MARKER = 'O';

  constructor(marker = ' ') {
    this.marker = marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }

  toString() {
    return this.marker;
  }
}

class Board {
  constructor() {
    this.squares = {};
    this.create();
  }

  create() {
    for (let counter = 1; counter <= 9; counter++) {
      this.squares[String(counter)] = new Square();
    }
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  }

  getSquares() {
    return this.squares;
  }

  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`);
    console.log("     |     |");
    console.log("");
  }

  displayWithClear() {
    console.clear();
    console.log('');
    console.log('');
    this.display();
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
    this.wins = 0;
  }

  getMarker() {
    return this.marker;
  }

  incrementWin() {
    this.wins += 1;
  }

  getWins() {
    return this.wins;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }

  toString() {
    return 'human';
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }

  toString() {
    return 'computer';
  }
}

class TTTGame {
  static POSSIBLE_WINNING_ROWS = [
    ['1', '2', '3'], // top row of board
    ['4', '5', '6'], // center row of board
    ['7', '8', '9'], // bottom row of board
    ['1', '4', '7'], // left column of board
    ['2', '5', '8'], // middle column of board
    ['3', '6', '9'], // right column of board
    ['1', '5', '9'], // diagonal: top-left to bottom-right
    ['3', '5', '7'], // diagonal: bottom-left to top-right
  ];

  static MATCHES = 3;

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
    this.firstPlayer = this.human;
  }
  
  play() {
    this.displayWelcomeMessage();
    this.playMatch();
    this.displayGoodbyeMessage();
  }

  playMatch() {
    this.displayGameRuleMessage();

    while (true) {
      this.start();
      this.updateMatchScore();
      this.displayScore();

      if (this.matchOver()) break;
    }

    this.displayMatchResults();
  }
  
  start() {
    let currentPlayer = this.firstPlayer;
    this.board.create();
    this.board.display();
    //this.displayGoingFirstMessage();

    while (true) {
      this.displayScore();
      //this.playerMoves(currentPlayer);
      //if (this.gameOver()) break;

      this.humanMoves();
      if (this.gameOver()) break;
      
      this.computerMoves();
      if (this.gameOver()) break;

      this.board.displayWithClear();
      currentPlayer = this.toggle(currentPlayer);
    }

    this.board.displayWithClear();
    this.updateFirstPlayer();
  }

  matchOver() {
    return this.isMatchWinner(this.human) || this.isMatchWinner(this.computer);
  }

  isMatchWinner(player) {
    return player.getWins() >= TTTGame.MATCHES;
  }

  displayGoingFirstMessage() {
    console.log(`${this.firstPlayer.toString()} is going first`);
  }

  updateFirstPlayer() {
    this.firstPlayer = this.toggle(this.firstPlayer);
  }

  toggle(player) {
    return player === this.human ? this.computer : this.human;
  }

  playerMoves(currentPlayer) {
    if (currentPlayer === this.human) {
      this.humanMoves();
    } else {
      this.computerMoves();
    }
  }

  displayScore() {
    console.log("Current Score:");
    console.log("human: ", this.human.getWins());
    console.log("computer: ", this.computer.getWins());
    console.log("");
  };

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
    console.log('');
  }

  displayGameRuleMessage() {
    console.log(`The game will end when the player or the computer wins ${TTTGame.MATCHES}`);
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  }

  displayMatchResults() {
    if (this.human.getWins() > this.computer.getWins()) {
      console.log("You won this match! Congratulations!");
    } else if (this.human.getWins() < this.computer.getWins()) {
      console.log("You lost the match!");
    }
  }

  updateMatchScore() {
    let winner = 'draw';
    if (this.isWinner(this.human)) {
      this.human.incrementWin();
      winner = 'human';
    } else if (this.isWinner(this.computer)) {
      this.computer.incrementWin();
      winner = 'computer';
    }
    return winner
  }

  matchWinner() {
    let winner = 'draw';
    if (this.isWinner(this.human)) {
      this.human.incrementWin();
      winner = 'human';
    } else if (this.isWinner(this.computer)) {
      this.computer.incrementWin();
      winner = 'computer';
    }
    return winner
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

  gameWinner() {
    return this.human.getWins() === 3 ? 'human' : 'computer';
  }

  displayGameWinner(winner) {
    console.log(`Final Winner is ${winner}! Congratulations!`);
  }

  humanMoves() {
    let choice;
    while (true) {
      let validChoices = this.board.unusedSquares();
      let choices = TTTGame.joinOr(validChoices);
      let prompt = `Choose a square ${choices}: `;
      choice = readline.question(prompt);
      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice");
      console.log("");
    }
    this.board.markSquareAt(choice, this.human.getMarker());
  }

  static joinOr(arr, delimeter = ',', conjunction = 'or') {
    if (arr.length === 1) {
      return arr[0];
    } else if (arr.length === 2) {
      return arr[0] + 'or ' + arr[1];
    }

    let prompt = '';
    for (let idx = 0; idx < arr.length; idx++) {
      if (idx === arr.length - 1) {
        prompt += conjunction + ' ' + arr[idx];
      } else {
        prompt += arr[idx] + delimeter + ' ';
      }
    }
    return prompt;
  }
  
  computerMoves() {
    let validChoices = this.board.unusedSquares();
    let choice = this.computerOffensive();

    if (!choice) {
      choice = this.computerDefensive();
    } 

    if (!choice) {
      choice = this.computerPicksCenter();
    }

    if (!choice) {
      let index = Math.floor(Math.random() * validChoices.length);
      choice = validChoices[index];
    }
    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  computerChoice(player) {
    let choice;
    let validChoices = this.board.unusedSquares();
    for (let rows of TTTGame.POSSIBLE_WINNING_ROWS) {
      let row = [...rows];
      for (let val of rows) {
        if (this.board.getSquares()[val].getMarker() === player.getMarker()) {
          row.splice(row.indexOf(val), 1);
        }
      }
      
      if (row.length === 1 && validChoices.includes(row[0])) {
        choice = row[0];
      }
    }
    return choice || null;
  }

  computerDefensive() {
    return this.computerChoice(this.human);
  }

  computerOffensive() {
    return this.computerChoice(this.computer);
  }

  computerPicksCenter() {
    const CENTER_SQUARE = '5';
    return this.board.unusedSquares().includes(CENTER_SQUARE) ? CENTER_SQUARE : null;
  }

  boardIsFull() {
    let unusedSquares = this.board.unusedSquares();
    return unusedSquares.length === 0;
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  gameOver() {
    return this.boardIsFull() || this.someoneWon();
  }

  playAgain() {
    let again = readline.question("Play Again (y/n)? ");
    while(!validInput()) {
      again = readline.question("Invalid response. Play Again (y/n)? ");
    }

    function validInput() {
      if (again === 'y' || again === 'n') {
        return true;
      }
      return false;
    }

    return again === 'y' ? true : false;
  }
}

let game = new TTTGame();
game.play();

