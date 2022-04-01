const readline = require('readline-sync');

class Card {
  constructor(card, suit) {
    this.card = card;
    this.suit = suit; 
  }

  getCard() {
    return this.card;
  }

  toString() {
    return this.card + ' of ' + this.suit;
  }
}

class Deck {
  static suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
  static cards = ['2', '3', '4', '5', '6', '7', '8', '9', 
                  'Jack', 'Queen', 'King', 'Ace'];

  constructor() {
    this.deck = [];
    this.createDeck();
    this.shuffleDeck();
  }

  createDeck() {
    for (let card of Deck.cards) {
      for (let suit of Deck.suits) {
        this.deck.push(new Card(card, suit));
      }
    }
  }

  shuffleDeck() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  deal() {
    if (this.deck.length < 1) {
      console.log("Out of cards. Reshuffling ...");
      readline.question("Press Return to continue");
      console.clear();
      this.createDeck();
      this.shuffleDeck();
    }
    return this.deck.pop();
  }
}

class Participant {
  static TARGET_SCORE = 21;

  constructor() {
    this.hand = [];
    this.score = 0;
  }

  calculateScore() {
    let cards = this.hand.map(card => card.getCard());
    let total = 0;

    for (let card of cards) {
      if (card === 'Ace') {
        total += 11;
      } else if (['Jack', 'Queen', 'King'].includes(card)) {
        total += 10;
      } else {
        total += Number(card);
      }
    }

    for (let _ of cards.filter(card => card === 'Ace')) {
      if (total > Participant.TARGET_SCORE) {
        total -= 10;
      }
    }

    this.score = total;
  }

  busts() {
    return this.score > Participant.TARGET_SCORE;
  }

  getScore() {
    return this.score;
  }

  reset() {
    this.hand = [];
    this.score = 0;
  }

  getHand() {
    let hand = [];
    for (let card of this.hand) {
      hand.push(card.toString());
    }
    return hand;
  }
}

class Player extends Participant {
  static TARGET_CHIPS = 10;

  constructor() {
    super();
    this.chips = 5;
  }

  incrementChips() {
    this.chips += 1;
  }

  decrementChips() {
    this.chips -= 1;
  }

  showChips() {
    Helper.prompt(`Your chip count: ${this.chips}`);
    console.log('');
  }

  isBroke() {
    return this.chips < 1;
  }

  metTarget() {
    return this.chips === Player.TARGET_CHIPS;
  }
}

class Dealer extends Participant {
  constructor() {
    super();
    this.deck = new Deck();
    this.hidden = true;
  }

  deal(participant) {
    participant.hand.push(this.deck.deal());
  }

  getInitialHand() {
    return [this.hand[0].toString(), 'HIDDEN'];
  }
  
  revealHand() {
    return Helper.joinOr(this.hand, ',', 'and');
  }

  hide() {
    this.hidden = true;
  }

  reveal() {
    this.hidden = false;
  }
}

class ScoreBoard {
  static createScoreBoard(playerText, dealerText) {
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
}

class Helper {
  static joinOr(arr, delimeter = '', conjunction = '') {
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

  static newLineMessage(arr) {
    for (let idx = 0; idx < arr.length; idx++) {
      Helper.prompt(arr[idx]);
    }
  }

  static prompt(message) {
    console.log("> " + message);
  }
}

class TwentyOneGame {
  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
  }

  start() {
    let play = true;
    console.clear();
    this.displayWelcomeMessage();
    while (play) {
      this.intro();
      let winner = this.winner();
      if (winner) {
        this.player.showChips();
        this.displayWinner(winner);
        play = this.playAgain();
        continue;
      }
      this.displayResult();
      play = this.playAgain();
    }
    this.displayGoodbyeMessage();
  }

  intro() {
    this.dealCards();
    this.displayInitialCards();
    this.calculateScore();
    this.displayInitialScoreBoard();
    this.player.showChips();
  }

  winner() {
    let winner;
    this.playerTurn();
    if (this.playerBusts()) {
      console.clear();
      this.dealer.reveal();
      this.displayCards();
      this.displayUpdatedScoreBoard();
      this.player.decrementChips();
      winner = 'Dealer';
      return winner;
    }
    console.clear();
    this.dealerTurn();
    if (this.dealerBusts()) {
      this.player.incrementChips();
      winner = 'Player';
    }
    return winner;
  }

  busts(participant) {
    return participant.busts();
  }

  playerBusts() {
    return this.busts(this.player);
  }

  dealerBusts() {
    return this.busts(this.dealer);
  }

