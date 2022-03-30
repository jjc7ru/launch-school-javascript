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
    // assigns string type numbers to card objects 
    // (ie) {'2': new Card('2'), ... 'A': new Card('A')}
    for (let card of Deck.CARDS) {
      this.cards[card] = new Card(card);
    }
  }

  shuffle() {
    // creates 52 card deck with each cards having 4 cards
    // (ie) {'2': 4, ... 'A': 4}
    const NUMBER_OF_CARDS_PER_CARD = 4;
    for (let card of Deck.CARDS) {
      this.deck[card] = NUMBER_OF_CARDS_PER_CARD;
    }
  }

  getCards() {
    // gets the cards mapper
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
    if (cards.length === 0) {
      MessageCenter.outOfCards();
      this.shuffle();
      cards = this.availableCards();
    }
    let index = Math.floor(Math.random() * cards.length);
    let selectedCard = cards[index];
    this.deck[selectedCard] -= 1;
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
    // Logic: 
    // > If both values in this.score is less than 21 after updateScore() keep both.
    // > If one of the values are greater than 21, remove that number and duplicate the first value (ie4)
    // > If both values are greater than 21, keep both (ie5, ie6)
    // (ie1) this.score = [0, 0] --> updateScore(new Card('5')) --> this.score = [5, 5]
    // (ie2) this.score = [0, 0] --> updateScore(new Card('A')) --> this.score = [1, 11]
    // (ie3) this.score = [4, 14] --> updateScore(new Card('A')) --> this.score = [5, 15]
    // (ie4) this.score = [20, 30] --> updateScore(new Card('A')) --> this.score = [21, 21]
    // (ie5) this.score = [21, 31] --> updateScore(new Card('5')) --> this.score = [26, 36]
    // (ie6) this.score = [21, 31] --> updateScore(new Card('A')) --> this.score = [22, 32]
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
    // returns the higher of the two value (if different, else returns one) 
    // (ie) this.score = [1, 11] ---> getScore() ---> [11]
    // (ie) this.score = [15, 15] ---> getScore() ---> [15]
    if (this.score[1] > this.score[0]) {
      return [this.score[1]];
    }
    return [this.score[0]];
  }

  busts() {
    // Checks to see if the participant busts
    // (ie) this.score = [5, 5] --> busts() --> false
    if (this.score[0] > 21 && this.score[1] > 21 || this.score.length === 0) {
      return true;
    }
    return false;
  }

  getLastDealtCard() {
    // returns the last dealt card
    // (ie) this.hand = ['A', '2', '5'] --> '5'
    return this.hand[this.hand.length - 1];
  }

  updateFinalScore() {
    // updates the final score
    // (ie) this.score = [5, 5] --> updateFinalScore() --> [5]
    // (ie) this.score = [5, 15] --> updateFinalScore() --> [15]
    // (ie) this.score = [22, 32] --> updateFinalScore() --> [22]
    if (this.score[0] <= 21 && this.score[1] <= 21) {
      this.finalScore = this.getHigherScore(this.score);
    } else if (this.score[0] <= 21 && this.score[1] > 21) {
      this.finalScore = [this.score[0]];
    } else if (this.score[0] > 21 && this.score[0] <= 21) {
      this.finalScore = [this.score[1]];
    } else {
      this.finalScore = [this.score[0]];
    }
  }

  getFinalScore() {
    // returns the final score
    return this.finalScore;
  }

  reset() {
    // resets the constructor to its original state
    this.hand = [];
    this.score = [0, 0];
    this.finalScore = [];
  }
}

class Player extends Participant {
  constructor() {
    super();
    this.chips = 5;
  }

  getInitialHand() {
    // Initial hand always contain two cards for player
    return this.hand[0] + ' and ' + this.hand[1];
  }

  incrementChips() {
    // Increments the chip count
    this.chips += 1;
  }

  decrementChips() {
    // Decrements the chip count
    this.chips -= 1;
  }

  isBroke() {
    // Player is broke or not
    return this.chips < 1;
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
    // Reveals the hand by logging this.hand to the console.
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
    playerScore = this.displayOnScoreBoardScore(playerScore);
    let player = `Your score is: ${playerScore}`;
    let dealer = "Dealer's score is: N/A";
    this.createScoreBoard(player, dealer);
  }

