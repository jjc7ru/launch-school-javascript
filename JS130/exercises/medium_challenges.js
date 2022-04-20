class Diamond {
  constructor(letter) {
    this.letter = letter;
    this.alphabets = this._getAllAlphabets();
    this.alphaLenObj = this._createAlphaLenObj();
  }

  _getAllAlphabets() {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
      'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  }

  _createAlphaLenObj() {
    let obj = {A: 1};
    for (let index = 1; index < this.alphabets.length; index += 1) {
      obj[this.alphabets[index]] = obj[this.alphabets[index - 1]] + 2;
    }
    return obj;
  }

  _createDiamondLetterArray() {
    let letters = ['A'];
    let [direction, index] = [1, 1];
    while (this.alphabets[index] !== 'A') {
      letters.push(this.alphabets[index]);
      if (this.alphabets[index] === this.letter) {
        direction *= -1;
      }
      index += direction;
    }
    letters.push('A');
    return letters;
  }

  _calculateInnerSpaces(letter) {
    if (letter === 'A') return 0;
    return this.alphaLenObj[letter] - 2;
  }

  _calculateOuterSpaces(letter) {
    return this.alphaLenObj[this.letter] - this.alphaLenObj[letter];
  }

  _createLineforA() {
    return ' '.repeat(this._calculateOuterSpaces('A') / 2) + 'A' + 
      ' '.repeat(this._calculateOuterSpaces('A') / 2) + '\n';
  }

  _createLine(letter) {
    if (letter === 'A') return this._createLineforA();
    return ' '.repeat(this._calculateOuterSpaces(letter) / 2) + letter + 
      ' '.repeat(this._calculateInnerSpaces(letter)) + letter +
      ' '.repeat(this._calculateOuterSpaces(letter) / 2) + '\n';
  }

  static makeDiamond(letter) {
    if (letter === 'A') return 'A\n';
    let out = '';
    let diamond = new Diamond(letter);
    let letterArray = diamond._createDiamondLetterArray();
    for (let letter of letterArray) {
      out += diamond._createLine(letter);
    }
    return out;
  };
}


class Robot {
  constructor() {
  }

  name() {};
}

module.exports = {
  Diamond,
}
