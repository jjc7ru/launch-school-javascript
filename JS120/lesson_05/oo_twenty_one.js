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
  }

  updateScore(card) {
    // Converts the Card object and updates this.score
    // (ie) updateScore(new Card('5')) --> this.score = [5, 5]
    // (ie) updateScore(new Card('A')) --> this.score = [1, 11]
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
    return this.hand[0] + ' and ' + this.hand[1];
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
    console.log(`Dealer Cards: ${dealer.getInitialHand()}`);
  }

  displayInitialScoreBoard(playerScore) {
    console.log('');
    this.scoreboard.initialScoreBoard(playerScore);
    console.log('');
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

  /*
  displayScoreBoard(player, dealer) {
    let playerScore = player.getCleanScore();
    let dealerScore = dealer.getCleanScore();
    let playerText = `Your score is: ${playerScore}`;
    let dealerInitialText = "Dealer's score is: N/A";
    let dealerText = `Dealer's score is: ${dealerScore}`;
    let textInitialLength = Math.max(playerText.length, dealerInitialText.length);
    let textLength = Math.max(playerText.length, dealerText.length);
    let difference;

    if (dealer.hidden) {
      if (playerText.length > dealerInitialText.length) {
        difference = playerText.length - dealerInitialText.length;
        dealerInitialText += ' '.repeat(difference);
      } else {
        difference = dealerInitialText.length - playerText.length;
        playerText += ' '.repeat(difference);
      }
      console.log('+' + '-'.repeat(textInitialLength + 2) + '+');
      console.log('| ' + playerText + ' |');
      console.log('| ' + dealerInitialText + ' |');
      console.log('+' + '-'.repeat(textInitialLength + 2) + '+');
    } else {
      if (playerText.length > dealerText.length) {
        difference = playerText.length - dealerText.length;
        dealerText += ' '.repeat(difference)
      } else {
        difference = dealerText.length - playerText.length;
        playerText += ' '.repeat(difference);
      }
      console.log('+' + '-'.repeat(textLength + 2) + '+');
      console.log('| ' + playerText + ' |');
      console.log('| ' + dealerText + ' |');
      console.log('+' + '-'.repeat(textLength + 2) + '+');
    }
  }
  */
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
    this.dealCards();
    this.messages.displayInitialCards(this.player, this.dealer);
    this.messages.displayInitialScoreBoard(this.player.getScore());
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

  playerTurn() {
    while (true) {
      let hit = readline.question("Hit (y/n)? ");
      if (hit === 'y') {
        console.clear();
        console.log('');
        this.dealer.deal(this.player);
        this.player.updateScore(this.player.getLastDealtCard());
        this.messages.displayCards(this.player, this.dealer);
        this.messages.displayInitialScoreBoard(this.player.getScore());
        if (this.player.isBusted()) {
          console.log("You bust!");
          break;
        }
      } else if (hit === 'n') {
        break
      } else {
        console.log("Invalid input. Please choose between (y/n).");
      }
    }
  }

  /*
  dealerTurn() {
    console.log("Dealer reveals hand");
    this.dealer.reveal();
    console.log(`Dealer cards: ${this.dealer.revealHand()}`);
    while (true) {
      if (this.dealer.getScore()[0] >= 17 || this.dealer.getScore()[1] >= 17) {
        this.messages.displayScoreBoard(this.player, this.dealer);
        console.log("Dealer's score is greater than or equal to 17. Stopping ...");
        break;
      } else {
        this.messages.displayScoreBoard(this.player, this.dealer, false);
        console.log("Dealer's score is less than 17. Hitting ...");
        console.log("");
        this.dealer.deal(this.dealer);
        this.dealer.updateScore(this.dealer.getLastDealtCard());
        console.log(`Dealer's cards are: ${this.dealer.prettyPrint(this.dealer.hand, ',', 'and')}`);
      }
    }
    
    if (this.dealer.isBusted()) {
      this.messages.displayScoreBoard(this.player, this.dealer, false);
      console.log("Dealer busts!");
    }

    console.log("");
    console.log("Final Score:");
    this.messages.displayScoreBoard(this.player, this.dealer, false);
    //console.log(`Dealer's current score: ${this.dealer.getCleanScore()}`);
  }

  displayResult() {
    //STUB
  }
  */
}

let game = new TwentyOneGame();
game.start();

