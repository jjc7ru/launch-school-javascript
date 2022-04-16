//
// >>> Basic Emulation Problems
//

// (1) Write a function that acts like the built-in Array.prototype.filter method. 
//     For this problem, you only need to emulate the most basic behavior: filtering 
//     elements of an array by examining the array values. You don't have to include 
//     the thisArg argument or support multiple arguments to the callback function, 
//     but feel free to add them if you like. Your function should work like this:
function filter(array, callback) {
  let filtered = [];
  for (let index = 0; index < array.length; index += 1) {
    if (callback(array[index])) {
      filtered.push(array[index]);
    }
  }
  return filtered;
}

/*
let numbers = [1, 2, 3, 4, 5];
console.log(filter(numbers, number => number > 3)); // => [ 4, 5 ]
console.log(filter(numbers, number => number < 0)); // => []
console.log(filter(numbers, () => true));           // => [ 1, 2, 3, 4, 5 ]

let values = [1, "abc", null, true, undefined, "xyz"];
console.log(filter(values, value => typeof value === "string"));
// => [ 'abc', 'xyz' ]
*/

// (2) Write a function that acts like the built-in Array.prototype.map method. 
//     For this problem, you only need to emulate the most basic behavior: transforming 
//     the elements of an array by using the array values. You don't have to 
//     include the thisArg argument or support multiple arguments to the callback function, 
//     but feel free to add them if you like. Your function should work like this: 
function map(array, callback) {
  let transformed = [];
  for (let index = 0; index < array.length; index += 1) {
    transformed.push(callback(array[index]));
  }
  return transformed;
};

/*
let numbers = [1, 2, 3, 4, 5];
console.log(map(numbers, number => number * 3));  // => [ 3, 6, 9, 12, 15 ]
console.log(map(numbers, number => number + 1));  // => [ 2, 3, 4, 5, 6 ]
console.log(map(numbers, () => false));
// => [ false, false, false, false, false ]

let values = [1, "abc", null, true, undefined, "xyz"];
console.log(map(values, value => String(value)));
// => [ '1', 'abc', 'null', 'true', 'undefined', 'xyz' ]
*/

//
// >>> Emulating and Using the `reduce` Method
//

// (1) <RE> Write a function that acts like the built-in Array.prototype.reduce method. 
//     For this problem, you only need to emulate the most basic behavior: reducing 
//     the elements of an array down to a single value based on the original array values. 
//     The result may be a primitive value, an object, or another array. 
//     You don't have to include the thisArg argument or support multiple arguments to 
//     the callback function, but feel free to add them if you like. 
//     Your function should work like this:
function reduce(array, callback, initialValue) {
  let accumulator = initialValue;
  let index = 0;

  if (accumulator === undefined) {
    accumulator = array[0];
    index += 1;
  }

  while (index < array.length) {
    accumulator = callback(accumulator, array[index]);
    index += 1;
  }

  return accumulator;
}

/*
let numbers = [1, 2, 3, 4, 5];
console.log(reduce(numbers, (accum, number) => accum + number));   // => 15
console.log(reduce(numbers, (prod, number) => prod * number));     // => 120
console.log(reduce(numbers, (prod, number) => prod * number, 3));  // => 360
console.log(reduce([], (accum, number) => accum + number, 10));    // => 10
console.log(reduce([], (accum, number) => accum + number));
// => undefined

let stooges = ["Mo", "Larry", "Curly"];
console.log(reduce(stooges, (reversedStooges, stooge) => {
  reversedStooges.unshift(stooge);
  return reversedStooges;
}, []));
// => ["Curly", "Larry", "Mo"]
*/

// (2) <RE> Array.prototype.reduce can be an incredibly useful function. You're not 
//     limited to simple accumulation-style processing, but can perform a wide 
//     variety of different tasks with it. For instance, you can emulate many 
//     of the standard Array methods, including filter, map, and more.
//     Let's try it. Write a function that works like the filter function from problem 1. 
//     This time, though, you should use Array.prototype.reduce to filter the input array.
function filterReduce(array, callback) {
  return array.reduce((accumulator, current) => {
    if (callback(current)) {
      accumulator.push(current);
    };
    return accumulator;
  }, []);
};

/*
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let out = filterReduce(arr, value => value % 2 === 0);
console.log(out);
*/

// (3) Let's put reduce to work with emulating map as well. Write a function that works 
//     like the map function from problem 2. This time, though, use Array.prototype.reduce 
//     to transform the input array.
function mapReduce(array, callback) {
  return array.reduce((accumulator, current) => {
    accumulator.push(callback(current));
    return accumulator;
  }, []);
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let out = mapReduce(arr, value => value ** 2);
console.log(out);
