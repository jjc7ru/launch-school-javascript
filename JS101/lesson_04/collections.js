/* 02 Collections Basics */

// How would you reference 'grass' from within this string? Try it out in the node REPL.
let str = 'The grass is green';
//console.log(str.split(' ').filter(string => string === 'grass')[0]);
//console.log(str.split(' ')[1]);
//console.log(str.slice(str.indexOf('grass'), str.indexOf('grass') + 'grass'.length));


// Element Assignment
// In the node REPL or a code file, use the same method to increase the value of the
// rest of the numbers in the array by 1. Also, try incrementing an 
// element that doesn't exist, such as numbers[4].

let numbers = [1, 2, 3, 4];
for (let i = 0; i < numbers.length; i ++) {
  numbers[i] += 1;
}
console.log(numbers);

numbers[4] += 1;
console.log(numbers);


/* 03 String Methods */

// Verify that concat doesn't change the original string
console.log(str.concat(' on the other side'));
console.log(str);


/* 07 Selection and Transformation */

// Extracting To Functions
let produce = {
  apple: 'Fruit',
  carrot: 'Vegetable',
  pear: 'Fruit',
  broccoli: 'Vegetable'
};

function selectFruit(obj, val) {
  let keys = Object.keys(obj);
  let filteredObj = {};

  for (let i = 0; i < keys.length; i++) {
    let value = obj[keys[i]];
    if (value === val) {
      filteredObj[keys[i]] = value;
    }
  }
  return filteredObj;
}

console.log(selectFruit(produce, 'Fruit')); // => { apple: 'Fruit', pear: 'Fruit' }


// Here's an exercise for you: suppose we wanted to transform the numbers based on
// their position in the array rather than their value? Try coding a solution that 
// doubles the numbers that have odd indices:

function doubleOddIndex(numbers) {
  let oddIndexDoubled = [];
  for (let i = 0; i < numbers.length; i++) {
    if (i % 2 !== 0) {
      oddIndexDoubled.push(numbers[i] * 2);
    } else {
      oddIndexDoubled.push(numbers[i]);
    }
  }
  return oddIndexDoubled;
}

let myNumbers = [1, 4, 3, 7, 2, 6];
console.log(doubleOddIndex(myNumbers));
console.log(myNumbers);

// Try coding a function that lets you multiply every array item by a specified value.
// As with doubleNumbers, don't mutate the array, but return a new array instead.

function multiply(numbers, multiplier) {
  let multiplied = [];
  for (let number of numbers) {
    multiplied.push(number * multiplier);
  }
  return multiplied;
}

console.log(multiply(myNumbers, 3)); // => [3, 12, 9, 21, 6, 18]













