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
  static ALPHA = Robot.createAlpha();
  static NUMBERS = Robot.createNumbers();
  static NAMES = new Set();
  
  constructor() {
    this.robotName = this.preprocessing();
  }

  preprocessing() {
    let name = this.createRandomName();
    while (Robot.NAMES.has(name)) {
      name = this.createRandomName();
    }
    this.pushRandomName(name);
    return name;
  }

  static createAlpha() {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
      'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  };

  static createNumbers() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

  randomAlphaIndex() {
    return Math.floor(Math.random() * (Robot.ALPHA.length - 1));
  }

  randomNumberIndex() {
    return Math.floor(Math.random() * (Robot.NUMBERS.length - 1));
  }

  createRandomName() {
    let out = '';
    for (let i = 0; i < 2; i += 1) out += Robot.ALPHA[this.randomAlphaIndex()];
    for (let i = 0; i < 3; i += 1) out += Robot.NUMBERS[this.randomNumberIndex()];
    return out;
  }

  pushRandomName(name) {
    Robot.NAMES.add(name);
  }

  name() {
    return this.robotName;
  }

  reset() {
    let robot = new Robot();
    this.robotName = robot.robotName;
  }
}


class Clock {
  constructor() {
    this.hour = 0;
    this.minute = 0;
  }

  static at(hour, minute = 0) {
    let clock = new Clock();

    if (hour === 0) {
      clock.hour = 24;
      clock.minute = minute;
      return clock;
    }
    clock.hour += hour;
    clock.minute = minute;
    return clock;
  };

  add(minute) {
    this.minute += minute;
    return this;
  };

  subtract(minute) {
    this.minute -= minute;
    return this;
  }
  
  needsUpdate() {
    if (this.minute < 0 || this.minute > 59) return true;
    return false;
  }

  minutePositive() {
    let hour = Math.floor(this.minute / 60);
    let minute = this.minute % 60;
    this.hour = (this.hour += hour) % 24;
    this.minute = minute;
  };

  minuteNegative() {
    let upperBound = 60;
    while (upperBound < Math.abs(this.minute)) upperBound += 60;
    let positiveMin = upperBound + this.minute + upperBound;
    this.hour = (this.hour - (Math.floor(positiveMin / 60) % 24)) % 24;
    this.minute = positiveMin % 60;
  };

  update() {
    if (!this.needsUpdate()) return;
    if (this.minute >= 0) {
      this.minutePositive();
    } else {
      this.minuteNegative();
    }
  }

  isEqual(clock) {
    return JSON.stringify(this) === JSON.stringify(clock);
  }

  toString() {
    this.update();
    let [strHour, strMin] = [String(this.hour), String(this.minute)];
    if (strHour.length !== 2) strHour = '0' + strHour;
    if (strMin.length !== 2) strMin = '0' + strMin;
    return strHour + ':' + strMin;
  }
}


module.exports = {
  Diamond,
  Robot,
  Clock,
}
