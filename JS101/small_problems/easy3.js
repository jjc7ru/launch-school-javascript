// (1) Write a function that takes a string argument and returns a new string 
// that contains the value of the original string with all consecutive duplicate 
// characters collapsed into a single character.

function crunch(str) {
  let crunched = '';
  if (str.length < 2) {
    return str;
  }

  let [left, right] = [0, 1];
  while (left < str.length) {
    if (str[right] === str[left]) {
      right++;
      if (right >= str.length) {
        break;
      }
      continue
    }
    crunched += str[left];
    left = right;
    right++;

    if (right >= str.length) {
      return crunched += str[left];
    }
  }
  return crunched += str[left];
}

console.log(crunch('ab'));
console.log(crunch('abb'));
console.log(crunch('ddaaiillyy ddoouubbllee'));    // "daily double"
console.log(crunch('4444abcabccba'));              // "4abcabcba"
console.log(crunch('ggggggggggggggg'));            // "g"
console.log(crunch('a'));                          // "a"
console.log(crunch(''));                           // ""



// (2) Write a function that will take a short line of text, and write it to 
// the console log within a box.

function logInBox(text) {
  const LENGTH = text.length + 2
  console.log('+' + '-'.repeat(LENGTH) + '+');
  console.log('|' + ' '.repeat(LENGTH) + '|');
  console.log('| ' + text + ' |');
  console.log('|' + ' '.repeat(LENGTH) + '|');
  console.log('+' + '-'.repeat(LENGTH) + '+');
}

logInBox('To boldly go where no one has gone before.');



// (3) Write a function that takes one argument, a positive integer, and 
// returns a string of alternating '1's and '0's, always starting with a '1'. 
// The length of the string should match the given integer.

function stringy(repeat) {
  let out = '';
  let counter = 0;
  
  for (let i = 0; i < repeat; i ++) {
    if (counter % 2 === 0) {
      out += '1';
    } else {
      out += '0';
    }
    counter ++;
  }
  return out;
}


console.log(stringy(0));    // ""
console.log(stringy(6));    // "101010"
console.log(stringy(9));    // "101010101"
console.log(stringy(4));    // "1010"
console.log(stringy(7));    // "1010101"



// (4) Write a function that calculates and returns the index of the first Fibonacci 
// number that has the number of digits specified by the argument. 
// (The first Fibonacci number has an index of 1.)
// You may assume that the argument is always an integer greater than or equal to 2.

function findFibonacciIndexByLength(numberOfDigits) {
  let index = 2n;
  let [temp, prev, curr] = [0n, 1n, 1n];
  while (String(curr).length < numberOfDigits) {
    temp = curr;
    curr += prev;
    prev = temp;
    index ++;
  }
  return index;
}


console.log(findFibonacciIndexByLength(2n) === 7n);    // 1 1 2 3 5 8 13
console.log(findFibonacciIndexByLength(3n) === 12n);   // 1 1 2 3 5 8 13 21 34 55 89 144
console.log(findFibonacciIndexByLength(10n) === 45n);
console.log(findFibonacciIndexByLength(16n) === 74n);
console.log(findFibonacciIndexByLength(100n) === 476n);
console.log(findFibonacciIndexByLength(1000n) === 4782n);
// console.log(findFibonacciIndexByLength(10000n) === 47847n);
// The last example may take a minute or so to run.



// (5) Write a function that takes a positive integer, n, as an argument and 
// logs a right triangle whose sides each have n stars. The hypotenuse of the 
// triangle (the diagonal side in the images below) should have one end at the 
// lower-left of the triangle, and the other end at the upper-right.

function triangle(n) {
  let spaces = n - 1;
  let asterisks = n - spaces;
  while (spaces >= 0) {
    console.log(' '.repeat(spaces) + '*'.repeat(asterisks));
    spaces --;
    asterisks = n - spaces;
  }
}

triangle(5);



// (6) Madlibs is a simple game where you create a story template with 
// "blanks" for words. You, or another player, then construct a list of words and
// place them into the story, creating an often silly or funny story as a result.

readline = require('readline-sync');
function adlib() {

  function question(q) {
    return readline.question(q);
  }

  let noun = question("Enter a noun: ");
  let verb = question("Enter a verb: ");
  let adjective = question("Enter an adjective: ");
  let adverb = question("Enter an adverb: ");

  console.log(`Do you ${verb} your ${adjective} ${noun} ${adverb}? That's hilarious! `);
}

adlib();

