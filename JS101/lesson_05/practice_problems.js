// (1) How would you order the following array of number strings by descending 
// numeric value (largest number value to smallest)?

let arr = ['10', '11', '9', '7', '8'];
arr.sort((a, b) => Number(b) - Number(a));
console.log(arr);



// (2) How would you order the following array of objects based on the year of 
// publication of each book, from the earliest to the latest?

let books = [
  { title: 'One Hundred Years of Solitude', author: 'Gabriel Garcia Marquez', published: '1967' },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', published: '1925' },
  { title: 'War and Peace', author: 'Leo Tolstoy', published: '1869' },
  { title: 'Ulysses', author: 'James Joyce', published: '1922' },
  { title: 'The Book of Kells', author: 'Multiple Authors', published: '800' },
];

books.sort((a, b) => Number(a.published) - Number(b.published));
console.log(books);



// (3) For each of these collection objects, demonstrate how you would access the letter g.

let arr1 = ['a', 'b', ['c', ['d', 'e', 'f', 'g']]];
console.log(arr1[2][1][3]);

let arr2 = [{ first: ['a', 'b', 'c'], second: ['d', 'e', 'f'] }, { third: ['g', 'h', 'i'] }];
console.log(arr2[1]['third'][0]);

let arr3 = [['abc'], ['def'], { third: ['ghi'] }];
console.log(arr3[2]['third'][0][0]);

let obj1 = { a: ['d', 'e'], b: ['f', 'g'], c: ['h', 'i'] };
console.log(obj1['b'][1]);

let obj2 = { first: { d: 3 }, second: { e: 2, f: 1 }, third: { g: 0 }}
console.log(Object.keys(obj2['third']).pop());



// (4) For each of these collection objects, demonstrate how you would change the value 3 to 4.

let arr11 = [1, [2, 3], 4];
arr11[1][1] = 4;
console.log(arr11);

let arr22 = [{ a: 1 }, { b: 2, c: [7, 6, 5], d: 4 }, 3];
arr22[2] = 4;
console.log(arr22);

let obj11 = { first: [1, 2, [3]] };
obj11['first'][2][0] = 4;
console.log(obj11);

let obj22 = { a: { a: ['1', 'two', 3], b: 4 }, b: 5 };
obj22['a']['a'][2] = 4;
console.log(obj22);



// (5) Compute and display the total age of the male members of the family.

let munsters = {
  Herman: { age: 32, gender: 'male' },
  Lily: { age: 30, gender: 'female' },
  Grandpa: { age: 402, gender: 'male' },
  Eddie: { age: 10, gender: 'male' },
  Marilyn: { age: 23, gender: 'female'}
};

let values = Object.values(munsters);
let maleTotal = 0;
for (let value of values) {
  if (value['gender'] === 'male') {
    maleTotal += value['age'];
  }
}
console.log(`Total age for males: ${maleTotal}`);



// (6) One of the most frequently used real-world string operations is that of 
// "string substitution," where we take a hard-coded string and modify it with 
// various parameters from our program.
// Given this previously seen family object, print the name, age, and gender of each family member:

let keys = Object.keys(munsters);
for (let key of keys) {
  console.log(`${key} is a ${munsters[key]['age']}-year-old ${munsters[key]['gender']}`);
}



// (7) Solved

// (8) Using the forEach method, write some code to output all vowels from the 
// strings in the arrays. Don't use a for or while loop.

let obj = {
  first: ['the', 'quick'],
  second: ['brown', 'fox'],
  third: ['jumped'],
  fourth: ['over', 'the', 'lazy', 'dog'],
};

let vowels = 'aeiou';
Object.values(obj).forEach(arr => {
  arr.forEach(word => {
    word.split('').forEach(character => {
      if (vowels.includes(character)) {
        console.log(character);
      }
    })
  })
});



// (9) Given the following data structure, return a new array with the same 
// structure, but with the values in each subarray ordered -- alphabetically or 
// numerically as appropriate -- in ascending order.

arr = [['b', 'c', 'a'], [2, 11, -3], ['blue', 'black', 'green']];
let sortedArr = arr.map(eachArr => {
  if (typeof eachArr[0] === 'string') {
    return eachArr.slice().sort();
  }
  return eachArr.slice().sort((a, b) => Number(a) - Number(b));
});
console.log(arr);
console.log(sortedArr);



// (10) Perform the same transformation of sorting the subarrays we did in the 
// previous exercise with one difference; sort the elements in descending order.

arr = [['b', 'c', 'a'], [2, 11, -3], ['blue', 'black', 'green']];
let revArr = arr.map(values => {
  if (typeof values[0] === 'string') {
    return values.slice().sort((a, b) => {
      if (a < b) {
        return 1;
      } else if (a > b) {
        return -1;
      } else {
        return 0;
      }
    })
  } else {
    return values.slice().sort((a, b) => b - a);
  }
});
console.log(revArr);



