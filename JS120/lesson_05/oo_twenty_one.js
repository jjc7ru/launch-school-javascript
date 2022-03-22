class Card {
  constructor(card) {
    this.card = card;
    this.numberOfCards = 4;
  }

  getCard() {
    return this.card;
  }

  getScore() {
    // gets the score of a card
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

  getCardCount() {
    // gets the number of cards left
    return this.numberOfCards;
  }
}

class Deck {
  constructor() {
    this.deck = {};
    this.shuffle();
  }

  shuffle() {
    // creates deck
    const CARDS = ['2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K', 'A'];
    for (let card of CARDS) {
      this.deck[card] = new Card(card);
    }
  }

  getDeck() {
    return this.deck;
  }


  deal() {
    //STUB
    // does the dealer or the deck deal?
  }
}

let d = new Deck();
console.log(d.getDeck()['4'].getCard());










/*
class Participant {
  constructor() {
    //STUB
    // What sort of state does a participant need?
    // Score? Hand? Amount of money available?
    // What else goes here? all the redundant behaviors from Player and Dealer?
  }
}

class Player extends Participant {
  constructor() {
    //STUB
    // What sort of state does a player need?
    // Score? Hand? Amount of money available?
  }

  hit() {
    //STUB
  }

  stay() {
    //STUB
  }

  isBusted() {
    //STUB
  }

  score() {
    //STUB
  }
}

class Dealer extends Participant {
  // Very similar to a Player; do we need this?

  constructor() {
    //STUB
    // What sort of state does a dealer need?
    // Score? Hand? Deck of cards? Bow tie?
  }

  hit() {
    //STUB
  }

  stay() {
    //STUB
  }

  isBusted() {
    //STUB
  }

  score() {
    //STUB
  }

  hide() {
    //STUB
  }

  reveal() {
    //STUB
  }

  deal() {
    //STUB
    // does the dealer or the deck deal?
  }
}

class MessageCenter {

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
    this.messages = new MessageCenter();
  }

  start() {
    //SPIKE
    this.displayWelcomeMessage();
    this.dealCards();
    this.showCards();
    this.playerTurn();
    this.dealerTurn();
    this.displayResult();
    this.displayGoodbyeMessage();
  }

  dealCards() {
    //STUB
  }

  showCards() {
    //STUB
  }

  playerTurn() {
    //STUB
  }

  dealerTurn() {
    //STUB
  }

  

  displayResult() {
    //STUB
  }
}

let game = new TwentyOneGame();
game.start();
*/
