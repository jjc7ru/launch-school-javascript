// (1) Lettercase Percentage Ratio
function letterPercentages(string) {
  let counter = {};
  counter['lower'] = 0;
  counter['upper'] = 0;
  counter['neither'] = 0;

  let n = string.length;
  let out = {};

  for (let character of string) {
    if (character.match(/[a-z]/g)) {
      counter['lower'] += 1;
    } else if (character.match(/[A-Z]/g)) {
      counter['upper'] += 1;
    } else {
      counter['neither'] += 1;
    }
  }

  out['lowercase'] = (round(counter['lower'] / n, 2) * 100).toFixed(2);
  out['uppercase'] = (round(counter['upper'] / n, 2) * 100).toFixed(2);
  out['neither'] = (round(counter['neither'] / n, 2) * 100).toFixed(2);
  return out;

  function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  }
}

//console.log(letterPercentages('abCdef 123')); // { lowercase: "50.00", uppercase: "10.00", neither: "40.00" }
//console.log(letterPercentages('AbCd +Ef')); // { lowercase: "37.50", uppercase: "37.50", neither: "25.00" }
//console.log(letterPercentages('123')); // { lowercase: "0.00", uppercase: "0.00", neither: "100.00" }


// (2) Triangle Sides
function triangles(s1, s2, s3) {
  let sides = [s1, s2, s3];
  if (s1 < 1 || s2 < 1 || s3 < 1) {
    return "invalid"
  }

  let maxS = Math.max(...sides);
  let maxSIndex = sides.indexOf(maxS);

  if ((totalSum(sides) - maxS) <= maxS) {
    return "invalid"
  }

  if ((s1 === s2) && (s2 === s3)) {
    return "equilateral";
  } else if ((s1 !== s2) && (s2 !== s3)) {
    return "scalene";
  } else {
    return "isosceles";
  }

  function totalSum(array) {
    return array.reduce((prev, curr) => {
      return prev + curr;
    }, 0) 
  }
}

//console.log(triangles(3, 3, 3));        // "equilateral"
//console.log(triangles(3, 3, 1.5));      // "isosceles"
//console.log(triangles(3, 4, 5));        // "scalene"
//console.log(triangles(0, 3, 3));        // "invalid"
//console.log(triangles(3, 1, 1));        // "invalid"



// (3) Tri-Angles
function triangle(a1, a2, a3) {
  // sum(a1, a2, a3) === 180 && every angle > 0 ... true
  let anglesTotal = a1 + a2 + a3;
  if ((anglesTotal !== 180) && (a1 <= 0) && (a2 <= 0) && (a3 <= 0)) {
    return "invalid";
  } 

  if (a1 < 90 && a2 < 90 && a3 < 90) {
    return 'acute';
  } else if (a1 === 90 || a2 === 90 || a3 === 90) {
    return 'right';
  } else {
    return 'obtuse'
  }
}

//console.log(triangle(60, 70, 50));       // "acute"
//console.log(triangle(30, 90, 60));       // "right"
//console.log(triangle(120, 50, 10));      // "obtuse"
//console.log(triangle(0, 90, 90));        // "invalid"
//console.log(triangle(50, 50, 50));       // "invalid"


// (4) Unlucky Days
function fridayThe13ths(year) {
  let total = 0;
  let date;
  for (let i = 0; i < 12; i++) {
    date = new Date(year, i, 13);
    let day = date.getDay();
    if (day === 5) {
      total ++;
    }
  }
  return total;
}


//console.log(fridayThe13ths(1986));      // 1
//console.log(fridayThe13ths(2015));      // 3
//console.log(fridayThe13ths(2017));      // 2


// (5) Next featured number higher than a given value
function featured(num) {
  const MAX_FEATURED_NUMBER = 9876543201;
  let featuredNumber = oddAndMultipleOfSeven(num);
  if (featuredNumber >= MAX_FEATURED_NUMBER) {
    return 'No possible number';
  }
  while (!unique(featuredNumber)) {
    featuredNumber += 14;
  }

  return featuredNumber;


  function oddAndMultipleOfSeven(num) {
    while (num % 2 === 0 || num % 7 !== 0) {
      num++;
    }
    return num;
  }

  function unique(num) {
    let stringNum = String(num).split('').sort();
    for (let i = 1; i < stringNum.length; i++) {
      if (stringNum[i] === stringNum[i - 1]) {
        return false;
      }
    }
    return true;
  }
}


