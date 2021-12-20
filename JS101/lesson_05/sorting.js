// Sort by length - smallest to largest;
let words = ['go', 'ahead', 'and', 'jump'];
words.sort((a, b) => a.length - b.length);
console.log(words);


// Sort this to >>> [[1, 4, 2], [3, 6, 4], [6, 8, 9]];
// It is sorted by the total score
// (i.e) 1 + 4 + 2 = 7, 3 + 6 + 4 = 13, 6 + 8 + 9 = 23
let scores = [[3, 6, 4], [6, 8, 9], [1, 4, 2]];
scores.sort((a, b) => {
  let sumA = a.reduce((prev, curr) => {
    prev += curr;
    return prev;
  }, 0);

  let sumB = b.reduce((prev, curr) => {
    prev += curr;
    return prev;
  }, 0);

  return sumA - sumB;
});
console.log(scores);
