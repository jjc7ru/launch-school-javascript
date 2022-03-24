const readline = require('readline-sync');

class Card {
  constructor(card) {
    this.card = card;
  }

  getScore() {
    // gets the score of a card
    // (ie) new Card('4') --> [4]; new Card('A') --> [1, 11]
    const SCORE = [parseInt(this.card)];
    const ACE_VALUE = [1, 11];
    const JQK_VALUE = [10];
    if (this.card === 'J' || this.card === 'Q' || this.card === 'K') {
      return JQK_VALUE;
    } else if (this.card === 'A') {
      return ACE_VALUE;
    }
    return SCORE;
  }

  toString() {
    // (ie) new Card('5') --> '5'
    return this.card;
  }
}

class Deck {
  //static CARDS = ['2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K', 'A'];
  static CARDS = ['A', '2', '3'];

  constructor() {
    this.cards = {};
    this.deck = {};
    this.mapCards(); // {'2': new Card('2'), ... 'A': new Card('A')}
    this.shuffle();  // {'2': 4, ... 'A': 4}; 
  }

  mapCards() {
    // creates cards template 
    // (ie) {'2': new Card('2'), ... 'A': new Card('A')}
    for (let card of Deck.CARDS) {
      this.cards[card] = new Card(card);
    }
  }

  shuffle() {
    // creates 52 card deck
    // (ie) {'2': 4, ... 'A': 4}
    const NUMBER_OF_CARDS_PER_CARD = 4;
    for (let card of Deck.CARDS) {
      this.deck[card] = NUMBER_OF_CARDS_PER_CARD;
    }
  }

  getCards() {
    // gets the cards 
    // (ie) {'2': new Card('2'), ... 'A': new Card('A')}
    return this.cards;
  }

  getCardCount(card) {
    // gets the number of remaining cards for a given card
    // (ie) getCardCount('5') ---> 4
    return this.deck[card];
  }

  availableCards() {
    // gets an array of available cards. The card count has to be greater than 0.
    // (ie) ['2', '3', ... ]
    return Deck.CARDS.filter(card => this.deck[card] > 0);
  }

  deal() {
    // deals a random card object
    // (ie) new Card('5')
    let cards = this.availableCards();
    let index = Math.floor(Math.random() * cards.length);
    let selectedCard = cards[index];
    return this.cards[selectedCard];
  }
}

class Participant {
  constructor() {
    this.hand = [];
    this.score = [0, 0];
    this.finalScore = [];
  }

  updateScore(card) {
    // Converts the Card object and updates this.score
    // (ie) this.score = [0, 0] --> updateScore(new Card('5')) --> this.score = [5, 5]
    // (ie) this.score = [0, 0] --> updateScore(new Card('A')) --> this.score = [1, 11]
    // (ie) this.score = [4, 14] --> updateScore(new Card('A')) --> this.score = [5, 15]
    // (ie) this.score = [20, 30] --> updateScore(new Card('A')) --> this.score = [21, 21]
    // (ie) this.score = [21, 31] --> updateScore(new Card('A')) --> this.score = []
    let cardScore = card.getScore();
    if (cardScore.length === 1) {
      this.score[0] += cardScore[0];
      this.score[1] += cardScore[0];
    } else {
      let temp1 = [this.score[0] + cardScore[0], this.score[1] + cardScore[0]];
      let temp2 = [this.score[1] + cardScore[1], this.score[1] + cardScore[1]];
      let merged = merge(temp1, temp2);
      if (merged.length < 2) {
        merged.push(merged[0]);
      }
      this.score = merged;
    }

    function merge(arr1, arr2) {
      let combined = arr1.concat(arr2);
      if (combined.every(number => number > 21)) {
        return arr1;
      }
      
      let merged = [];
      for (let value of combined) {
        if (!merged.includes(value) && value <= 21) {
          merged.push(value);
        }
      }
      return merged;
    }
  }

  getScore() {
    // returns the raw score
    // (ie) [5, 15]
    return this.score;
  }

  getHigherScore() {
    // returns the higher of the two value (if different else returns one) 
    // from the current score
    // (ie) this.score = [5] ---> getScore() ---> 5
    // (ie) this.score = [1, 11] ---> getScore() ---> 11
    // (ie) this.score = [15, 15] ---> getScore() ---> 15
    if (this.score.length === 1) {
      return this.score[0];
    }

    if (this.score[1] > this.score[0]) {
      return this.score[1];
    }
    return this.score[0];
  }

