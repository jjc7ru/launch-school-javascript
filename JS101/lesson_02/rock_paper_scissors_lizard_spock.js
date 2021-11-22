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
  return ((usrChoice === 'scissor' && compChoice === 'paper') ||
         (usrChoice === 'paper' && compChoice === 'rock') ||
         (usrChoice === 'rock' && compChoice === 'lizard') ||
         (usrChoice === 'lizard' && compChoice === 'spock') ||
         (usrChoice === 'spock' && compChoice === 'scissor') ||
         (usrChoice === 'lizard' && compChoice === 'paper') ||
         (usrChoice === 'paper' && compChoice === 'spock') ||
         (usrChoice === 'spock' && compChoice === 'rock') ||
         (usrChoice === 'rock' && compChoice === 'scissor'))
  }

function displayWinner(usrChoice, compChoice) {
  let playerWon = playerWins(usrChoice, compChoice);
  if (playerWon) {
    prompt('Player Wins!');
    numPlayerWins += 1;
  } else if (usrChoice === compChoice) {
    prompt("It's a tie!");
  } else {
    prompt("Computer Wins!");
    numComputerWins += 1;
  }
}

prompt(`Welcome to the game of ${Object.values(CHOICES).join(', ')}`);

let numPlayerWins = 0;
let numComputerWins = 0;


while (numPlayerWins < 3 && numComputerWins < 3) {

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
  displayWinner(userChoice, computerChoice);

  if (playerWins === 3) {
    console.log("Player wins best out of 5!");
  } else {
    console.log("Computer wins best out of 5!");
  }
}
