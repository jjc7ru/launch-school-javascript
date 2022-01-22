// (1) Write a function that rotates an array by moving the first element 
// to the end of the array. Do not modify the original array.

// If the input is not an array, return undefined.
// If the input is an empty array, return an empty array.
// Review the test cases below, then implement the solution accordingly.

function rotateArray(arr) {
  if (typeof arr !== 'object') {
    return undefined;
  }
  let n = arr.length;
  if (n === 0 || n === 1) {
    return arr;
  }
  return arr.slice(1).concat(arr.slice(0, 1));
}

//console.log(rotateArray([7, 3, 5, 2, 9, 1]));       // [3, 5, 2, 9, 1, 7]
//console.log(rotateArray(['a', 'b', 'c']));          // ["b", "c", "a"]
//console.log(rotateArray(['a']));                    // ["a"]
//console.log(rotateArray([1, 'a', 3, 'c']));         // ["a", 3, "c", 1]
//console.log(rotateArray([{ a: 2 }, [1, 2], 3]));    // [[1, 2], 3, { a: 2 }]
//console.log(rotateArray([]));                       // []

// return `undefined` if the argument is not an array
//console.log(rotateArray());                         // undefined
//console.log(rotateArray(1));                        // undefined


// the input array is not mutated
//let array = [1, 2, 3, 4];
//console.log(rotateArray(array));                    // [2, 3, 4, 1]
//console.log(array);                                 // [1, 2, 3, 4]

// (2) Write a function that rotates the last count digits of a number. 
// To perform the rotation, move the first of the digits that you want 
// to rotate to the end and shift the remaining digits to the left.

function rotateRightmostDigits(digits, rotations) {
  if (typeof digits !== 'number') {
    throw TypeError("'digits' must be a number.");
  }

  let digitsStr = String(digits);
  let n = digitsStr.length;
  if (rotations > n) {
    throw RangeError("'rotations' must be smaller than the length of 'digits'.");
  }

  let index = n - rotations;
  let target = digitsStr.slice(index);
  if (target.length === 1) {
    return Number(digitsStr);
  }

  let reOrderedTarget = target.slice(1).concat(target.slice(0, 1));
  return Number((digitsStr.slice(0, index) + reOrderedTarget));
}

//console.log(rotateRightmostDigits(735291, 1));      // 735291
//console.log(rotateRightmostDigits(735291, 2));      // 735219
//console.log(rotateRightmostDigits(735291, 3));      // 735912
//console.log(rotateRightmostDigits(735291, 4));      // 732915
//console.log(rotateRightmostDigits(735291, 5));      // 752913
//console.log(rotateRightmostDigits(735291, 6));      // 352917


// (3) Take the number 735291 and rotate it by one digit to the left, 
// getting 352917. Next, keep the first digit fixed in place and 
// rotate the remaining digits to get 329175. Keep the first two digits 
// fixed in place and rotate again to get 321759. Keep the first 
// three digits fixed in place and rotate again to get 321597. 
// Finally, keep the first four digits fixed in place and rotate the 
// final two digits to get 321579. The resulting number is called the
// maximum rotation of the original number.
//
// Write a function that takes an integer as an argument and returns 
// the maximum rotation of that integer. You can (and probably should) 
// use the rotateRightmostDigits function from the previous exercise.

function maxRotation(digits) {
  let n = digits.toString().length;
  if (n < 2) {
    return digits;
  }

  for (let i = 0; i < n; i++) {
    digits = rotateRightmostDigits(digits, n - i);
  }

  return digits;
}

//console.log(maxRotation(735291));          // 321579
//console.log(maxRotation(3));               // 3
//console.log(maxRotation(35));              // 53
//console.log(maxRotation(105));             // 15 -- the leading zero gets dropped
//console.log(maxRotation(8703529146));      // 7321609845



// (4)

function minilang(string) {
  let stack = []
  let register = 0;

  // add, sub, mult, div, remainder, pop - modifies register
  // n - changes the register
  // (1) 5 push 3 mult print - split(' ') - shift() every iteration while loop
  
  let stringList = string.split(' ');
  let popCommands = ['ADD', 'SUB', 'MULT', 'DIV', 'REMAINDER', 'POP'];
  while (stringList.length > 0) {
    let curr = stringList.shift();
    let popped;

    if (popCommands.includes(curr)) {
      popped = stack.pop();
    }

    if (!isNaN(curr)) {
      register = Number(curr);
    } else if (curr === 'PUSH') {
      stack.push(register);
    } else if (curr === 'ADD') {
      register += popped;
    } else if (curr === 'SUB') {
      register -= popped;
    } else if (curr === 'MULT') {
      register *= popped;
    } else if (curr === 'DIV') {
      register = parseInt(register / popped);
    } else if (curr === 'REMAINDER') {
      register = parseInt(register % popped);
    } else if (curr === 'POP') {
      register = popped;
    } else if (curr === 'PRINT') {
      console.log(register);
    }
  }
}

//console.log(minilang('PRINT')); // 0
//console.log(minilang('5 PUSH 3 MULT PRINT')); // 15
//console.log(minilang('5 PRINT PUSH 3 PRINT ADD PRINT')); // 5 3 8
//console.log(minilang('5 PUSH POP PRINT')); // 5
//console.log(minilang('3 PUSH 4 PUSH 5 PUSH PRINT ADD PRINT POP PRINT ADD PRINT')); // 5 10 4 7
//console.log(minilang('3 PUSH PUSH 7 DIV MULT PRINT')); // 6
//console.log(minilang('4 PUSH PUSH 7 REMAINDER MULT PRINT')); // 12
//console.log(minilang('-3 PUSH 5 SUB PRINT')); // 8
//console.log(minilang('6 PUSH')); // no print



// (5) word to digit

function wordToDigit(string) {
  let out = [];
  let stringList = string.split(' ');
  const stringNumber =  {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
  };

  let keys = Object.keys(stringNumber);
  for (key of keys) {
    let regex = new RegExp('\\b' + key + '\\b', 'g');
    string = string.replace(regex, stringNumber[key]);
  }
  return string;
}


//console.log(wordToDigit('Please call me at five five five one two three four. Thanks.')); // "Please call me at 5 5 5 1 2 3 4. Thanks."
//console.log(wordToDigit('the weight is done.'));


// (6) Fibonacci (Recursion)

function fibonacci(n) {
  if (n <= 2) {
    return 1;
  }
  return fibonacci(n - 2) + fibonacci(n - 1);
}


console.log(fibonacci(20));


// (7) Fibonacci (No Recursion)
function fibonacci(n) {
  if (n <= 2) {
    return 1;
  }

  let nums = [1, 1];
  for (let i = 2; i < n; i++) {
    nums[i] = nums[i - 2] + nums[i - 1];
  }
  return nums[n - 1];
}


console.log(fibonacci(75));
