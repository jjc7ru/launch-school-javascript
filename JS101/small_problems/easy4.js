// (1) Build a program that randomly generates Teddy's age, and logs it to the console. 
// Have the age be a random number between 20 and 120 (inclusive).

function generateRandomAge(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//console.log(generateRandomAge(20, 120));



// (2) Write a program that solicits six numbers from the user and logs a 
// message that describes whether the sixth number appears among the first five numbers.

function exists() {
  const REPEAT = 7;
  const suffix = {1: 'st', 2: 'nd', 3: 'rd', 4: 'th', 5: 'th'}
  const readline = require('readline-sync');
  let log = [];

  for (let i = 1; i < REPEAT; i++) {
    let answer;
    if (i === 6) {
      answer = readline.question("Enter the last number: ");
      if (log.includes(answer)) {
        return `The number ${answer} appears in ${String(log)}`;
      }
      return `The number ${answer} does not appear in ${String(log)}`;
    }
    answer = readline.question(`Enter the ${i + suffix[i]} number: `);
    log.push(answer);
  }
}

//console.log(exists());



// (3) Build a program that logs when the user will retire and how many more 
// years the user has to work until retirement.

function calculateRetirement() {
  const readline = require('readline-sync');
  let currentAge = readline.question("What is your age? ");
  let retirementAge = readline.question("At what age would you like to retire? ");
  let difference = Number(retirementAge) - Number(currentAge);
  let currentYear = new Date().getFullYear();
  return `It's ${currentYear}. You will retire in ${Number(currentYear) + Number(difference)}.
          \nYou have only ${difference} years of work to go!`;
}

//console.log(calculateRetirement());



// (4) Write a function that returns true if the string passed as an argument 
// is a palindrome, or false otherwise. A palindrome reads the same forwards and 
// backwards. For this problem, the case matters and all characters matter.

function isPalindrome(string) {
  return string.slice().split('').reverse().join('') === string;
}

//console.log(isPalindrome('madam'));               // true
//console.log(isPalindrome('Madam'));               // false (case matters)
//console.log(isPalindrome("madam i'm adam"));      // false (all characters matter)
//console.log(isPalindrome('356653'));              // true



// (5) Write another function that returns true if the string passed as an 
// argument is a palindrome, or false otherwise. This time, however, your 
// function should be case-insensitive, and should ignore all non-alphanumeric 
// characters. If you wish, you may simplify things by calling the isPalindrome 
// function you wrote in the previous exercise.

function isRealPalindrome(string) {
  string = string.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return isPalindrome(string);
};

//console.log(isRealPalindrome('madam'));               // true
//console.log(isRealPalindrome('Madam'));               // true (case does not matter)
//console.log(isRealPalindrome("Madam, I'm Adam"));     // true (only alphanumerics matter)
//console.log(isRealPalindrome('356653'));              // true
//console.log(isRealPalindrome('356a653'));             // true
//console.log(isRealPalindrome('123ab321'));            // false



// (6) Write a function that returns true if its integer argument is palindromic, 
// or false otherwise. A palindromic number reads the same forwards and backwards.

function isPalindromicNumber(number) {
  let strNumber = String(number);
  return isPalindrome(strNumber);
}

//console.log(isPalindromicNumber(34543));        // true
//console.log(isPalindromicNumber(123210));       // false
//console.log(isPalindromicNumber(22));           // true
//console.log(isPalindromicNumber(5));            // true



// (7) Write a function that takes an array of numbers and returns an array 
// with the same number of elements, but with each element's value being the 
// running total from the original array.

function runningTotal(arr) {
  let out = [];
  let runningTotal = 0;
  for (let val of arr) {
    runningTotal += val;
    out.push(runningTotal);
  }
  return out;
}

//console.log(runningTotal([2, 5, 13]));             // [2, 7, 20]
//console.log(runningTotal([14, 11, 7, 15, 20]));    // [14, 25, 32, 47, 67]
//console.log(runningTotal([3]));                    // [3]
//console.log(runningTotal([]));                     // []



// (8) Write a function that takes a string consisting of zero or more space separated 
// words and returns an object that shows the number of words of different sizes.
//
// Words consist of any sequence of non-space characters.

function wordSizes(text) {
  let obj = {};
  let arr = text.split(' ');
  for (let word of arr) {
    if (word.length === 0) {
      continue;
    }

    let len = word.length;
    obj[len] = obj[len] || 0;
    obj[len]++;
  }
  return obj;
}

//console.log(wordSizes('Four score and seven.'));   // { "3": 1, "4": 1, "5": 1, "6": 1 }
//console.log(wordSizes('Hey diddle diddle, the cat and the fiddle!'));  // { "3": 5, "6": 1, "7": 2 }
//console.log(wordSizes("What's up doc?"));       // { "2": 1, "4": 1, "6": 1 }
//console.log(wordSizes(''));                     // {}



// (9) Modify the wordSizes function from the previous exercise to exclude 
// non-letters when determining word size. For instance, the word size of "it's" is 3, not 4.

function wordSizes2(text) {
  text = text.replace(/[^a-zA-z ]/g, '');
  return wordSizes(text);
}

//console.log(wordSizes2('Four score and seven.'));                       // { "3": 1, "4": 1, "5": 2 }
//console.log(wordSizes2('Hey diddle diddle, the cat and the fiddle!'));  // { "3": 5, "6": 3 }
//console.log(wordSizes2("What's up doc?"));                              // { "2": 1, "3": 1, "5": 1 }
//console.log(wordSizes2(''));                                            // {}



// (10) Given a string of words separated by spaces, write a function that 
// swaps the first and last letters of every word.
//
// You may assume that every word contains at least one letter, and that the 
// string will always contain at least one word. You may also assume that each string 
// contains nothing but words and spaces, and that there are no leading, 
// trailing, or repeated spaces.

function swap(text) {
  let swappedText = '';
  let arrText = text.split(' ');
  for (let i = 0; i < arrText.length; i++) {
    let wordLength = arrText[i].length;
    swappedText += swapFirstLast(arrText[i]);

    if (i === arrText.length - 1) {
      continue;
    }

    swappedText += ' ';
  }

  function swapFirstLast(word) {
    if (word.length === 1) {
      return word;
    }

    let charArr = word.split('');
    let first = word[0];
    let last = word[word.length - 1];
    charArr[0] = last;
    charArr[word.length - 1] = first;
    return charArr.join('');
  }

  return swappedText;
}

//console.log(swap('Oh what a wonderful day it is'));  // "hO thaw a londerfuw yad ti si"
//console.log(swap('Abcde'));                          // "ebcdA"
//console.log(swap('a'));                              // "a"





















