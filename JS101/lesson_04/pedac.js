// PROBLEM:

// Given a string, write a function `palindromeSubstrings` which returns
// all the substrings from a given string which are palindromes. Consider
// palindrome words case sensitive.

// Test cases:

// console.log(palindromeSubstrings("supercalifragilisticexpialidocious"))
// should return: ["ili"]
//
// console.log(palindromeSubstrings("abcddcbA"))
// should return: ["bcddcb", "cddc", "dd"]
//
// console.log(palindromeSubstrings("palindrome"))
// should log: []
//
// console.log(palindromeSubstrings(""))
// should log: []



// [Understand the] Problem
//
// Questions:
// 1. Is the input always a string?
// 2. Case sensitive?
//
// Input: Always strings
// Output: Array of strings
//
// Rules:
// Explicit:
// - Identify all the palindromes and push them to our output array
// - Return that array
//
// Implicit:
// - If it is an empty string, return an empty string

// Algorithm:
// Dynamic Programming - Array of arrays
//
function palindromeSubstrings(text) {
  let out = [];
  let n = text.length;
  let dp = new Array(n);
  for (let i = 0; i < dp.length; i++) {
    dp[i] = new Array(n);
  }

  for (let j = 0; j < n; j++) {
    dp[j][j] = true;
  }

  for (let r = n - 1; r > 0; r--) {
    for (let c = r + 1; c < n; c++) {
      if (text[r] === text[c]) {
        if (((c - r + 1) === 2) || (dp[r + 1][c - 1])) {
          dp[r][c] = true;
          out.push(text.slice(r, c + 1));
        }
      }
    }
  }
  return out
}

console.log(palindromeSubstrings("supercalifragilisticexpialidocious")); // ["ili"]
console.log(palindromeSubstrings("abcddcbA"));   // ["bcddcb", "cddc", "dd"]
console.log(palindromeSubstrings("palindrome")); // []
console.log(palindromeSubstrings(""));           // []