// (11) Given the following data structure, use the map method to return a 
// new array identical in structure to the original but, with each number incremented 
// by 1. Do not modify the original data structure.

arr = [{ a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 }];
let newArr = [];

arr.map(obj => {
  let tempObj = {};
  for (let key in obj) {
    tempObj[key] = obj[key];
    tempObj[key]++;
  }
  newArr.push(tempObj);
});

console.log(arr);
console.log(newArr);



// (12) Given the following data structure, use a combination of methods, 
// including filter, to return a new array identical in structure to the original, 
// but containing only the numbers that are multiples of 3.

arr = [[2], [3, 5, 7], [9], [11, 15, 18]];
let filteredArr = arr.map(subArr => {
  let temp = subArr.filter(number => {
    return number % 3 === 0;
  });
  return temp;
});

console.log(filteredArr);



// (13) Given the following data structure, sort the array so that the 
// sub-arrays are ordered based on the sum of the odd numbers that they contain.

arr = [[1, 6, 7], [1, 5, 3], [1, 8, 3]];
function oddSum(arr) {
  let odds = [];
  for (let number of arr) {
    if (number % 2 !== 0) {
      odds.push(number);
    }
  }
  let sum = odds.reduce((prev, curr) => prev + curr);
  return sum;
}

let oddSumSort = arr.sort((a, b) => {
  let sumA = oddSum(a);
  let sumB = oddSum(b);
  if (sumA < sumB) {
    return -1;
  } else if (sumA > sumB) {
    return 1;
  } else {
    return 0;
  }
});

console.log(oddSumSort);



// (14) Given the following data structure write some code to return an array 
// containing the colors of the fruits and the sizes of the vegetables. The sizes 
// should be uppercase, and the colors should be capitalized.

obj = {
  grape: { type: 'fruit', colors: ['red', 'green'], size: 'small' },
  carrot: { type: 'vegetable', colors: ['orange'], size: 'medium' },
  apple: { type: 'fruit', colors: ['red', 'green'], size: 'medium' },
  apricot: { type: 'fruit', colors: ['orange'], size: 'medium' },
  marrow: { type: 'vegetable', colors: ['green'], size: 'large' },
};

// [["Red", "Green"], "MEDIUM", ["Red", "Green"], ["Orange"], "LARGE"]
let fruitColorsVegeSizes = [];
values = Object.values(obj);
for (let value of values) {
  if (value['type'] === 'fruit') {
    let colors = value['colors'];
    for (let i = 0; i < colors.length; i++) {
      colors[i] = colors[i].slice(0, 1).toUpperCase() + colors[i].slice(1);
    }
    fruitColorsVegeSizes.push(colors);
  } else {
    fruitColorsVegeSizes.push(value['size'].toUpperCase());
  }
}
console.log(fruitColorsVegeSizes);



// (15) Given the following data structure, write some code to return an array which 
// contains only the objects where all the numbers are even.

arr = [
  { a: [1, 2, 3] },
  { b: [2, 4, 6], c: [3, 6], d: [4] },
  { e: [8], f: [6, 10] },
];

let evenArr = arr.map(value => {
  for (let [key, val] of Object.entries(value)) {
    return val.filter(number => {
      return number % 2 === 0;
    });
  }
});

console.log(evenArr);



// (16) Given the following data structure, write some code that returns an object 
// where the key is the first item in each subarray, and the value is the second.

arr = [['a', 1], ['b', 'two'], ['sea', {'c': 3}], ['D', ['a', 'b', 'c']]];
let arrObj = {};

for (let array of arr) {
  arrObj[array[0]] = array[1];
}
console.log(arrObj);



// (17) A UUID is a type of identifier often used to uniquely identify items, even 
// when some of those items were created on a different server or by a different 
// application. That is, without any synchronization, two or more computer systems 
// can create new items and label them with a UUID with no significant risk of 
// stepping on each other's toes. It accomplishes this feat through massive randomization. 
// The number of possible UUID values is approximately 3.4 X 10E38, which is a huge number. 
// The chance of a conflict is vanishingly small with such a large number of possible values.

// Each UUID consists of 32 hexadecimal characters (the digits 0-9 and the letters a-f) 
// represented as a string. The value is typically broken into 5 sections in an 
// 8-4-4-4-12 pattern, e.g., 'f65c57f6-a6aa-17a8-faa1-a67f2dc9fa91'.

// Write a function that takes no arguments and returns a string that contains a UUID.
function uuid() {
	const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const ALPHABETS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const PATTERNS = [8, 4, 4, 4, 12];
  const CHOICES = ['number', 'alphabet'];
  let out = '';

  for (let pattern of PATTERNS) {
    for (let i = 0; i < pattern; i++) {
      let choice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
      if (choice === 'number') {
        out += NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
      } else {
        out += ALPHABETS[Math.floor(Math.random() * ALPHABETS.length)];
      }
    }
    out += '-';
  }
  return out.slice(0, out.length - 1);
}

console.log(uuid());



