//console.log(featured(12));           // 21
//console.log(featured(20));           // 21
//console.log(featured(21));           // 35
//console.log(featured(997));          // 1029
//console.log(featured(1029));         // 1043
//console.log(featured(999999));       // 1023547
//console.log(featured(999999987));    // 1023456987
//console.log(featured(9876543186));   // 9876543201
//console.log(featured(9876543200));   // 9876543201
//console.log(featured(9876543201));   // "There is no possible number that fulfills those requirements."



// (6) Sum Square - Square Sum
function sumSquareDifference(num) {
  let squareOfSum = 0;
  let sumOfSquare = 0;
  for (let i = 1; i < num + 1; i++) {
    squareOfSum += i;
    sumOfSquare += i**2;
  }
  squareOfSum **= 2;
  return squareOfSum - sumOfSquare;
}

//console.log(sumSquareDifference(3));      // 22 --> (1 + 2 + 3)**2 - (1**2 + 2**2 + 3**2)
//console.log(sumSquareDifference(10));     // 2640
//console.log(sumSquareDifference(1));      // 0
//console.log(sumSquareDifference(100));    // 25164150



// (7) Bubble Sort
function bubbleSort(array) {
  let counter = 1;
  while (counter > 0) {
    counter = bubble(array, 0);
  }

  function bubble(array, counter) {
    for (let i = 0; i < array.length; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (array[i] > array[j]) {
          [array[i], array[j]] = [array[j], array[i]];
          counter++;
        }
      }
    }
    return counter;
  }

  return array;
}

console.log(bubbleSort([3, 2, 1]));
console.log(bubbleSort([6, 2, 7, 1, 4]));
console.log(bubbleSort(['Sue', 'Pete', 'Alice', 'Tyler', 'Rachel', 'Kim', 'Bonnie']));


// (8) Longest Sentence
function longestSentence(longText) {
  let startIndex = 0;
  let endIndex = 0;
  let maxWords = Number.MIN_VALUE;
  let sentence = '';
  let maxSentence = '';
  let ENDING_PUNCTUATION = ['.', '!', '?'];

  for (let i = 0; i < longText.length; i++) {
    if (ENDING_PUNCTUATION.includes(longText[i])) {
      startIndex = endIndex + 1;
      endIndex = i + 1;
      sentence = longText.slice(startIndex, endIndex);
      maxWords = Math.max(maxWords, sentence.split(' ').length);
      if (sentence.split(' ').length === maxWords) {
        maxSentence = sentence;
      }
    }
  }

  return [maxSentence, `The longest sentence has ${maxWords} words`];
}


let longText =
  'Four score and seven years ago our fathers brought forth on this ' +
  'continent a new nation, conceived in liberty, and dedicated to the ' +
  'proposition that all men are created equal. Now we are engaged in a ' +
  'great civil war, testing whether that nation, or any nation so ' +
  'conceived and so dedicated, can long endure. We are met on a great ' +
  'battlefield of that war. We have come to dedicate a portion of that ' +
  'field, as a final resting place for those who here gave their lives ' +
  'that that nation might live. It is altogether fitting and proper that ' +
  'we should do this.';

let longerText = longText +
  'But, in a larger sense, we can not dedicate, we can not consecrate, ' +
  'we can not hallow this ground. The brave men, living and dead, who ' +
  'struggled here, have consecrated it, far above our poor power to add ' +
  'or detract. The world will little note, nor long remember what we say ' +
  'here but it can never forget what they did here. It is for us the ' +
  'living, rather, to be dedicated here to the unfinished work which ' +
  'they who fought here have thus far so nobly advanced. It is rather ' +
  'for us to be here dedicated to the great task remaining before us -- ' +
  'that from these honored dead we take increased devotion to that ' +
  'cause for which they gave the last full measure of devotion -- that ' +
  'we here highly resolve that these dead shall not have died in vain ' +
  '-- that this nation, under God, shall have a new birth of freedom -- ' +
  'and that government of the people, by the people, for the people, ' +
  'shall not perish from the earth.';

console.log(longestSentence(longText));
// Four score and seven years ago our fathers brought forth on this continent a new nation, conceived in liberty, and dedicated to the proposition that all men are created equal.
//
// The longest sentence has 30 words.

console.log(longestSentence(longerText));
// It is rather for us to be here dedicated to the great task remaining before us -- that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion -- that we here highly resolve that these dead shall not have died in vain -- that this nation, under God, shall have a new birth of freedom -- and that government of the people, by the people, for the people, shall not perish from the earth.
//
// The longest sentence has 86 words.

console.log(longestSentence("Where do you think you're going? What's up, Doc?"));
// Where do you think you're going?
//
// The longest sentence has 6 words.

console.log(longestSentence("To be or not to be! Is that the question?"));
// To be or not to be!
//
// The longest sentence has 6 words.





