  isBusted() {
    // if both scores are greater than 21, return true else false
    return this.score[0] > 21 && this.score[1] > 21;
  }

  getLastDealtCard() {
    // returns the last dealt card
    // (ie) this.hand = ['A', '2', '5'] --> '5'
    return this.hand[this.hand.length - 1];
  }

  updateFinalScore() {
    // updates the final score
    // (ie) this.score = [10, 20] --> updateFinalScore() --> [20]
    this.finalScore = [this.getHigherScore(this.score)];
  }

  getFinalScore() {
    // returns the final score
    return this.finalScore;
  }
}

class Player extends Participant {
  constructor() {
    super();
  }

  getInitialHand() {
    // Initial hand always contain two cards for player
    return this.hand[0] + ' and ' + this.hand[1];
  }
}

class Dealer extends Participant {
  constructor() {
    super();
    this.deck = new Deck();
    this.hidden = true;
  }

  deal(participant) {
    // deals to a participant's hand
    participant.hand.push(this.deck.deal());
  }

  getInitialHand() {
    // Initial hand always contain two cards where one is hidden
    return this.hand[0] + ' and a hidden card.';
  }

  revealHand() {
    return MessageCenter.prettyPrint(this.hand, ',', 'and');
  }

  hide() {
    this.hidden = true;
  }

  reveal() {
    this.hidden = false;
  }
}

class ScoreBoard {

  initialScoreBoard(playerScore) {
    playerScore = this.cleanScore(playerScore);
    let player = `Your score is: ${playerScore}`;
    let dealer = "Dealer's score is: N/A";
    this.createScoreBoard(player, dealer);
  }

  updatedScoreBoard(playerScore, dealerScore) {
    playerScore = this.cleanScore(playerScore);
    dealerScore = this.cleanScore(dealerScore);
    let player = `Your score is: ${playerScore}`;
    let dealer = `Dealer's score is: ${dealerScore}`;
    this.createScoreBoard(player, dealer);
  }

  createScoreBoard(playerText, dealerText) {
    let maxLength = Math.max(playerText.length, dealerText.length);
    let difference = Math.abs(playerText.length - dealerText.length);
    if (playerText.length < dealerText.length) {
      playerText += ' '.repeat(difference);
    } else {
      dealerText += ' '.repeat(difference);
    }
    console.log('+' + '-'.repeat(maxLength + 2) + '+');
    console.log('| ' + playerText + ' |');
    console.log('| ' + dealerText + ' |');
    console.log('+' + '-'.repeat(maxLength + 2) + '+');
  }

  cleanScore(score) {
    // returns a cleaned version of score
    // (ie) cleanScore([5, 5]) --> '5'
    // (ie) cleanScore([1, 11]) --> '1 or 11'
    // (ie) cleanScore([2, 22]) --> '2'
    if (score[0] === score[1]) {
      return MessageCenter.prettyPrint([score[0]]);
    } else if (score[0] > 21) {
      return MessageCenter.prettyPrint([score[1]]);
    } else if (score[1] > 21) {
      return MessageCenter.prettyPrint([score[0]]);
    }
    return MessageCenter.prettyPrint(score, '', 'or');
  }
}

class MessageCenter {
  constructor() {
    this.scoreboard = new ScoreBoard();
  }

  displayWelcomeMessage() {
    console.log("Welcome to the game of Twenty-One!");
  }

  displayGoodbyeMessage() {
    console.log("Thank you for playing. Goodbye!");
  }

  displayInitialCards(player, dealer) {
    console.log('');
    console.log(`Your Cards: ${player.getInitialHand()}`);
    console.log(`Dealer Cards: ${dealer.getInitialHand()}`);
  }

  displayCards(player, dealer) {
    console.log('');
    console.log(`Your Cards: ${MessageCenter.prettyPrint(player.hand, ',', 'and')}`);
    if (dealer.hidden) {
      console.log(`Dealer Cards: ${dealer.getInitialHand()}`);
    } else {
      console.log(`Dealer cards: ${dealer.revealHand()}`);
    }
  }

  displayDealerCards(dealer) {
    console.log('');
    if (dealer.hidden) {
      console.log(`Dealer Cards: ${dealer.getInitialHand()}`);
    } else {
      console.log(`Dealer cards: ${dealer.revealHand()}`);
    }
  }

  displayInitialScoreBoard(playerScore) {
    console.log('');
    this.scoreboard.initialScoreBoard(playerScore);
    console.log('');
  }

