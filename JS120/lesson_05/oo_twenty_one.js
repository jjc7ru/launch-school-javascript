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
  static CARDS = ['2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K', 'A'];

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
  }

  updateScore(card) {
    // Updates the score with the given card object
    // (ie) updateScore(new Card('5')) --> this.score = [5, 5]
    // (ie) updateScore(new Card('A')) --> this.score = [1, 11]
    let cardScore = card.getScore();
    if (cardScore.length === 1) {
      this.score[0] += cardScore[0];
      this.score[1] += cardScore[0];
    } else {
      this.score[0] += cardScore[0];
      this.score[1] += cardScore[1];
    }
  }

  isBusted() {
    // if both scores are greater than 21, return true else false
    return this.score[0] > 21 && this.score[1] > 21;
  }

  prettyPrint(arr, delimeter='', conjunction='') {
    let output = '';
    if (arr.length === 1) {
      return arr[0];
    } else if (arr.length === 2) {
      return arr[0] + ' ' + conjunction + ' ' + arr[1];
    }

    for (let idx = 0; idx < this.hand.length; idx++) {
      if (idx === arr.length - 1) {
        output += conjunction + ' ' + arr[idx];
      } else {
        output += arr[idx] + delimeter + ' ';
      }
    }
    return output;
  }

  getScore() {
    // returns the raw score
    // (ie) [5, 15]
    return this.score;
  }

  getHigherScore() {
    // returns the higher of the two value (if different else returns one) 
    // from the current score
    // (ie) this.score = [1, 11] ---> getScore() ---> 11
    // (ie) this.score = [15, 15] ---> getScore() ---> 15
    if (this.score[1] > this.score[0]) {
      return this.score[1];
    }
    return this.score[0];

  }

  getCleanScore() {
    // returns a cleaned version of this.score
    // (ie) Card is 5: this.score = [5, 5] --> getCleanScore() --> [5]
    // (ie) Card is A: this.score = [1, 11] --> getCleanScore() --> [1, 11]
    if (this.score[0] === this.score[1]) {
      return this.prettyPrint([this.score[0]]);
    }
    return this.prettyPrint(this.score, '', 'or');
  }

  getLastDealtCard() {
    // returns the last dealt card
    // (ie) this.hand = ['A', '2', '5'] --> '5'
    return this.hand[this.hand.length - 1];
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
  }

  deal(participant) {
    participant.hand.push(this.deck.deal());
  }

  getInitialHand() {
    // Initial hand always contain two cards where one is hidden
    return this.hand[0] + ' and a hidden card.';
  }

  hide() {
    //STUB
  }

  reveal() {
    //STUB
  }
}

class StaticMessageCenter {

  displayWelcomeMessage() {
    console.log("Welcome to the game of Twenty-One!");
  }

  displayGoodbyeMessage() {
    console.log("Thank you for playing. Goodbye!");
  }
}

class TwentyOneGame {
  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
    this.messages = new StaticMessageCenter();
  }

  start() {
    this.messages.displayWelcomeMessage();
    this.dealCards();
    this.showInitialCards();
    this.playerTurn();
    //this.dealerTurn();
    //this.displayResult();
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

  showInitialCards() {
    console.log(`Your Cards: ${this.player.getInitialHand()}`);
    console.log(`Dealer Cards: ${this.dealer.getInitialHand()}`);
    console.log(`Your Score: ${this.player.getCleanScore()}`);
  }

  playerTurn() {
    while (true) {
      let hit = readline.question("Hit (y/n)? ");
      if (hit === 'y') {
        this.dealer.deal(this.player);
        this.player.updateScore(this.player.getLastDealtCard());
        console.log(`Your cards are: ${this.player.prettyPrint(this.player.hand, ',', 'and')}`);
        console.log(`Your current score: ${this.player.getCleanScore()}`);
        if (this.player.isBusted()) {
          console.log("You bust!");
          break;
        }
      } else if (hit === 'n') {
        console.log("Your score: " + this.player.getScore());
        break
      } else {
        console.log("Invalid input. Please choose between (y/n).");
      }
    }
  }

  dealerTurn() {
  }

  displayResult() {
    //STUB
  }
}

let game = new TwentyOneGame();
game.start();

