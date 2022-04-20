"use strict";

class Triangle {
  constructor(side1, side2, side3) {
    this.side1 = side1;
    this.side2 = side2;
    this.side3 = side3;

    if (!(this.isValid())) throw new TypeError("Not a valid triangle");
  }

  isValid() {
    if (this.side1 <= 0 || this.side2 <= 0 || this.side3 <= 0) return false;
    if (this.side1 + this.side2 <= this.side3 ||
      this.side1 + this.side3 <= this.side2 ||
      this.side2 + this.side3 <= this.side1) return false;
    return true;
  }

  kind() {
    if (this.side1 === this.side2 && this.side2 === this.side3) return 'equilateral';
    if (this.side1 === this.side2 || 
      this.side1 === this.side3 ||
      this.side2 === this.side3) return 'isosceles';
    return 'scalene';
  }
}


class DNA {
  constructor(seq1) {
    this.seq1 = seq1;
  }

  hammingDistance(seq2) {
    let maxSequenceIndex = Math.min(this.seq1.length, seq2.length);
    let difference = 0;
    for (let index = 0; index < maxSequenceIndex; index += 1) {
      if (this.seq1[index] !== seq2[index]) difference += 1;
    }
    return difference;
  }
}


class RomanNumeral {
  constructor(number) {
    this.number = Number(number);
    this.mapper = new Map();
    this.createMapper();
  }

  createMapper() {
    this.mapper.set(1000, 'M');
    this.mapper.set(900, 'CM');
    this.mapper.set(500, 'D');
    this.mapper.set(400, 'CD');
    this.mapper.set(100, 'C');
    this.mapper.set(90, 'XC');
    this.mapper.set(50, 'L');
    this.mapper.set(40, 'XL');
    this.mapper.set(10, 'X');
    this.mapper.set(9, 'IX');
    this.mapper.set(5, 'V');
    this.mapper.set(4, 'IV');
    this.mapper.set(1, 'I');
  }

  toRoman() {
    let string = '';
    let div;
    let mod = this.number;
    for (let key of this.mapper.keys()) {
      [div, mod] = [Math.floor(mod / key), mod % key];
      string += this.mapper.get(key).repeat(div);
    }
    return string;
  }
}


class Anagram {
  constructor(string) {
    this.string = string.toLowerCase();
    this.chars = {};
    this.charCount();
  }

  charCount() {
    for (let char of this.string) {
      this.chars[char] = this.chars[char] || 0;
      this.chars[char] += 1;
    }
  }

  // Uses hashmap
  matchHash(strings) {
    let anagrams = [];
    for (let string of strings) {
      let stringLower = string.toLowerCase();
      if (this.string === stringLower || 
        this.string.length !== stringLower.length) continue;
      let charsCopy = {...this.chars};
      for (let char of stringLower) {
        if (!charsCopy[char]) break;
        charsCopy[char] -= 1;
        if (charsCopy[char] === 0) delete charsCopy[char];
      }
      if (Object.keys(charsCopy).length === 0) anagrams.push(string);
    }
    return anagrams;
  }

  // Uses sorting
  match(strings) {
    let anagrams = [];
    for (let string of strings) {
      let stringLower = string.toLowerCase();
      if (this.string === stringLower) continue;

      let sortedString = this.string.split('').sort().join('');
      let sortedTempString = stringLower.split('').sort().join('');
      if (sortedString === sortedTempString) anagrams.push(string);
    }
    return anagrams;
  }
}


class Scrabble {
  constructor(string) {
    this.string = string;
    this.scores = {
      a: 1,
      e: 1,
      i: 1,
      o: 1,
      u: 1,
      l: 1,
      n: 1,
      r: 1,
      s: 1,
      t: 1,
      d: 2,
      g: 2,
      b: 3,
      c: 3,
      m: 3,
      p: 3,
      f: 4,
      h: 4,
      v: 4,
      w: 4,
      y: 4,
      k: 5,
      j: 8,
      x: 8,
      q: 10,
      z: 10,
    };
  }

  score(string = this.string) {
    if (!string) return 0;
    let stringLower = string.toLowerCase();
    let total = 0;
    for (let char of stringLower) {
      total += this.scores[char] || 0;
    }
    return total;
  }

  static score(string) {
    return new Scrabble(string).score();
  }
}


class PerfectNumber {
  static classify(number) {
    if (number < 1) throw Error("Number has to be greater than or equal to 1");

    let total = 0;
    for (let i = 1; i < Math.floor(number / 2) + 1; i += 1) {
      if (number % i === 0) total += i;
    }

    if (total === number) return 'perfect';
    if (total > number) return 'abundant';
    if (total < number) return 'deficient';
  }
}


class Octal {
  constructor(number) {
    this.number = number;
  }

  toDecimal() {
    if (this.number.match(/[^0-7]/g)) return 0;
    let total = 0;
    for (let i = this.number.length - 1; i > -1; i -= 1) {
      let power = this.number.length - i - 1;
      total += Number(this.number[i]) * 8 ** power;
    }
    return total;
  }
}


class SumOfMultiples {
  constructor(...multiples) {
    this.multiples = (multiples.length > 0) ? multiples : [3, 5];
  }

  to(number) {
    let total = 0;
    for (let i = 1; i < number; i += 1) {
      if (this.multiples.some(multiple => i % multiple === 0)) total += i;
    }
    return total;
  }

  static to(number) {
    let som = new SumOfMultiples();
    return som.to(number);
  }
}


class BeerSong {
  static verse(verseNum) {
    let song = new BeerSong();
    return song.oneVerse(verseNum);
  }

  static verses(verseNum1, verseNum2) {
    let song = new BeerSong();
    let total = '';
    for (let v = verseNum1; v >= verseNum2; v -= 1) {
      total += song.oneVerse(v);
      if (v !== verseNum2) total += '\n';
    }
    return total;
  }

  static lyrics() {
    return BeerSong.verses(99, 0);
  }

  oneVerse(verse) {
    let numBottles;
    if (verse >= 3) {
      numBottles = [verse + ' bottles', verse - 1 + ' bottles', 'one'];
    } else if (verse === 2) {
      numBottles = [verse + ' bottles', verse - 1 + ' bottle', 'one'];
    } else if (verse === 1) {
      numBottles = [verse + ' bottle', 'no more bottles', 'it'];
    } else {
      return 'No more bottles of beer on the wall, no more ' +
        'bottles of beer.\nGo to the store and buy some ' +
        'more, 99 bottles of beer on the wall.\n';
    }
    return numBottles[0] + ' of beer on the wall, ' + numBottles[0] + 
      ' of beer.\n' + 'Take ' + numBottles[2] +  ' down and pass it around, ' + 
      numBottles[1] + ' of beer on the wall.\n';
  }
};


class Series {
  constructor(numbers) {
    this.numbers = numbers;
  }

  slices(size) {
    let grouped = [];
    if (size > this.numbers.length) {
      throw new Error("Window size is larger than the length of numbers");
    }

    for (let i = 0; i < this.numbers.length; i += 1) {
      let temp = [];
      let to = i + size;
      if (to > this.numbers.length) break;
      this.numbers.slice(i, to).split('').forEach(char => temp.push(Number(char)));
      grouped.push(temp);
    }
    return grouped;
  }
}


module.exports = {
  Triangle,
  DNA,
  RomanNumeral,
  Anagram,
  Scrabble,
  PerfectNumber,
  Octal,
  SumOfMultiples,
  BeerSong,
  Series,
};


















