// (1) Write a function that takes one integer argument, which may be positive, negative, or zero. This method returns true if the number's absolute value is odd. You may assume that the argument is a valid integer value.

function isOdd(val) {
  return val % 2 !== 0;
}

console.log(isOdd(2)); // => false
console.log(isOdd(5)); // => true
console.log(isOdd(-17)); // => true
console.log(isOdd(-8)); // => false
console.log(isOdd(0)); // => false
console.log(isOdd(7)); // => true

// (2) Log all odd numbers from 1 to 99, inclusive, to the console, with each number on a separate line.

for (let i = 1; i < 100; i ++) {
  if (i % 2 !== 0) {
    console.log(i);
  }
}

// (3) Log all even numbers from 1 to 99, inclusive, to the console, with each number on a separate line.

for (let i = 1; i < 100; i ++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}

// (4) Build a program that asks the user to enter the length and width of a room in meters, and then logs the area of the room to the console in both square meters and square feet.
// 
// (ex)
// Enter the length of the room in meters:
// 10
// Enter the width of the room in meters:
// 7
// The area of the room is 70.00 square meters (753.47 square feet).
const readlines = require('readline-sync');

function askQuestion(message) {
  return readlines.question(message);
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function area(length, width) {
  const SQMETER_TO_SQFT = 10.7639
  let areaVar = length * width;
  let squareFeet = round(areaVar * SQMETER_TO_SQFT,  2)
  return `The area of the room is ${areaVar} meters (${squareFeet} square feet).`;
}


let length = askQuestion("Enter the length of the room in meters: ");
let width = askQuestion("Enter the width of the room in meters: ");
console.log(area(length, width));


// (5) Create a simple tip calculator. The program should prompt for a bill amount and a tip rate. The program must compute the tip, and then log both the tip and the total amount of the bill to the console. You can ignore input validation and assume that the user will enter numbers.

// What is the bill? 200
// What is the tip percentage? 15

// The tip is $30.00
// The total is $230.00

let billAmount = askQuestion("What is the bill? ");
let tipPercentage = askQuestion("What is the tip percentage? ");

function calculateTip(bill, percentage) {
  return round(bill * (percentage / 10), 2);
}

let tip = calculateTip(billAmount, tipPercentage);
let total = Number(billAmount) + tip;

function displayDollarFormat(value) {
  let arr = String(value).split('.');
  let dollar = String(arr[0]);
  if (arr.length === 1) {
    return dollar + '.00'; 
  }

  let cent = String(arr[1]);
  if (cent.length !== 2) {
    cent += '0';
  }
  return dollar + '.' + cent;
}

tip = displayDollarFormat(tip);
total = displayDollarFormat(total);
console.log(`The tip is $${tip}`);
console.log(`The total is $${total}`);


// (6) Write a program that asks the user to enter an integer greater than 0, then asks whether the user wants to determine the sum or the product of all numbers between 1 and the entered integer, inclusive.

//Please enter an integer greater than 0: 5
//Enter "s" to compute the sum, or "p" to compute the product. s
//The sum of the integers between 1 and 5 is 15.

//Please enter an integer greater than 0: 6
//Enter "s" to compute the sum, or "p" to compute the product. p
//The product of the integers between 1 and 6 is 720.

function calculateSum(num) {
  let out = 0;
  for (let i = 1; i <= num; i ++) {
    out += i;
  }
  return out;
}

function calculateProduct(num) {
  let out = 1;
  for (let i = 1; i <= num; i ++) {
    out *= i;
  }
  return out;
}

function calculate(value, num) {
  if (value === 's') {
    return calculateSum(num);
  } else if (value === 'p') {
    return calculateProduct(num);
  }
  return "Please choose between 's' and 'p'";
}

let num = askQuestion("Please enter an integer greater than 0: ");
let choice = askQuestion('Enter "s" to compute the sum, or "p" to compute the product. ');
console.log(calculate(choice, num));

// (7) Write a function that takes two strings as arguments, determines the length of the two strings, and then returns the result of concatenating the shorter string, the longer string, and the shorter string once again. You may assume that the strings are of different lengths.

function shortLongShort(str1, str2) {
  let str1Len = str1.length;
  let str2Len = str2.length;
  if (str1Len < str2Len) {
    return str1 + str2 + str1;
  }
  return str2 + str1 + str2;
}

console.log(shortLongShort('abc', 'defgh'));    // "abcdefghabc"
console.log(shortLongShort('abcde', 'fgh'));    // "fghabcdefgh"
console.log(shortLongShort('', 'xyz'));         // "xyz"


// (8) In the modern era under the Gregorian Calendar, leap years occur in every year that is evenly divisible by 4, unless the year is also divisible by 100. If the year is evenly divisible by 100, then it is not a leap year, unless the year is also evenly divisible by 400.
//
// Assume this rule is valid for any year greater than year 0. Write a function that takes any year greater than 0 as input and returns true if the year is a leap year, or false if it is not a leap year.

function isLeapYear(year) {
  if ((year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
    return true;
  }
  return false;
}

// (9) This is a continuation of the previous exercise.
//
// The British Empire adopted the Gregorian Calendar in 1752, which was a leap year. Prior to 1752, they used the Julian Calendar. Under the Julian Calendar, leap years occur in any year that is evenly divisible by 4.
//
// Using this information, update the function from the previous exercise to determine leap years both before and after 1752.

function isLeapYear(year) {
  const isJulianCalendar = year < 1752;
  if (isJulianCalendar) {
    if (year % 4 === 0) {
      return true;
    }
  } 
  return ((year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0));
}


// (10) Write a function that computes the sum of all numbers between 1 and some other number, inclusive, that are multiples of 3 or 5. For instance, if the supplied number is 20, the result should be 98 (3 + 5 + 6 + 9 + 10 + 12 + 15 + 18 + 20).

function multisum(num) {
  let total = 0;
  for (let i = 1; i <= num; i ++) {
    if (i % 3 === 0 || i % 5 === 0) {
      total += i;
    }
  }
  return total;
}


console.log(multisum(3));       // 3
console.log(multisum(5));       // 8
console.log(multisum(10));      // 33
console.log(multisum(1000));    // 234168


// (11) Write a function that determines and returns the UTF-16 string value of a string passed in as an argument. The UTF-16 string value is the sum of the UTF-16 values of every character in the string. (You may use String.prototype.charCodeAt() to determine the UTF-16 value of a character.)

function utf16Value(string) {
  let sumUTF16 = 0;
  for (let str of string) {
    sumUTF16 += str.charCodeAt(str);
  }
  return sumUTF16;
}

console.log(utf16Value('Four score'));         // 984
console.log(utf16Value('Launch School'));      // 1251
console.log(utf16Value('a'));                  // 97
console.log(utf16Value(''));                   // 0

// The next three lines demonstrate that the code
// works with non-ASCII characters from the UTF-16
// character set.
const OMEGA = "\u03A9";             // UTF-16 character 'Ω' (omega)
console.log(utf16Value(OMEGA));                  // 937
console.log(utf16Value(OMEGA + OMEGA + OMEGA));  // 2811










