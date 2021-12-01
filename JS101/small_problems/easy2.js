// (1) Create a function that takes 2 arguments, an array and an object. The array will contain 2 or more elements that, when combined with adjoining spaces, will produce a person's name. The object will contain two keys, "title" and "occupation", and the appropriate values. Your function should return a greeting that uses the person's full name, and mentions the person's title.

function greetings(arr, obj) {
  let name = arr.join(' ');
  let title = Object.values(obj).join(' ');
  return `Hello, ${name}! Nice to have a ${title} around.`;
}

console.log(
  greetings(["John", "Q", "Doe"], { title: "Master", occupation: "Plumber" })
);
// logs Hello, John Q Doe! Nice to have a Master Plumber around.


// (2) Write a program that will ask for user's name. The program will then greet the user. If the user writes "name!" then the computer yells back to the user.

const readline = require('readline-sync');
let name = readline.question("What is your name? ");

function greet(name) {
  if (name[name.length - 1] === '!') {
    name = name.slice(0, -1);
    return `HELLO ${name.toUpperCase()}. WHY ARE WE SCREAMING?`;
  }
  return `Hello ${name}.`;
}

console.log(greet(name));

// (3)
function multiply(num1, num2) {
 return num1 * num2;
};

// (4)

// (5)
function promptMessage(message) {
  return readline.question(`===> ${message}`);
}
let num1 = promptMessage("Enter the first number: ");
let num2 = promptMessage("Enter the second number: ");

function calculateAll(num1, num2) {
  console.log(`${num1} + ${num2} = ${num1 + num2}`);
  console.log(`${num1} - ${num2} = ${num1 - num2}`);
  console.log(`${num1} * ${num2} = ${num1 * num2}`);
  console.log(`${num1} / ${num2} = ${num1 / num2}`);
  console.log(`${num1} % ${num2} = ${num1 % num2}`);
  console.log(`${num1} ** ${num2} = ${num1 ** num2}`);
}

calculateAll(num1, num2);

// (6) Write a function that returns the next to last word in the String passed to it as an argument.
//
// Words are any sequence of non-blank characters.
//
// You may assume that the input String will always contain at least two words.

function penultimate(words) {
  let arrWords = words.split(' ');
  return arrWords[arrWords.length - 2];
}
console.log(penultimate("last word") === "last"); // logs true
console.log(penultimate("Launch School is great!") === "is"); // logs true


// (7) In this exercise, you will write a function named xor that takes two arguments, and returns true if exactly one of its arguments is truthy, false otherwise. Note that we are looking for a boolean result instead of a truthy/falsy value as returned by || and &&.

function xor(val1, val2) {
  if (val1 && val2) {
    return false;
  }

  if (val1 || val2) {
    return true;
  }
}

console.log('==================');
console.log(xor(5, 0) === true);
console.log(xor(false, true) === true);
console.log(xor(1, 1) === false);
console.log(xor(true, true) === false);


// (8) Write a function that returns an Array that contains every other element of an Array that is passed in as an argument. The values in the returned list should be those values that are in the 1st, 3rd, 5th, and so on elements of the argument Array.

function oddities(arr) {
  let out = [];
  for (let i = 0; i < arr.length; i ++) {
    if (i % 2 === 0) {
      out.push(arr[i]);
    }
  }
  return out;
}

console.log(oddities([2, 3, 4, 5, 6])); // logs [2, 4, 6]
console.log(oddities([1, 2, 3, 4, 5, 6])); // logs [1, 3, 5]
console.log(oddities(["abc", "def"])); // logs ['abc']
console.log(oddities([123])); // logs [123]
console.log(oddities([])); // logs []


// (9) Write a function that takes a string of digits and returns the appropriate number as an integer. You may not use any of the methods mentioned above (Number(), parseInt()).

function stringToInteger(string) {
  if (string.startsWith("0")) {
    return 0;
  }
  
  let out = 0
  let numberPlace = string.length - 1;

  for (let str of string) {
    let multiplier = 10 ** numberPlace;
    let number = str.charCodeAt() - "0".charCodeAt();
    number *= multiplier;
    out += number
    numberPlace --;
  }
  return out;
}

console.log(stringToInteger("4321") === 4321); // logs true
console.log(stringToInteger("570") === 570); // logs true
console.log(stringToInteger("0") === 0); // logs true


// (10)

function stringToSignedInteger(string) {
  let isNegative = string.startsWith("-");
  if (string.startsWith("-") || string.startsWith("+")) {
    string = string.slice(1);
  }

  let out = stringToInteger(string);
  if (isNegative) {
    out *= -1;
  }
  return out;
}

console.log(stringToSignedInteger("4321") === 4321); // logs true
console.log(stringToSignedInteger("-570") === -570); // logs true
console.log(stringToSignedInteger("+100") === 100); // logs true


// (11)

function integerToString(integer) {
  if (integer === 0) {
    return '0';
  }

  const d = {0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9'};
  let out = '';
  let div = integer;
  let mod = 0;

  while (div > 0) {
    mod = div % 10;
    div = parseInt(div / 10);
    out += d[mod];
  }
  out = out.split('').reverse().join('');
  return out;
}

console.log(integerToString(4321));        // "4321"
console.log(integerToString(0));           // "0"
console.log(integerToString(5000));        // "5000"
console.log(integerToString(1234567890));  // "1234567890"


// (12)

function signedIntegerToString(integer) {
  if (integer === 0) {
    return '0';
  }

  let isNegative = false;
  if (integer < 0) {
    isNegative = true;
    integer *= -1;
  }
  
  let out = integerToString(integer);
  if (isNegative) {
    return '-' + out;
  }
  return '+' + out;
}

console.log(signedIntegerToString(4321) === "+4321");
console.log(signedIntegerToString(-123) === "-123");
console.log(signedIntegerToString(0) === "0");


























