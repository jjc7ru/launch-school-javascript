/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */

const readline = require('readline-sync');


function createPlayer() {
  return {
    move: null,
  };
}


function createHuman() {
  let playerObject = createPlayer();
  let gameChoice = createGameChoice();
  let message = createMessage();

  let humanObject = {
    choose() {
      let choice;

      while (true) {
        choice = readline.question().toLowerCase();
        choice = gameChoice.mapper[choice] || choice;
        if (gameChoice.choicesArr.includes(choice)) break;
        message.displayInvalidChoice();
      }

      this.move = choice;
    },
  };

  return Object.assign(playerObject, humanObject);
}


function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose(strategy) {
      this.move = strategy;
    },
  };

  return Object.assign(playerObject, computerObject);
}

function createRule() {
  let gameChoice = createGameChoice();

  return {
    compare(humanMove, computerMove) {
      let winner = '';

      if (this.humanWins(humanMove, computerMove)) {
        winner = 'human';
      } else if (humanMove === computerMove) {
        winner = 'tie';
      } else {
        winner = 'computer';
      }
      return winner;
    },

    humanWins(humanMove, computerMove) {
      let moves = gameChoice.choices[humanMove];

      return (
        (humanMove === 'rock' && (computerMove === moves[0] || computerMove === moves[1])) ||
        (humanMove === 'paper' && (computerMove === moves[0] || computerMove === moves[1])) ||
        (humanMove === 'scissors' && (computerMove === moves[0] || computerMove === moves[1])) ||
        (humanMove === 'lizard' && (computerMove === moves[0] || computerMove === moves[1])) ||
        (humanMove === 'spock' && (computerMove === moves[0] || computerMove === moves[1]))
      );
    },

    determineWinner(humanScore, computerScore) {
      if (humanScore > computerScore) {
        return 'human';
      } else if (humanScore < computerScore) {
        return 'computer';
      } else {
        return 'tie';
      }
    }
  };
}


function createStrategy() {
  let gameChoice = createGameChoice();
  let gameWeight = createWeight();

  return {
    // randomly return the computer move
    random(array) {
      let randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    },

    // use move statistics to determine move for computer
    probability(moveStatistics) {
      console.log(moveStatistics);

      const WINS_PERCENTAGE = 0.1;

      for (let choice of gameChoice.choicesArr) {
        let winRate = moveStatistics[choice][moveStatistics[choice].length - 1];
        let choicePlayedNoTies = moveStatistics[choice][2];
        let playerWinRate = choicePlayedNoTies ? (1 - winRate) : 0;
        if (playerWinRate > WINS_PERCENTAGE) {
          gameWeight.updateWeight(choice, 0.1, 'decrease');

          let move1 = gameChoice.choicesReverse[choice][0];
          let move2 = gameChoice.choicesReverse[choice][1];
          let intersection = this.chooseIntersection(move1, move2);
          console.log(intersection);
          gameWeight.updateWeight(intersection, 0.1, 'increase');
        }
      }

      let weight = gameWeight.getWeight();
      console.log(weight);
      let currMove = this.chooseFromWeight(weight);
      gameWeight.resetWeight();
      return currMove;
    },

    chooseIntersection(move1, move2) {
      let arr1 = gameChoice.choicesReverse[move1];
      let arr2 = gameChoice.choicesReverse[move2];

      if (arr1[0] === arr2[0] || arr1[0] === arr2[1]) return arr1[0];
      if (arr1[1] === arr2[0] || arr1[1] === arr2[1]) return arr1[1];
      return '';
    },

    chooseFromWeight(weight) {
      let randomValue = Math.random();
      let rollingPercentage = 0;
      for (let choice of gameChoice.choicesArr) {
        rollingPercentage += weight[choice];
        if (randomValue < rollingPercentage) {
          return choice;
        }
      }
      return gameChoice.choicesArr[gameChoice.choicesArr.length - 1];
    },

  };
}

