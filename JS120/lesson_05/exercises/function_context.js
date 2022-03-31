// (1)
// (2)
// The method franchise.allMovies is supposed to return the following array:
// [
//     'How to Train Your Dragon 1',
//     'How to Train Your Dragon 2',
//     'How to Train Your Dragon 3'
// ]
// Explain why this method will not return the desired object? 
// Try fixing this problem by taking advantage of JavaScript lexical scoping rules.
/*
let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    let self = this;
    return [1, 2, 3].map(function(number) {
      return self.name + ' ' + number;
    });
  },
};

console.log(franchise.allMovies());
*/
// (3) Solve the same problem again by passing a hard-bound anonymous function to map.
let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map(function(number) {
      return this.name + ' ' + number;
    }.bind(this));
  },
};

console.log(franchise.allMovies());

// (4) In this exercise, we'll update an implementation of myFilter by adding 
//     the functionality of accepting an optional thisArg just like the original 
//     Array.prototype.filter.
//     Here's an implementation. We also show an example of how we want to call 
//     our modified function: the 3rd argument, filter, supplies the desired context (thisArg). 
//
//     Modify the implementation such that the expected result is returned. 
//     Don't use the thisArg argument of Array.prototype.forEach.

function myFilter(array, func, thisArg) {
  let result = [];

  array.forEach(function(value) {
    if (func.call(filter, value)) {
      result.push(value);
    }
  });

  return result;
}

let filter = {
  allowedValues: [5, 6, 9],
}

console.log(myFilter([2, 1, 3, 4, 5, 6, 9, 12], function(val) {
  return this.allowedValues.indexOf(val) >= 0;
}, filter)); // returns [5, 6, 9]





























