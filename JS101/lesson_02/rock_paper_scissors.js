// Read required libraries
const readline = require('readline-sync');
const CHOICES = {
  r: 'rock',
  p: 'paper',
  sc: 'scissor',
  sp: 'spock',
  l: 'lizard',
};

function prompt(message) {
  console.log(`=> ${message}`);
}

function playerWins(usrChoice, compChoice) {
  prompt(`Player: ${userChoice}, Computer: ${computerChoice}`);
  if ((usrChoice === 'scissor' && compChoice === 'paper') ||
      (usrChoice === 'paper' && compChoice === 'rock') ||
      (usrChoice === 'rock' && compChoice === 'lizard') ||
      (usrChoice === 'lizard' && compChoice === 'spock') ||
      (usrChoice === 'spock' && compChoice === 'scissor') ||
      (userChoice === 'lizard' && compChoice === 'paper') ||
      (usrChoice === 'paper' && compChoice === 'spock') ||
      (usrChoice === 'spock' && compChoice === 'rock') ||
      (usrChoice === 'rock' && compChoice === 'scissor')) {
    playerWins += 1;
    prompt('Player wins!');
  } else if (usrChoice === compChoice) {
    prompt("It's a tie!");
  } else {
    prompt('Computer wins!');
  }
}

prompt(`Welcome to the game of ${Object.values(CHOICES).join(', ')}`);

let playerWins = 0;
let computerWins = 0;

while (playerWins < 3 && computerWins < 3) {

  prompt(`Please choose from ${Object.keys(CHOICES).join(', ')}`);
  let userChoice = readline.question();
  while (!Object.keys(CHOICES).includes(userChoice)) {
    prompt("That is an invalid choice. Please try again.");
    userChoice = readline.question();
  }

  let computerSimplifiedChoice = ['r', 'p', 'sc', 'sp', 'l'];
  let computerIndex = Math.floor(Math.random() * Object.keys(CHOICES).length);
  let computerChoice = CHOICES[computerSimplifiedChoice[computerIndex]];

  /* RULES:
   * (1) Scissor beats Paper
   * (2) Paper beats Rock
   * (3) Rock beats Lizard
   * (4) Lizard beats Spock
   * (5) Spock beats Scissor
   * (6) Lizard beats Paper
   * (7) Paper beats Spock
   * (8) Spock beats Rock
   * (9) Rock beats scissor
   * */

  userChoice = CHOICES[userChoice];

  prompt(`Player: ${userChoice}, Computer: ${computerChoice}`);
  if ((userChoice === 'scissor' && computerChoice === 'paper') ||
      (userChoice === 'paper' && computerChoice === 'rock') ||
      (userChoice === 'rock' && computerChoice === 'lizard') ||
      (userChoice === 'lizard' && computerChoice === 'spock') ||
      (userChoice === 'spock' && computerChoice === 'scissor') ||
      (userChoice === 'lizard' && computerChoice === 'paper') ||
      (userChoice === 'paper' && computerChoice === 'spock') ||
      (userChoice === 'spock' && computerChoice === 'rock') ||
      (userChoice === 'rock' && computerChoice === 'scissor')) {
    playerWins += 1;
    prompt('Player wins!');
  } else if ((computerChoice === 'scissor' && userChoice === 'paper') ||
      (computerChoice === 'paper' && userChoice === 'rock') ||
      (computerChoice === 'rock' && userChoice === 'lizard') ||
      (computerChoice === 'lizard' && userChoice === 'spock') ||
      (computerChoice === 'spock' && userChoice === 'scissor') ||
      (computerChoice === 'lizard' && userChoice === 'paper') ||
      (computerChoice === 'paper' && userChoice === 'spock') ||
      (computerChoice === 'spock' && userChoice === 'rock') ||
      (computerChoice === 'rock' && userChoice === 'scissor')) {
    computerWins += 1;
    prompt('Computer wins!');
  } else {
    prompt("It's a tie!");
  }
}

if (playerWins === 3) {
  console.log("Player wins best out of 5!");
} else {
  console.log("Computer wins best out of 5!");
}
