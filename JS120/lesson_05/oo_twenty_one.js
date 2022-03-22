class Card {
  constructor(card) {
    this.card = card;
    this.numberOfCards = 4;
  }

  getCard() {
    // gets the value of the card
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
    // gets the number of remaining cards
    return this.numberOfCards;
  }
}

class Deck {
  static CARDS = ['2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K', 'A'];

  constructor() {
    this.deck = {};
    this.shuffle();
  }

  shuffle() {
    // creates deck
    for (let card of Deck.CARDS) {
      this.deck[card] = new Card(card);
    }
  }

  getDeck() {
    // gets the deck
    return this.deck;
  }

  availableCards() {
    // gets an array of available cards - it returns the string representation
    // of the card. It DOES NOT return the Card Object.
    return CARDS.filter(card => this.deck[card].getCardCount() > 0);
  }

  deal() {
    // deals a random card object
    let cards = this.availableCards();
    let index = Math.floor(Math.random() * cards.length);
    let selectedCard = cards[index];
    return this.deck[selectedCard];
  }
}

class Participant {
  constructor() {
    this.cards = [];
    this.score = 0;
  }

  hit() {

  }

  stay() {
    //STUB
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
  constructor() {
    // STUB
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