function createMoveStatistics() {
  return {
    // Index 0: Number of times computer played current move
    // Index 1: Number of times computer won with current move
    // Index 2: Number of times current move was played total (excluding ties)
    // Index 3: Win rate of computer with current move
    moves: {
      rock: [0, 0, 0, 0],
      paper: [0, 0, 0, 0],
      scissors: [0, 0, 0, 0],
      lizard: [0, 0, 0, 0],
      spock: [0, 0, 0, 0],
    },

    timesComputerPlayedMove(move) {
      this.moves[move][0]++;
    },

    timesComputerWonWithMove(move, winner) {
      if (winner === 'computer') {
        this.moves[move][1]++;
      }
    },

    timesPlayed(move, winner) {
      if (winner !== 'tie') {
        this.moves[move][2]++;
      }
    },

    calculateWinRate(move) {
      if (this.moves[move][2] === 0) {
        return;
      }
      this.moves[move][3] = this.moves[move][1] / this.moves[move][2];
    },

    getMoveStatistics() {
      return this.moves;
    },

  };
}

function createWeight() {
  let gameChoice = createGameChoice();

  return {
    weights: {
      rock: .2,
      paper: .2,
      scissors: .2,
      lizard: .2,
      spock: .2,
    },

    updateWeight(move, percent, direction) {
      const NUMBER_OF_CHOICES = 5;
      let prevWeight = this.weights[move];
      let difference;
      let increaseWeightBy;

      if (direction === 'decrease') {
        this.weights[move] *= (1 - percent);
        difference = prevWeight - this.weights[move];
        increaseWeightBy = (difference / (NUMBER_OF_CHOICES - 1));

        for (let choice of gameChoice.choicesArr) {
          if (choice !== move) {
            this.weights[choice] += increaseWeightBy;
          }
        }
      } else if (direction === 'increase') {
        this.weights[move] *= (1 + percent);
        difference =  this.weights[move] - prevWeight;
        increaseWeightBy = (difference / (NUMBER_OF_CHOICES - 1));

        for (let choice of gameChoice.choicesArr) {
          if (choice !== move) {
            this.weights[choice] -= increaseWeightBy;
          }
        }
      }
    },

    getWeight() {
      return this.weights;
    },

    resetWeight() {
      this.weights = {
        rock: .2,
        paper: .2,
        scissors: .2,
        lizard: .2,
        spock: .2,
      };
    },

  };
}

function createGameChoice() {
  return {

    // (eg. rock beats lizard and scissors)
    choices: {
      rock: ['lizard', 'scissors'],
      paper: ['rock', 'spock'],
      scissors: ['paper', 'lizard'],
      lizard: ['spock', 'paper'],
      spock: ['rock', 'scissors'],
    },

    // (eg. rock loses to spock and paper)
    choicesReverse: {
      rock: ['spock', 'paper'],
      paper: ['lizard', 'scissors'],
      scissors: ['rock', 'spock'],
      lizard: ['rock', 'scissors'],
      spock: ['lizard', 'paper'],
    },

    // If the human player chooses 'r', it will map to 'rock'
    mapper: {
      r: 'rock',
      p: 'paper',
      s: 'scissors',
      l: 'lizard',
      sp: 'spock',
    },

    // guarantees order
    choicesArr: ['rock', 'paper' ,'scissors', 'lizard', 'spock'],
  };
}

function createScoreboard() {
  return {
    humanScore: 0,
    computerScore: 0,

    // if winner is human or computer, increment their respective scores
    // if tie, don't do anything
    updateScore(winner) {
      if (winner === 'human') {
        this.humanScore++;
      } else if (winner === 'computer') {
        this.computerScore++;
      }
    },

    getHumanScore() {
      return this.humanScore;
    },

    getComputerScore() {
      return this.computerScore;
    },

    resetScore() {
      this.humanScore = 0;
      this.computerScore = 0;
    },
  };
}

function createGameFunction() {
  return {
    playAgain() {
      let answer = readline.question();
      return answer.toLowerCase()[0] === 'y';
    }
  };
}

