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