  displayWinner(winner) {
    if (winner === 'Player') {
      Helper.prompt('Dealer busts!');
      Helper.prompt('Player wins!');
      console.log('');
    } else if (winner === 'Dealer') {
      Helper.prompt('Player busts!');
      Helper.prompt('Dealer wins!');
      console.log('');
    }
  }
 
  displayWelcomeMessage() {
    console.log("Welcome to the game of Twenty-One!");
    console.log('');
  }

  dealCards() {
    this.dealer.deal(this.player);
    this.dealer.deal(this.dealer);
    this.dealer.deal(this.player);
    this.dealer.deal(this.dealer);
  }

  displayInitialCards() {
    console.log('Your Cards:');
    console.log('-----------');
    Helper.newLineMessage(this.player.getHand());
    console.log('');
    console.log('Dealer Cards:')
    console.log('-----------');
    Helper.newLineMessage(this.dealer.getInitialHand());
    console.log('');
  }

  displayCards() {
    console.log('');
    console.log('');
    console.log('Your Cards:');
    console.log('-----------');
    Helper.newLineMessage(this.player.getHand());
    console.log('');
    console.log('Dealer Cards:');
    console.log('-----------');
    if (this.dealer.hidden) {
      Helper.newLineMessage(this.dealer.getInitialHand());
      console.log('');
    } else {
      Helper.newLineMessage(this.dealer.getHand());
      console.log('');
    }
  }

  displayInitialScoreBoard() {
    let player = `Your score is: ${this.player.score}`;
    let dealer = "Dealer's score is: N/A";
    ScoreBoard.createScoreBoard(player, dealer);
    console.log('');
  }

  displayUpdatedScoreBoard() {
    let player = `Your score is: ${this.player.score}`;
    let dealer = `Dealer's score is: ${this.dealer.score}`;
    ScoreBoard.createScoreBoard(player, dealer);
    console.log('');
  }

  displayGoodbyeMessage() {
    console.log("Thank you for playing. Goodbye!");
  }

  calculateScore() {
    this.player.calculateScore();
    this.dealer.calculateScore();
  }

  playerTurn() {
    while (true) {
      let hit = readline.question("(h)it or (s)tay? ");
      if (['H', 'h'].includes(hit)) {
        console.clear();
        this.dealer.deal(this.player);
        this.player.calculateScore();
        this.displayCards();
        this.displayInitialScoreBoard();
        this.player.showChips();
        if (this.player.busts()) {
          break;
        }
      } else if (['S', 's'].includes(hit)) {
        this.player.showChips();
        break;
      } else {
        console.log("Invalid input. Please choose between (h)it or (s)tay.");
      }
    }
  }

  dealerTurn() {
    this.dealer.reveal();
    while (true) {
      this.dealer.revealHand();
      this.displayCards();
      this.displayUpdatedScoreBoard();

      if (this.dealer.busts()) {
        break;
      } else if (this.dealer.getScore() >= 17 && this.dealer.getScore() <= 21) {
        this.player.showChips();
        console.log("Dealer's score is greater than 17 and is less than or equal to 21. Stopping ...");
        console.log('');
        readline.question("Press Return to Continue");
        break;
      } else {
        this.player.showChips();
        console.log("Less than 17. Hitting ... ");
        console.log('');
        this.dealer.deal(this.dealer);
        this.dealer.calculateScore();
      }
      readline.question("Press Return to Continue");
      console.clear();
    }
  }

  displayResult() {
    console.clear();
    this.displayCards();
    this.displayUpdatedScoreBoard();
    if (this.player.getScore() > this.dealer.getScore()) {
      this.player.incrementChips();
      this.player.showChips();
      console.log("Player Wins!");
      console.log('');
    } else if (this.player.getScore() < this.dealer.getScore()) {
      this.player.decrementChips();
      this.player.showChips();
      console.log("Dealer Wins!");
      console.log('');
    } else {
      this.player.showChips();
      console.log("It's a Tie!");
      console.log('');
    }
  }

  playAgain() {
    if (this.player.isBroke()) {
      console.log("You're broke! Stopping game ...");
      console.log('');
      return false;
    }

    if (this.player.metTarget()) {
      console.log("You've met your chip target! Stopping game ...");
      console.log('');
      return false;
    }

    while (true) {
      let again = readline.question("Play again (y/n)? ");
      if (again === 'y') {
        this.player.reset();
        this.dealer.reset();
        this.dealer.hide();
        console.clear();
        console.log('');
        console.log('');
        return true;
      } else if (again === 'n') {
        return false;
      } else {
        console.log("Invalid response. Please choose between (y/n).");
      }
    }
  }
}

let game = new TwentyOneGame();
game.start();

