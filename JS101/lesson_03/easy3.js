// (1) Write three different ways to remove all elements from numbers
let numbers = [1, 2, 3, 4];
while (numbers.length > 0) {
  numbers.shift();
}
//console.log(numbers);

numbers = [1, 2, 3, 4];
while (numbers.length > 0) {
  numbers.pop();
}
//console.log(numbers);

numbers = [1, 2, 3, 4];
numbers.splice(0, numbers.length);
//console.log(numbers);

// (5)
let a = [1, 2, 3];
let b = [4, 5];

let arr1 = [{ first: "value1" }, { second: "value2" }, 3, 4, 5];
let arr2 = arr1.slice();
console.log(arr2);
arr2[0].first = 42;
console.log(arr1);
