/* Game of 21 */


// Used to get response through the console
const readline = require('readline-sync');

let deck = {
  A: 10,
  2: 10,
  3: 4,
  4: 4,
  5: 4,
  6: 4,
  7: 4,
  8: 4,
  9: 4,
  J: 4,
  Q: 4,
  K: 4,
};

let points = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  J: 10,
  Q: 10,
  K: 10,
};

// Chooses random card from the deck and subtract count appropriately
function chooseRandomCard(deck) {
  if (Object.keys(deck).length === 0) {
    prompt("No more cards in the deck");
    return [];
  }
  let cards = Object.keys(deck);
  let index = Math.floor(Math.random() * cards.length);
  let card = cards[index];
  deck[card]--;
  if (deck[card] === 0) {
    delete deck[card];
  }
  return [card];
}


// Deals four cards total - initiates the game
// Deals two to player and two to dealer
function dealCards(deck) {
  const CARD_NUMBER = 4;
  let playerCards = [];
  let dealerCards = [];
  let dealToPlayer = false;

  for (let _ = 0; _ < CARD_NUMBER; _++) {
    let card = chooseRandomCard(deck);
    if (dealToPlayer) {
      playerCards.push(card[0]);
      dealToPlayer = false;
    } else {
      dealerCards.push(card[0]);
      dealToPlayer = true;
    }
  }
  return [playerCards, dealerCards];
}


// Used to output message
function prompt(message) {
  console.log(message);
}


// Prints the array to a read friendly format to the console.
function arrayToMessage(array, sep) {
  let message = '';
  if (array.length === 2) {
    return `${array[0]} ${sep} ${array[1]}`;
  } else {
    for (let idx = 0; idx < array.length; idx++) {
      if (idx !== array.length - 1) {
        message += String(array[idx]) + ', ';
      } else {
        message += sep + ' ' + String(array[idx]);
      }
    }
  }
  return message;
}


// Calculates the total if both cards are Aces or has no Aces.
function calcTotal(cards) {
  if (cards[0] === 'A' && cards[1] === 'A') {
    return [12];
  }
  let sum = cards.reduce((prev, curr) => {
    prev += Number(points[curr]);
    return prev;
  }, 0);
  return [sum];
}


// Filters the cards array to make sure that any total over 21 is not included
function filterTotal(total) {
  let [first, second] = total;
  if (first <= 21 && second <= 21) {
    return total;
  } else if (first <= 21 && !second <= 21) {
    return [first];
  }
  return [second];
}


// Calculates the total if one card in an Ace
function calcTotalOneAce(cards) {
  const ACE_VALUES = [1, 11];
  if (cards[0] === 'A') {
    return [ACE_VALUES[0] + points[cards[1]], ACE_VALUES[1] + points[cards[1]]];
  }
  return [ACE_VALUES[0] + points[cards[0]], ACE_VALUES[1] + points[cards[0]]];
}


// Show Total
function displayTotal(total) {
  if (total.length === 1) {
    return total;
  }
  return arrayToMessage(total, 'or');
}


// Add Card and recalculate the total
function addCardRecalcTotal(total, card) {
  const ACE_VALUES = [1, 11];

  if (total.length === 1 && card[0] === 'A') {
    return [ACE_VALUES[0] + total[0], ACE_VALUES[1] + total[0]];
  } else if (total.length === 1 && card[0] !== 'A') {
    return [total[0] + points[card[0]]];
  } else if (total.length > 1 && card[0] === 'A') {
    return [total[0] + ACE_VALUES[0], total[0] + ACE_VALUES[1],
      total[1] + ACE_VALUES[0], total[1] + ACE_VALUES[1]];
  } else if (total.length > 1 && card[0] !== 'A') {
    return [total[0] + points[card[0]], total[1] + points[card[0]]];
  }
  return [];
}

// Get final total value in number
function finalTotal(total) {
  if (total.length === 1) {
    return total[0];
  }
  return total[0] > total[1] ? total[0] : total[1];
}