  updatedScoreBoard(playerScore, dealerScore) {
    dealerScore = this.displayOnScoreBoardScore(dealerScore);
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

  displayOnScoreBoardScore(score) {
    // returns a string version of score to be displayed on scoreboard
    // (ie) displayOnScoreBoardScore([5, 5]) --> '5'
    // (ie) displayOnScoreBoardScore([1, 11]) --> '1 or 11'
    // (ie) displayOnScoreBoardScore([2, 22]) --> '2'
    // (ie) displayOnScoreBoardScore([22, 32]) --> '22 or 32'
    if (score[0] === score[1]) {
      return MessageCenter.prettyPrint([score[0]]);
    } else if (score[0] > 21 && score[1] <= 21) {
      return MessageCenter.prettyPrint([score[1]]);
    } else if (score[1] > 21 && score[0] <= 21) {
      return MessageCenter.prettyPrint([score[0]]);
    }
    return MessageCenter.prettyPrint(score, '', 'or');
  }
}

class MessageCenter {
  constructor() {
    this.scoreboard = new ScoreBoard();
  }

  static displayWelcomeMessage() {
    console.log("Welcome to the game of Twenty-One!");
  }

  static displayGoodbyeMessage() {
    console.log("Thank you for playing. Goodbye!");
  }

  static displayInitialCards(player, dealer) {
    console.log(`Your Cards: ${player.getInitialHand()}`);
    console.log(`Dealer Cards: ${dealer.getInitialHand()}`);
  }

  static displayCards(player, dealer) {
    console.log(`Your Cards: ${MessageCenter.prettyPrint(player.hand, ',', 'and')}`);
    if (dealer.hidden) {
      console.log(`Dealer Cards: ${dealer.getInitialHand()}`);
    } else {
      console.log(`Dealer Cards: ${dealer.revealHand()}`);
    }
  }

  static displayDealerCards(dealer) {
    console.log('');
    if (dealer.hidden) {
      console.log(`Dealer Cards: ${dealer.getInitialHand()}`);
    } else {
      console.log(`Dealer Cards: ${dealer.revealHand()}`);
    }
  }

  displayInitialScoreBoard(playerScore) {
    this.scoreboard.initialScoreBoard(playerScore);
  }

  displayUpdatedScoreBoard(playerScore, dealerScore) {
    this.scoreboard.updatedScoreBoard(playerScore, dealerScore);
  }

  static displayDealerContinueReason() {
    console.log("Dealer's cards are less than 17. Hitting ...");
  }

  static displayDealerStoppingReason() {
    console.log("Dealer's cards are greater than or equal to 17. Staying ...");
  }

  static displayPlayerTurn() {
    console.log("+---------------+");
    console.log("| PLAYER'S TURN |");
    console.log("+---------------+");
  }

  static displayDealerTurn() {
    console.log("+---------------+");
    console.log("| DEALER'S TURN |");
    console.log("+---------------+");
  }

  static displayFinalScore() {
    console.log("+-------------+");
    console.log("| FINAL SCORE |");
    console.log("+-------------+");
  }

  static displayEmptyLines(newlines=4) {
    process.stdout.write('\n'.repeat(newlines));
  } 

  static displayChips(player) {
    console.log(`You have ${player.chips} chips.`);
  }

  static outOfCards() {
    console.log("Out of cards. Reshuffling ...");
  }

  static pressReturnToContinue() {
    readline.question("Press return to continue ...");
  }

  static brokeMessage() {
    console.log("You're broke! Stopping game ...");
  }

  static playerBustMessage() {
    console.log(">>> You bust! <<<")
  }

  static dealerBustMessage() {
    console.log(">>> Dealer busts! <<<");
  }

  static dealerBustMessage() {
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
    let play = true;
    let first = true;
    while (play) {
      console.clear();
      if (first) {
        MessageCenter.displayWelcomeMessage();
      } else {
        MessageCenter.displayEmptyLines(1);
      }

      MessageCenter.displayPlayerTurn();
      this.dealCards();
      MessageCenter.displayEmptyLines(1);
      MessageCenter.displayInitialCards(this.player, this.dealer);
      MessageCenter.displayEmptyLines(1);
      this.messages.displayInitialScoreBoard(this.player.getScore());
      MessageCenter.displayEmptyLines(1);
      MessageCenter.displayChips(this.player);
      MessageCenter.displayEmptyLines(1);
      this.playerTurn();
      if (this.player.busts()) {
        this.playerBusts();
        if (this.player.isBroke()) {
          play = false;
          MessageCenter.brokeMessage();
          break;
        }
        play = this.playAgain();
        first = false;
        continue;
      }

      this.dealerTurn();
      if (this.dealer.busts()) {
        this.dealerBusts();
        play = this.playAgain();
        first = false;
        continue;
      }
      this.displayResult();
      this.player.reset();
      this.dealer.reset();
      this.dealer.hide();
      play = this.playAgain();
      first = false;
    }
    MessageCenter.displayGoodbyeMessage();
  }

