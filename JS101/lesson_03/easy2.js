// (1) Given a string, return a new string that replaces every occurrence of the word "important" with "urgent":
let advice = "Few things in life are as important as house training your pet dinosaur.";
advice.replaceAll('important', 'urgent');
//console.log(advice);


// (2)
let numbers = [1, 2, 3, 4, 5];
let revNumbers = numbers.slice().reverse();
//console.log(revNumbers);
//console.log(numbers);

revNumbers = [...numbers].sort((a, b) => b - a);
//console.log(revNumbers);
//console.log(numbers);

revNumbers = []
numbers.forEach(num => revNumbers.unshift(num));
//console.log(revNumbers);

// (3) Given a number and an array, determine whether the number is included in the array.
numbers = [1, 2, 3, 4, 5, 15, 16, 17, 95, 96, 99];

let number1 = 8;  // false
let number2 = 95; // true

//console.log(numbers.includes(number1));
//console.log(numbers.includes(number2));

// (4) Show two different ways to put the expected "Four score and " in front of it.
let famousWords = "seven years ago...";
//console.log("Four score and " + famousWords);
//console.log("Four score and ".concat(famousWords));

// (5) Given an array of numbers [1, 2, 3, 4, 5], mutate the array by removing the number at index 2, so that the array becomes [1, 2, 4, 5].

numbers = [1, 2, 3, 4, 5];
//numbers.splice(2, 1);
//console.log(numbers);

// (6) Create a new array that contains all of the above values, but in an un-nested format:
let names = ["Fred", "Wilma", ["Barney", "Betty"], ["Bambam", "Pebbles"]];
let unnest = names.flat();
//console.log(names);
//console.log(unnest);

//console.log([].concat(...names));

/*
names = ['hello', [['world', 'bye']]];
console.log(names.reduce((prev, curr) => {
  prev = prev.concat(curr);
  return prev;
}, []));
*/

names = ['hello', [['world', 'bye']]];
names = names.flat();
//console.log(names); // Flattens it by one level only => ['hello', ['world', 'bye']]

// (7) Keep only Barney
let flintstones = { Fred: 0, Wilma: 1, Barney: 2, Betty: 3, Bambam: 4, Pebbles: 5 };
//console.log(Object.entries(flintstones)[2]);
//console.log(Object.entries(flintstones).filter(entry => entry[0] === 'Barney')[0]);


// (8) How would you check whether the objects assigned to variables numbers and table below are arrays?
numbers = [1, 2, 3, 4]; // true
let table = { field1: 1, field2: 2, field3: 3, field4: 4 }; // false

//console.log(Array.isArray(numbers));

// (9) Center the string below given that the total number of allocated space is 40

let title = "Flintstone Family Members";
function centerText(text) {
  let textLength = title.length;
  let textStartIndex = Math.floor((40 - textLength) / 2);
  let output = (' '.repeat(textStartIndex)) + title + ' '.repeat(40 - (textStartIndex + textLength));
  return output
}
//console.log(centerText(title));

let padding = Math.floor((40 - title.length) / 2);
title = title.padStart(padding + title.length);
//console.log(title);

// (10) Write two one-line expressions to count the number of lower-case t characters in each of the following strings:

let statement1 = "The Flintstones Rock!";
let statement2 = "Easy come, easy go.";

function getNumberOfChar(text) {
  return text.match(/t/g) ? text.match(/t/g).length : 0;
}

console.log(getNumberOfChar(statement1));
console.log(getNumberOfChar(statement2));


