/*
Enter a noun: dog
Enter a verb: walk
Enter an adjective: blue
Enter an adverb: quickly

// console output
// Do you walk your blue dog quickly? That's hilarious!
// The blue dog walks quickly over the lazy dog.
// The dog quickly walks up blue Joe's turtle.
*/



// (7) A double number is an even-length number whose left-side digits are 
// exactly the same as its right-side digits. For example, 44, 3333, 103103, 
// and 7676 are all double numbers, whereas 444, 334433, and 107 are not.
// Write a function that returns the number provided as an argument multiplied by 
// two, unless the argument is a double number; otherwise, return the double number as-is.

function twice(num) {
  const strNum = String(num);
  const length = strNum.length;
  if (length % 2 !== 0) {
    return num * 2;
  }

  const middle = length / 2;
  if (strNum.slice(0, middle) === strNum.slice(middle)) {
    return num;
  }
  return num * 2;
}

console.log(twice(37));          // 74
console.log(twice(44));          // 44
console.log(twice(334433));      // 668866
console.log(twice(444));         // 888
console.log(twice(107));         // 214
console.log(twice(103103));      // 103103
console.log(twice(3333));        // 3333
console.log(twice(7676));        // 7676



// (8) Write a function that determines the mean (average) of the three scores 
// passed to it, and returns the letter associated with that grade.
//
// Numerical score letter grade list:
//
// 90 <= score <= 100: 'A'
// 80 <= score < 90: 'B'
// 70 <= score < 80: 'C'
// 60 <= score < 70: 'D'
// 0 <= score < 60: 'F'
// Tested values are all between 0 and 100. There is no need to check for 
// negative values or values greater than 100.

function getGrade(g1, g2, g3) {
  const DENOMINATOR = 3;
  let average = (g1 + g2 + g3) / DENOMINATOR;
  
  if (average >= 90 && average <= 100) {
    return 'A';
  } else if (average >= 80 && average < 90) {
    return 'B';
  } else if (average >= 70 && average < 80) {
    return 'C';
  } else if (average >= 60 && average < 70) {
    return 'D';
  } else {
    return 'F';
  }
}

console.log(getGrade(95, 90, 93));    // "A"
console.log(getGrade(50, 50, 95));    // "D"



// (9) Given a string that consists of some words and an assortment of 
// non-alphabetic characters, write a function that returns that string with all 
// of the non-alphabetic characters replaced by spaces. If one or more non-alphabetic 
// characters occur in a row, you should only have one space in the result 
// (i.e., the result string should never have consecutive spaces).

function cleanUp(string) {
  return string.replace(/[^a-zA-Z]/g, ' ').replace(/\s+/g, ' ');
} 

console.log(cleanUp("---what's my +*& line?"));    // " what s my line "

// (10)
// Write a function that takes a year as input and returns the century. 
// The return value should be a string that begins with the century number,
// and ends with 'st', 'nd', 'rd', or 'th' as appropriate for that number.

function century(year) {
  let centuryString = {0: 'th', 1: 'st', 2: 'nd', 3: 'rd'};
  if (year <= 100) {
    return '1st';
  }

  let centuryDigit = calculateCentury(year); 
  let strCentury = String(centuryDigit);
  if (strCentury.length < 2) {
    if (centuryString.hasOwnProperty(strCentury)) {
      return strCentury + centuryString[strCentury];
    }
    return strCentury + 'th';
  }

  let lastTwoCenturyDigits = strCentury.slice(-2);
  let lastCenturyDigit = strCentury.slice(-1);
  let endsWithEdgeCases = false;
  if (lastTwoCenturyDigits === '11' || 
      lastTwoCenturyDigits === '12' || 
      lastTwoCenturyDigits === '13') {
    endsWithEdgeCases = true;
  }

  if (endsWithEdgeCases) {
    return strCentury + 'th';
  }
  return strCentury + centuryString[lastCenturyDigit];


  function calculateCentury(year) {
    let strYear = String(year);
    let lastTwoDigits = strYear.slice(-2);
    let centuryDigit = -1;

    if (Number(lastTwoDigits)) {
      centuryDigit = parseInt(year / 100) + 1;
    } else {
      centuryDigit = parseInt(year / 100);
    }
    return centuryDigit;
  }

}

console.log(century(2000));        // "20th"
console.log(century(2001));        // "21st"
console.log(century(1965));        // "20th"
console.log(century(256));         // "3rd"
console.log(century(5));           // "1st"
console.log(century(10103));       // "102nd"
console.log(century(1052));        // "11th"
console.log(century(1127));        // "12th"
console.log(century(11201));       // "113th"


































