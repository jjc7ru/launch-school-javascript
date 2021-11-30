/* Question 1
 *
 * Let's do some "ASCII Art": a stone-age form of nerd artwork from back in the days 
 * before computers had video screens.
 * 
 * For this practice problem, write a program that outputs The Flintstones Rock! 10 times,
 * with each line indented 1 space to the right of the line above it.
 * The output should start out like this:
 
 The Flintstones Rock!
  The Flintstones Rock!
    The Flintstones Rock!
     ...
 * */

let flintstonesText = "The Flintstones Rock!";
function indentText(text, repeat) {
  for (let i = 0; i < repeat; i ++) {
    console.log(" ".repeat(i) + text);
  }
}

indentText(flintstonesText, 10); 

/* Question 2
 * Starting with the string:
 * let munstersDescription = "The Munsters are creepy and spooky.";
 *
 * Return a new string that swaps the case of all of the letters:
 * `tHE mUNSTERS ARE CREEPY AND SPOOKY.`
 * */

let munstersDescription = "The Munsters are creepy and spooky.";
function swapLetterCase(text) {
  let out = '';
  for (let character of text) {
    if (character.toUpperCase() === character) {
      out += character.toLowerCase();
    } else {
      out += character.toUpperCase();
    }
  }
  return out;
}

munstersDescription = swapLetterCase(munstersDescription);
console.log(munstersDescription);

/* Question 3 */

function factors(number) {
  if (number === 0) {
    return 0
  }
  let isNegative = number < 0;
  let factors = [];
  
  if (isNegative) {
    number = Math.abs(number);
  }

  for (let i = 1; i < number + 1; i ++) {
    if (number % i === 0) {
      factors.push(number / i);
    }
  }
  if (isNegative) {
    let negFactors = []
    for (let num of factors) {
      negFactors.push(-num);
    }
    return factors.concat(negFactors);
  }
  return factors;
}

console.log(factors(-8));

