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