function createMessage() {
  return {
    displayWelcomeMessage() {
      console.log('Welcome to Rock, Paper, Scissors, Lizard, Spock!');
    },

    displayGoodbyeMessage() {
      console.log('Thanks for playing Rock, Paper, Scissors, Lizard, Spock. Goodbye!');
    },

    displayChoicesMessage() {
      console.log('\nPlease choose (r)ock, (p)aper, (s)cissors, (l)izard, or (sp)ock: ');
    },

    displayPlayerMove(move) {
      console.log(`You chose: ${move}`);
    },

    displayComputerMove(move) {
      console.log(`Computer chose: ${move}`);
    },

    displayWinner(winner) {
      if (winner === 'tie') {
        console.log("\nIt's a tie!\n");
        return;
      }
      winner = winner.slice(0, 1).toUpperCase() + winner.slice(1);
      console.log(`\n${winner} won!\n`);
    },

    displayScore(humanScore, computerScore) {
      this.createDisplayScoreboard(humanScore, computerScore);
    },

    displayPlayAgainMessage() {
      console.log('Play Again? (y/n)');
    },

    displayInvalidChoice() {
      console.log('Sorry, invalid choice.');
    },

    displayRoundWinner(humanScore, computerScore) {

      if (humanScore > computerScore) {
        console.log('\nRound Winner: Human!');
      } else {
        console.log('\nRound Winner: Computer!');
      }
    },

    displayFinalWinner(humanScore, computerScore) {
      this.createDisplayScoreboard(humanScore, computerScore);

      if (humanScore > computerScore) {
        console.log('\nFinal Winner: Human!');
      } else {
        console.log('\nFinal Winner: Computer!');
      }
    },

    createDisplayScoreboard(humanScore, computerScore) {
      let s1 = ' Human: ' + String(humanScore) + ' ';
      let s2 = ' Computer: ' + String(computerScore) + ' ';

      let lengthDifference = Math.max(
        s2.length - s1.length,
        s1.length - s2.length
      );

      let width = '+' + '-'.repeat(Math.max(s1.length, s2.length)) + '+';
      let heightHuman = '|' + s1 + ' '.repeat(lengthDifference)  + '|';
      let heightComputer = '|' + s2 + '|';

      console.log(width);
      console.log(heightHuman);
      console.log(heightComputer);
      console.log(width);
    },

  };
}


const RPSGame = {
  human: createHuman(),
  computer: createComputer(),
  message: createMessage(),
  score: createScoreboard(),
  overallScore: createScoreboard(),
  gameChoice: createGameChoice(),
  strategy: createStrategy(),
  rule: createRule(),
  gameFunction: createGameFunction(),
  move: createMoveStatistics(),

  play() {
    console.clear();

    const NUMBER_OF_GAMES = 5;

    this.message.displayWelcomeMessage();

    while (true) {
      while (this.score.getHumanScore() < NUMBER_OF_GAMES &&
             this.score.getComputerScore() < NUMBER_OF_GAMES) {
        this.message.displayChoicesMessage();
        this.human.choose();
        let humanMove = this.human.move;

        let computerStrategy = this.strategy.probability(
          this.move.getMoveStatistics()
        );

        this.computer.choose(computerStrategy);
        let computerMove = this.computer.move;

        this.message.displayPlayerMove(humanMove);
        this.message.displayComputerMove(computerMove);

        let winner = this.rule.compare(humanMove, computerMove);

        this.move.timesComputerPlayedMove(computerMove);
        this.move.timesComputerWonWithMove(computerMove, winner);
        this.move.timesPlayed(computerMove, winner);
        this.move.calculateWinRate(computerMove);

        this.message.displayWinner(winner);
        this.score.updateScore(winner);

        this.message.displayScore(
          this.score.getHumanScore(),
          this.score.getComputerScore()
        );
      }

      this.message.displayRoundWinner(
        this.score.getHumanScore(),
        this.score.getComputerScore()
      );

      let roundWinner = this.rule.determineWinner(
        this.score.getHumanScore(),
        this.score.getComputerScore()
      );

      this.overallScore.updateScore(roundWinner);

      this.message.displayPlayAgainMessage();
      if (this.gameFunction.playAgain()) {
        this.score.resetScore();
      } else {
        break;
      }
    }

    this.message.displayFinalWinner(
      this.overallScore.getHumanScore(),
      this.overallScore.getComputerScore()
    );

    this.message.displayGoodbyeMessage();
  },
};

RPSGame.play();
