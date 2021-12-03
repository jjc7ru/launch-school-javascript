// (8) Write a program that uses this array to create an object where the names 
// are the keys and the values are the positions in the array:

let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Pebbles", "Bambam"];
let answer1 = {};
for (let [key, value] of Object.entries(flintstones)) {
  answer1[value] = Number(key);
}
console.log(answer1);

let answer2 = {};
flintstones.forEach((key, value) => {
  answer2[key] = value;
});
console.log(answer2);

// (9) Add all the ages

let ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237
};

// For loop method
let keys = Object.keys(ages);
let agesSum = 0;
for (let [key, value] of Object.entries(ages)) {
  agesSum += value;
}
console.log(agesSum);

// forEach method
let agesSum2 = 0;
Object.entries(ages).forEach(pair => {
  agesSum2 += pair[1];
});
console.log(agesSum2);

// reduce method
let agesSum3 = Object.entries(ages).reduce((prev, curr) => {
  return prev = prev + curr[1];
}, 0);
console.log(agesSum3);

// (10) Pick out the minimum age from our current Munster family object:

ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237
};

let ageArr = Object.values(ages);
console.log(Math.min(...ageArr));


// (11) Create an object that expresses the frequency with which each letter occurs in this string:
let statement = "The Flintstones Rock";
let charCounter = {};

// method 1
for (let character of statement) {
  if (Object.keys(charCounter).includes(character)) {
    charCounter[character]++;
  } else {
    charCounter[character] = 1;
  }
}
console.log(charCounter);

// method 2 - short circuiting
charCounter = {};
for (let character of statement) {
  charCounter[character] = charCounter[character] || 0;
  charCounter[character] ++;
}
console.log(charCounter);