  playerBusts() {
    console.clear();
    MessageCenter.displayEmptyLines(3);
    MessageCenter.playerBustMessage();
    this.dealer.reveal();
    MessageCenter.displayEmptyLines(1);
    MessageCenter.displayCards(this.player, this.dealer);
    this.player.updateFinalScore();
    MessageCenter.displayEmptyLines(1);
    this.messages.displayUpdatedScoreBoard(this.player.getFinalScore(), this.dealer.getScore());
    MessageCenter.displayEmptyLines(1);
    this.player.reset();
    this.dealer.reset();
    this.player.decrementChips();
    MessageCenter.displayChips(this.player);
    MessageCenter.displayEmptyLines(1);
  }

  dealerBusts() {
    console.clear();
    MessageCenter.displayEmptyLines(3);
    MessageCenter.dealerBustMessage();
    MessageCenter.displayEmptyLines(1);
    MessageCenter.displayCards(this.player, this.dealer);
    this.dealer.updateFinalScore();
    MessageCenter.displayEmptyLines(1);
    this.messages.displayUpdatedScoreBoard(this.player.getFinalScore(), this.dealer.getFinalScore());
    MessageCenter.displayEmptyLines(1);

    this.player.reset();
    this.dealer.reset();
    this.dealer.hide();
    this.player.incrementChips();
    MessageCenter.displayChips(this.player);
    MessageCenter.displayEmptyLines(1);
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
        this.dealer.hide();
        console.clear();
        MessageCenter.displayEmptyLines(1);
        MessageCenter.displayPlayerTurn();
        this.dealer.deal(this.player);
        this.player.updateScore(this.player.getLastDealtCard());
        MessageCenter.displayEmptyLines(1);
        MessageCenter.displayCards(this.player, this.dealer);
        MessageCenter.displayEmptyLines(1);
        this.messages.displayInitialScoreBoard(this.player.getScore());
        MessageCenter.displayEmptyLines(1);
        if (this.player.busts()) {
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
    let first = true;
    console.clear();
    MessageCenter.displayEmptyLines(1)
    MessageCenter.displayDealerTurn()
    this.dealer.reveal();
    while (true) {
      if (!first) {MessageCenter.displayEmptyLines(4)};
      MessageCenter.displayEmptyLines(1);
      MessageCenter.displayCards(this.player, this.dealer);
      MessageCenter.displayEmptyLines(1);
      this.messages.displayUpdatedScoreBoard(this.player.getFinalScore(), this.dealer.getScore());
      MessageCenter.displayEmptyLines(1);

      if (this.dealer.busts()) {
        break;
      }

      if ((this.dealer.getScore()[0] >= 17 && this.dealer.getScore()[0] <= 21) || 
          (this.dealer.getScore()[1] >= 17 && this.dealer.getScore()[1] <= 21)) {

        console.log("dealer score: ", this.dealer.getScore());
        console.log("dealer final score: ", this.dealer.getFinalScore());
        this.dealer.updateFinalScore();
        MessageCenter.displayDealerStoppingReason();
        break;
      } else {
        MessageCenter.displayDealerContinueReason();
        this.dealer.deal(this.dealer);
        this.dealer.updateScore(this.dealer.getLastDealtCard());
      }
      MessageCenter.pressReturnToContinue();
      console.clear();
      first = false;
    }
  }

  displayResult() {
    console.clear();
    MessageCenter.displayEmptyLines(1);
    MessageCenter.displayFinalScore();
    MessageCenter.displayEmptyLines(1);
    MessageCenter.displayCards(this.player, this.dealer);
    MessageCenter.displayEmptyLines(1);
    this.messages.displayUpdatedScoreBoard(this.player.getFinalScore(), this.dealer.getFinalScore());
    MessageCenter.displayEmptyLines(1);
    if (this.player.getFinalScore() > this.dealer.getFinalScore()) {
      console.log("Player Wins!");
      this.player.incrementChips();
      MessageCenter.displayChips(this.player);
      MessageCenter.displayEmptyLines(1);
    } else if (this.player.getFinalScore() < this.dealer.getFinalScore()) {
      console.log("Dealer Wins!");
      this.player.decrementChips();
      MessageCenter.displayChips(this.player);
      MessageCenter.displayEmptyLines(1);
    } else {
      console.log("It's a Tie!");
      MessageCenter.displayChips(this.player);
      MessageCenter.displayEmptyLines(1);
    }
  }

  playAgain() {
    while (true) {
      let again = readline.question("Play again (y/n)? ");
      if (again === 'y') {
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