// Function to get initial total value
function getInitialTotal(cards) {
  let total;
  if ((cards[0] === 'A' && cards[1] === 'A') ||
      (!cards.includes('A'))) {
    total = calcTotal(cards);
  } else {
    total = calcTotalOneAce(cards);
    total = filterTotal(total);
  }
  return total;
}


// deal and calculates the total for dealer and player
function dealAndCalculateTotal(who, cards, total) {
  let card = chooseRandomCard(deck);
  cards.push(card[0]);

  if (who.toLowerCase() === 'dealer') {
    prompt(`Dealer has: ${arrayToMessage(cards, 'and')}`);
  } else {
    prompt(`You have: ${arrayToMessage(cards, 'and')}`);
  }

  total = addCardRecalcTotal(total, card);
  if (total.length > 1) {
    total = filterTotal(total);
  }

  if (who.toLowerCase() === 'dealer') {
    prompt(`Dealers total is ${displayTotal(total)}`);
  } else {
    prompt(`Your total is ${displayTotal(total)}`);
  }

  return total;
}


// checks the winner with player total and dealer total
function checkWinner(playerFinalTotal, dealerFinalTotal) {
  if (dealerFinalTotal > 21) {
    prompt("Dealer Busts. Player Wins!");
    return;
  }

  if (playerFinalTotal < dealerFinalTotal) {
    prompt(`${playerFinalTotal} < ${dealerFinalTotal}; Dealer Wins!`);
  } else if (playerFinalTotal > dealerFinalTotal) {
    prompt(`${playerFinalTotal} > ${dealerFinalTotal}; Player Wins!`);
  } else if (playerFinalTotal === dealerFinalTotal) {
    prompt(`${playerFinalTotal} === ${dealerFinalTotal}; Its a Tie!`);
  }
}


// Main function
function play() {
  prompt("Starting Game\n");

  let [playerCards, dealerCards] = dealCards(deck);
  let playerTotal;
  let playerFinalTotal;
  let dealerTotal;
  let dealerFinalTotal;

  prompt(`Dealer has: ${dealerCards[0]} and an unknown card`);
  prompt(`You have: ${arrayToMessage(playerCards, 'and')}`);

  playerTotal = getInitialTotal(playerCards);
  prompt(`Your total is ${displayTotal(playerTotal)}`);

  prompt(`Please choose: Hit or Stay`);
  let answer = readline.question();
  if (answer === 'stay') {
    if (Math.max(...playerTotal) <= 21) {
      playerFinalTotal = Math.max(...playerTotal);
    } else {
      playerFinalTotal = Math.min(...playerTotal);
    }
  }

  while (answer.toLowerCase() === 'hit') {
    playerTotal = dealAndCalculateTotal('player', playerCards, playerTotal);

    playerFinalTotal = finalTotal(playerTotal);
    if (playerFinalTotal > 21) {
      prompt('Player Busts! Dealer Wins!');
      return;
    }

    prompt(`Please choose: Hit or Stay`);
    answer = readline.question();

    if (answer.toLowerCase() === 'stay') {
      break;
    }
  }

  prompt(`Dealer has: ${arrayToMessage(dealerCards, 'and')}`);
  dealerTotal = getInitialTotal(dealerCards);
  prompt(`Dealer total is ${displayTotal(dealerTotal)}`);

  if (Math.max(...dealerTotal) >= 17 && Math.max(...dealerTotal) <= 21) {
    dealerFinalTotal = Math.max(...dealerTotal);
    checkWinner(playerFinalTotal, dealerFinalTotal);
    return;
  }

  while (dealerTotal[0] < 17) {
    dealerTotal = dealAndCalculateTotal('dealer', dealerCards, dealerTotal);
  }

  dealerFinalTotal = finalTotal(dealerTotal);

  checkWinner(playerFinalTotal, dealerFinalTotal);
}


// Execute
let playing = true;
while (playing) {
  console.clear();
  play();
  prompt("Play Again? Please choose: yes or no");
  let playAgain = readline.question();
  if (playAgain.toLowerCase() === 'no') {
    playing = false;
  }
}