  displayUpdatedScoreBoard(playerScore, dealerScore) {
    console.log('');
    this.scoreboard.updatedScoreBoard(playerScore, dealerScore);
    console.log('');
  }

  displayDealerContinueReason() {
    console.log("Dealer's cards are less than 17. Hitting ...");
  }

  displayDealerStoppingReason() {
    console.log("Dealer's cards are greater than or equal to 17. Staying ...");
  }

  displayPlayerTurn() {
    console.log("+---------------+");
    console.log("| PLAYER'S TURN |");
    console.log("+---------------+");
  }

  displayDealerTurn() {
    console.log("+---------------+");
    console.log("| DEALER'S TURN |");
    console.log("+---------------+");
  }

  displayFinalScore() {
    console.log("+-------------+");
    console.log("| FINAL SCORE |");
    console.log("+-------------+");
  }

  

  static prettyPrint(arr, delimeter='', conjunction='') {
    let output = '';
    if (arr.length === 1) {
      return arr[0];
    } else if (arr.length === 2) {
      return arr[0] + ' ' + conjunction + ' ' + arr[1];
    }

    for (let idx = 0; idx < arr.length; idx++) {
      if (idx === arr.length - 1) {
        output += conjunction + ' ' + arr[idx];
      } else {
        output += arr[idx] + delimeter + ' ';
      }
    }
    return output;
  }
}

class TwentyOneGame {
  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
    this.messages = new MessageCenter();
  }

  start() {
    console.clear();
    this.messages.displayWelcomeMessage();
    this.messages.displayPlayerTurn();
    this.dealCards();
    this.messages.displayInitialCards(this.player, this.dealer);
    this.messages.displayInitialScoreBoard(this.player.getScore());
    this.playerTurn();
    this.dealerTurn();
    this.displayResult();
    this.messages.displayGoodbyeMessage();
  }

  dealCards() {
    this.dealer.deal(this.player);
    this.player.updateScore(this.player.getLastDealtCard());
    
    this.dealer.deal(this.dealer);
    this.dealer.updateScore(this.dealer.getLastDealtCard());
    
    this.dealer.deal(this.player);
    this.player.updateScore(this.player.getLastDealtCard());

    this.dealer.deal(this.dealer);
    this.dealer.updateScore(this.dealer.getLastDealtCard());
  }

  playerTurn() {
    while (true) {
      let hit = readline.question("Hit (y/n)? ");
      if (hit === 'y') {
        console.clear();
        console.log('');
        this.messages.displayPlayerTurn();
        this.dealer.deal(this.player);
        this.player.updateScore(this.player.getLastDealtCard());
        this.messages.displayCards(this.player, this.dealer);
        this.messages.displayInitialScoreBoard(this.player.getScore());
        if (this.player.isBusted()) {
          console.log("You bust!");
          break;
        }
      } else if (hit === 'n') {
        this.player.updateFinalScore();
        break
      } else {
        console.log("Invalid input. Please choose between (y/n).");
      }
    }
  }

  dealerTurn() {
    console.clear();
    this.messages.displayDealerTurn()
    this.dealer.reveal();
    while (true) {
      this.messages.displayDealerCards(this.dealer);
      this.messages.displayUpdatedScoreBoard(this.player.getFinalScore(), this.dealer.getScore());
      if (this.dealer.getScore()[0] >= 17 || this.dealer.getScore()[1] >= 17) {
        this.messages.displayDealerStoppingReason();
        this.dealer.updateFinalScore();
        break;
      } else {
        this.messages.displayDealerContinueReason();
        this.dealer.deal(this.dealer);
        this.dealer.updateScore(this.dealer.getLastDealtCard());
      }
    }
  }

  displayResult() {
    while (true) {
      let answer = readline.question("Confirm accuracy by pressing (y) to continue: ");
      if (answer === 'y') {
        break;
      } else {
        console.log("Please press (y) to confirm.");
      }
    }
    console.clear();
    this.messages.displayFinalScore();
    this.messages.displayUpdatedScoreBoard(this.player.getFinalScore(), this.dealer.getFinalScore());
    if (this.player.getFinalScore() > this.dealer.getFinalScore()) {
      console.log("Player Wins!");
    } else if (this.player.getFinalScore() < this.dealer.getFinalScore()) {
      console.log("Dealer Wins!");
    } else {
      console.log("It's a Tie!");
    }
  }
}

let game = new TwentyOneGame();
game.start();

