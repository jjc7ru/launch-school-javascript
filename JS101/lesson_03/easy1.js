// Lesson 03 - Practice Problem: Easy 1


// (1) Answered

// (2)
//let str1 = "Come over here!"; // true
//let str2 = "What's up, Doc?"; // false

function endsWithExclamation(str) {
  if (str[str.length - 1] === '!') {
    return true;
  }

  return false;
}

//console.log(endsWithExclamation(str1));
//console.log(endsWithExclamation(str2));

// (3)
let ages = { Herman: 32, Lily: 30, Grandpa: 402, Eddie: 10 };

function valueInObject(value, obj) {
  for (let val in obj) {
    if (val === value) {
      return true;
    }
  }
  return false;
}

//console.log(valueInObject('Eddie', ages));

// (4)
let munstersDescription = "the Munsters are CREEPY and Spooky.";
// => The munsters are creepy and spooky.

function lowerCaseExceptFirstLetter(str) {
  let len = str.length
  if (len === 0) {
    return str;
  } else if (len === 1) {
    return str[0].toUpperCase();
  }

  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

//console.log(lowerCaseExceptFirstLetter(munstersDescription));

// (6)
let ages2 = { Herman: 32, Lily: 30, Grandpa: 5843, Eddie: 10 };
let additionalAges = { Marilyn: 22, Spot: 237 };

Object.assign(ages2, additionalAges);

// (7)
let str1 = "Few things in life are as important as house training your pet dinosaur.";
let str2 = "Fred and Wilma have a pet dinosaur named Dino.";

function findWord(sentence, word) {
  arr = sentence.split(' ');
  for (let wrd of arr) {
    xwrd = wrd.replace(/[^a-zA-Z]/g, '');
    console.log(xwrd);
    if (wrd === word) {
      return true;
    }
  }
  return false;
}

//console.log(findWord(str1, 'Dino'));
//console.log(findWord(str2, 'Dino'));

// (8)
let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Bambam", "Pebbles"];
flintstones.push('Dino');

//console.log(flintstones);

// (9)
flintstones.push('Dino', 'Hoppy');

//console.log(flintstones);

// (10)
let advice = "Few things in life are as important as house training your pet dinosaur.";

// Expected return value:
// => 'Few things in life are as important as '

let houseIndex = advice.indexOf('house');
console.log(advice.slice(0, houseIndex));
