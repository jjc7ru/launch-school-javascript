const {
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
} = require("./easy_challenges");

describe('The Triangle class', () => {
	test("equilateral triangles have equal sides", () => {
    const triangle = new Triangle(2, 2, 2);
    expect(triangle.kind()).toEqual("equilateral");
  });

  test("larger equilateral triangles also have equal sides", () => {
    const triangle = new Triangle(10, 10, 10);
    expect(triangle.kind()).toEqual("equilateral");
  });

  test("isosceles triangles have last two sides equal", () => {
    const triangle = new Triangle(3, 4, 4);
    expect(triangle.kind()).toEqual("isosceles");
  });

  test("isosceles trianges have first and last sides equal", () => {
    const triangle = new Triangle(4, 3, 4);
    expect(triangle.kind()).toEqual("isosceles");
  });
  
  test("isosceles triangles have two first sides equal", () => {
    const triangle = new Triangle(4, 4, 3);
    expect(triangle.kind()).toEqual("isosceles");
  });

  test("isosceles triangles have in fact exactly two sides equal", () => {
    const triangle = new Triangle(10, 10, 2);
    expect(triangle.kind()).toEqual("isosceles");
  });

  test("scalene triangles have no equal sides", () => {
    const triangle = new Triangle(3, 4, 5);
    expect(triangle.kind()).toEqual("scalene");
  });

  test("scalene triangles have no equal sides at a larger scale too", () => {
    const triangle = new Triangle(10, 11, 12);
    expect(triangle.kind()).toEqual("scalene");
  });

  test("scalene triangles have no equal sides in descending order either", () => {
    const triangle = new Triangle(5, 4, 2);
    expect(triangle.kind()).toEqual("scalene");
  });

  test("very small triangles are legal", () => {
    const triangle = new Triangle(0.4, 0.6, 0.3);
    expect(triangle.kind()).toEqual("scalene");
  });

  test("test triangles with no size are illegal", () => {
    expect(() => { new Triangle(0, 0, 0) }).toThrow();
  });

  test("triangles with negative sides are illegal", () => {
    expect(() => { new Triangle(3, 4, -5) }).toThrow();
  });

  test("triangles violating triangle inequality are illegal", () => {
    expect(() => { new Triangle(1, 1, 3) }).toThrow();
  });

  test("triangles violating triangle inequality are illegal 2", () => {
    expect(() => { new Triangle(7, 3, 2) }).toThrow();
  });

  test("triangles violating triangle inequality are illegal 3", () => {
    expect(() => { new Triangle(10, 1, 3) }).toThrow();
  });

  test("triangles violating triangle inequality are illegal 4", () => {
    expect(() => { new Triangle(1, 1, 2) }).toThrow();
  });
});


describe("Testing HammingDistance class", () => {
  test("no difference between empty strands", () => {
    let dna = new DNA('');
    expect(dna.hammingDistance('')).toBe(0);
  });

  test("no difference between identical strands", () => {
    let dna = new DNA('GGACTGA');
    expect(dna.hammingDistance('GGACTGA')).toBe(0);
  });

  test("complete hamming distance in small strand", () => {
    let dna = new DNA('ACT');
    expect(dna.hammingDistance('GGA')).toBe(3);
  });

  test("hamming distance in off by one strand", () => {
    let strand = 'GGACGGATTCTGACCTGGACTAATTTTGGGG'
    let distance = 'AGGACGGATTCTGACCTGGACTAATTTTGGGG'
    let dna = new DNA(strand);
    expect(dna.hammingDistance(distance)).toBe(19);
  });

  test("small hamming distance in middle somewhere", () => {
    let dna = new DNA('GGACG');
    expect(dna.hammingDistance('GGTCG')).toBe(1);
  });

  test("larger distance", () => {
    let dna = new DNA('ACCAGGG');
    expect(dna.hammingDistance('ACTATGG')).toBe(2);
  });

  test("ignores extra length on other strand when longer", () => {
    let dna = new DNA('AAACTAGGGG');
    expect(dna.hammingDistance('AGGCTAGCGGTAGGAC')).toBe(3);
  });

  test("ignores extra length on original strand when longer", () => {
    let dna = new DNA('GACTACGGACAGGGTAGGGAAT');
    let distance = 'GACATCGCACACC';
    expect(dna.hammingDistance(distance)).toBe(5);
  });

  test("does not actually shorten original strand", () => {
    let dna = new DNA('AGACAACAGCCAGCCGCCGGATT');
    expect(dna.hammingDistance('AGGCAA')).toBe(1);
    expect(dna.hammingDistance('AGACATCTTTCAGCCGCCGGATTAGGCAA')).toBe(4);
    expect(dna.hammingDistance('AGG')).toBe(1);
  });
});


describe('tests the RomanNumeral class', () => {
  test('1', () => {
    let number = new RomanNumeral(1);
    expect(number.toRoman()).toBe('I');
  });

  test('2', () => {
    let number = new RomanNumeral(2);
    expect(number.toRoman()).toBe('II');
  });

  test('3', () => {
    let number = new RomanNumeral(3);
    expect(number.toRoman()).toBe('III');
  });

  test('4', () => {
    let number = new RomanNumeral(4);
    expect(number.toRoman()).toBe('IV');
  });

  test('5', () => {
    let number = new RomanNumeral(5);
    expect(number.toRoman()).toBe('V');
  });

  test('6', () => {
    let number = new RomanNumeral(6);
    expect(number.toRoman()).toBe('VI');
  });

  test('9', () => {
    let number = new RomanNumeral(9);
    expect(number.toRoman()).toBe('IX');
  });

  test('27', () => {
    let number = new RomanNumeral(27);
    expect(number.toRoman()).toBe('XXVII');
  });

  test('48', () => {
    let number = new RomanNumeral(48);
    expect(number.toRoman()).toBe('XLVIII');
  });

  test('59', () => {
    let number = new RomanNumeral(59);
    expect(number.toRoman()).toBe('LIX');
  });

  test('93', () => {
    let number = new RomanNumeral(93);
    expect(number.toRoman()).toBe('XCIII');
  });

  test('141', () => {
    let number = new RomanNumeral(141);
    expect(number.toRoman()).toBe('CXLI');
  });

  test('163', () => {
    let number = new RomanNumeral(163);
    expect(number.toRoman()).toBe('CLXIII');
  });

  test('402', () => {
    let number = new RomanNumeral(402);
    expect(number.toRoman()).toBe('CDII');
  });

  test('575', () => {
    let number = new RomanNumeral(575);
    expect(number.toRoman()).toBe('DLXXV');
  });

  test('911', () => {
    let number = new RomanNumeral(911);
    expect(number.toRoman()).toBe('CMXI');
  });

  test('1024', () => {
    let number = new RomanNumeral(1024);
    expect(number.toRoman()).toBe('MXXIV');
  });

  test('3000', () => {
    let number = new RomanNumeral(3000);
    expect(number.toRoman()).toBe('MMM');
  });
});


describe("Anagram", () => {
  test("No matches returns empty array", () => {
    let detector = new Anagram('diaper');
    expect(detector.match(['hello', 'world', 'zombies', 'pants'])).toEqual([]);
  });

  test("Detect simple anagram", () => {
    let detector = new Anagram('ant');
    let anagrams = detector.match(['tan', 'stand', 'at']);
    expect(anagrams).toEqual(['tan']);
  });

  test("Detect multiple anagrams", () => {
    let detector = new Anagram('master');
    let anagrams = detector.match(['stream', 'pigeon', 'maters']);
    expect(anagrams.sort()).toEqual(['maters', 'stream']);
  });

  test("Do not confuse different duplicates", () => {
    let detector = new Anagram('galea');
    expect(detector.match(['eagle'])).toEqual([]);
  });

  test("Identical word is not anagram", () => {
    let detector = new Anagram('corn');
    let anagrams = detector.match(['corn', 'dark', 'Corn', 'rank', 'CORN', 'cron', 'park']);
    expect(anagrams).toEqual(['cron']);
  });

  test("Eliminate anagrams with same checksum", () => {
    let detector = new Anagram('mass');
    expect(detector.match(['last'])).toEqual([]);
  });

  test("Eliminate anagram subsets", () => {
    let detector = new Anagram('good');
    expect(detector.match(['dog', 'goody'])).toEqual([]);
  });

  test("Detect anagram", () => {
    let detector = new Anagram('listen');
    let anagrams = detector.match(['enlists', 'google', 'inlets', 'banana']);
    expect(anagrams).toEqual(['inlets']);
  });

  test("Multiple anagrams", () => {
    let detector = new Anagram('allergy');
    let anagrams = detector.match(['gallery', 'ballerina', 'regally',
                                   'clergy', 'largely', 'leading']);
    expect(anagrams.sort()).toEqual(['gallery', 'largely', 'regally']);
  });

  test("Anagrams are case-insensitive", () => {
    let detector = new Anagram('Orchestra');
    let anagrams = detector.match(['cashregister', 'Carthorse', 'radishes']);
    expect(anagrams).toEqual(['Carthorse'])
  });
});


describe("Scrabble", () => {
  test("empty word scores zero", () => {
    expect(new Scrabble('').score()).toBe(0);
  });

  test("whitespace scores zero", () => {
    expect(new Scrabble(" \t\n").score()).toBe(0);
  });

  test("nil scores zero", () => {
    expect(new Scrabble(null).score()).toBe(0);
  });

  test("scores very short word", () => {
    expect(new Scrabble('a').score()).toBe(1);
  });

  test("scores other very short word", () => {
    expect(new Scrabble('f').score()).toBe(4);
  });

  test("simple word scores the number of letters", () => {
    expect(new Scrabble('street').score()).toBe(6);
  });

  test("complicated words score more", () => {
    expect(new Scrabble('quirky').score()).toBe(22);
  });

  test("scores are case-insensitive", () => {
    expect(new Scrabble('OXYPHENBUTAZONE').score()).toBe(41);
  });

  test("convenient scoring", () => {
    expect(Scrabble.score('alacrity')).toBe(13);
  });
});


describe("PerfectNumber", () => {
  test("negative raises error", () => {
    expect(() => { PerfectNumber.classify(-1) }).toThrow();
  });

  test("classify deficient", () => {
    expect(PerfectNumber.classify(13)).toEqual('deficient');
  });

  test("classify perfect", () => {
    expect(PerfectNumber.classify(28)).toEqual('perfect');
  });

  test("classify abundant", () => {
    expect(PerfectNumber.classify(12)).toEqual('abundant');
  });
});


describe("Octal", () => {
  test("octal 1 is decimal 1", () => {
    let octal = new Octal('1');
    expect(octal.toDecimal()).toBe(1);
  });

  test("octal 10 is decimal 8", () => {
    let octal = new Octal('10');
    expect(octal.toDecimal()).toBe(8);
  });

  test("octal 17 is decimal 15", () => {
    let octal = new Octal('17');
    expect(octal.toDecimal()).toBe(15);
  });

  test("octal 11 is decimal 9", () => {
    let octal = new Octal('11');
    expect(octal.toDecimal()).toEqual(9);
  });

  test("octal 130 is decimal 88", () => {
    let octal = new Octal('130');
    expect(octal.toDecimal()).toBe(88);
  });

  test("octal 2047 is decimal 1063", () => {
    let octal = new Octal('2047');
    expect(octal.toDecimal()).toBe(1063);
  });

  test("octal 7777 is decimal 4095", () => {
    let octal = new Octal('7777');
    expect(octal.toDecimal()).toBe(4095);
  });

  test("octal 1234567 is decimal 342391", () => {
    let octal = new Octal('1234567');
    expect(octal.toDecimal()).toBe(342391);
  });

  test("invalid octal is decimal 0", () => {
    let octal = new Octal('carrot');
    expect(octal.toDecimal()).toBe(0);
  });

  test("8 is seeen as invalid and returns 0", () => {
    let octal = new Octal('8');
    expect(octal.toDecimal()).toBe(0);
  });

  test("9 is seeen as invalid and returns 0", () => {
    let octal = new Octal('9');
    expect(octal.toDecimal()).toBe(0);
  });

  test("6789 is seeen as invalid and returns 0", () => {
    let octal = new Octal('6789');
    expect(octal.toDecimal()).toBe(0);
  });

  test("abc1z is seen as invalid and returns 0", () => {
    let octal = new Octal('abc1z');
    expect(octal.toDecimal()).toBe(0);
  });

  test("valid octal formatted string 011 is decimal 9", () => {
    let octal = new Octal('011');
    expect(octal.toDecimal()).toBe(9);
  });

  test("234abc is seen as invalid and returns 0", () => {
    let octal = new Octal('234abc');
    expect(octal.toDecimal()).toBe(0);
  });
});


describe("sum of multiples", () => {
  test("sum to one", () => {
    expect(SumOfMultiples.to(1)).toEqual(0);
  });

  test("sum to three", () => {
    expect(SumOfMultiples.to(4)).toEqual(3);
  });

  test("sum to ten", () => {
    expect(SumOfMultiples.to(10)).toEqual(23);
  });

  test("sum to one hundred", () => {
    expect(SumOfMultiples.to(100)).toEqual(2_318);
  });

  test("sum to one thousand", () => {
    expect(SumOfMultiples.to(1000)).toEqual(233_168);
  });

  test("configurable 7 13 17 to 20", () => {
    let obj = new SumOfMultiples(7, 13, 17);
    expect(obj.to(20)).toEqual(51);
  });

  test("configurable 4 6 to 15", () => {
    let obj = new SumOfMultiples(4, 6);
    expect(obj.to(15)).toEqual(30);
  });

  test("configurable 5 6 8 to 150", () => {
    let obj = new SumOfMultiples(5, 6, 8);
    expect(obj.to(150)).toEqual(4_419);
  });

  test("configurable 43 47 to 10,000", () => {
    let obj = new SumOfMultiples(43, 47);
    expect(obj.to(10_000)).toEqual(2_203_160);
  });
});


describe("Beer Song", () => {
  test("first verse", () => {
    let expected = "99 bottles of beer on the wall, 99 bottles of beer.\n" +
                   "Take one down and pass it around, 98 bottles of beer " +
                   "on the wall.\n";

    expect(BeerSong.verse(99)).toBe(expected);
  });

  test("another verse", () => {
    let expected = "3 bottles of beer on the wall, 3 bottles of beer.\n" +
                   "Take one down and pass it around, 2 bottles of beer " +
                   "on the wall.\n";

    expect(BeerSong.verse(3)).toBe(expected);
  });

  test("2 bottles verse", () => {
    let expected = "2 bottles of beer on the wall, 2 bottles of beer.\n" +
                   "Take one down and pass it around, 1 bottle of beer " +
                   "on the wall.\n";

    expect(BeerSong.verse(2)).toBe(expected);
  });

  test("1 bottle verse", () => {
    let expected = "1 bottle of beer on the wall, 1 bottle of beer.\n" +
                   "Take it down and pass it around, no more bottles " +
                   "of beer on the wall.\n";

    expect(BeerSong.verse(1)).toBe(expected);
  });

  test("no bottles verse", () => {
    let expected = "No more bottles of beer on the wall, no more " +
                   "bottles of beer.\nGo to the store and buy some " +
                   "more, 99 bottles of beer on the wall.\n";

    expect(BeerSong.verse(0)).toBe(expected);
  });

  test("a couple of verses", () => {
    let expected = "99 bottles of beer on the wall, 99 bottles of beer.\n" +
                   "Take one down and pass it around, 98 bottles of beer " +
                   "on the wall.\n\n98 bottles of beer on the wall, " +
                   "98 bottles of beer.\nTake one down and pass it " +
                   "around, 97 bottles of beer on the wall.\n";

    expect(BeerSong.verses(99, 98)).toBe(expected);
  });

  test("a few verses", () => {
    let expected = "2 bottles of beer on the wall, 2 bottles of beer.\n" +
                   "Take one down and pass it around, 1 bottle of beer " +
                   "on the wall.\n\n1 bottle of beer on the wall, 1 " +
                   "bottle of beer.\nTake it down and pass it around, " +
                   "no more bottles of beer on the wall.\n\n" +
                   "No more bottles of beer on the wall, no more " +
                   "bottles of beer.\nGo to the store and buy some " +
                   "more, 99 bottles of beer on the wall.\n";

    expect(BeerSong.verses(2, 0)).toBe(expected);
  });

  test("the whole song", () => {
    let expected = wholeSong();
    expect(BeerSong.lyrics()).toBe(expected);
  });
});

function wholeSong() {
  return "99 bottles of beer on the wall, 99 bottles of beer.\n" +
    "Take one down and pass it around, 98 bottles of beer on the wall.\n\n" +
    "98 bottles of beer on the wall, 98 bottles of beer.\n" +
    "Take one down and pass it around, 97 bottles of beer on the wall.\n\n" +
    "97 bottles of beer on the wall, 97 bottles of beer.\n" +
    "Take one down and pass it around, 96 bottles of beer on the wall.\n\n" +
    "96 bottles of beer on the wall, 96 bottles of beer.\n" +
    "Take one down and pass it around, 95 bottles of beer on the wall.\n\n" +
    "95 bottles of beer on the wall, 95 bottles of beer.\n" +
    "Take one down and pass it around, 94 bottles of beer on the wall.\n\n" +
    "94 bottles of beer on the wall, 94 bottles of beer.\n" +
    "Take one down and pass it around, 93 bottles of beer on the wall.\n\n" +
    "93 bottles of beer on the wall, 93 bottles of beer.\n" +
    "Take one down and pass it around, 92 bottles of beer on the wall.\n\n" +
    "92 bottles of beer on the wall, 92 bottles of beer.\n" +
    "Take one down and pass it around, 91 bottles of beer on the wall.\n\n" +
    "91 bottles of beer on the wall, 91 bottles of beer.\n" +
    "Take one down and pass it around, 90 bottles of beer on the wall.\n\n" +
    "90 bottles of beer on the wall, 90 bottles of beer.\n" +
    "Take one down and pass it around, 89 bottles of beer on the wall.\n\n" +
    "89 bottles of beer on the wall, 89 bottles of beer.\n" +
    "Take one down and pass it around, 88 bottles of beer on the wall.\n\n" +
    "88 bottles of beer on the wall, 88 bottles of beer.\n" +
    "Take one down and pass it around, 87 bottles of beer on the wall.\n\n" +
    "87 bottles of beer on the wall, 87 bottles of beer.\n" +
    "Take one down and pass it around, 86 bottles of beer on the wall.\n\n" +
    "86 bottles of beer on the wall, 86 bottles of beer.\n" +
    "Take one down and pass it around, 85 bottles of beer on the wall.\n\n" +
    "85 bottles of beer on the wall, 85 bottles of beer.\n" +
    "Take one down and pass it around, 84 bottles of beer on the wall.\n\n" +
    "84 bottles of beer on the wall, 84 bottles of beer.\n" +
    "Take one down and pass it around, 83 bottles of beer on the wall.\n\n" +
    "83 bottles of beer on the wall, 83 bottles of beer.\n" +
    "Take one down and pass it around, 82 bottles of beer on the wall.\n\n" +
    "82 bottles of beer on the wall, 82 bottles of beer.\n" +
    "Take one down and pass it around, 81 bottles of beer on the wall.\n\n" +
    "81 bottles of beer on the wall, 81 bottles of beer.\n" +
    "Take one down and pass it around, 80 bottles of beer on the wall.\n\n" +
    "80 bottles of beer on the wall, 80 bottles of beer.\n" +
    "Take one down and pass it around, 79 bottles of beer on the wall.\n\n" +
    "79 bottles of beer on the wall, 79 bottles of beer.\n" +
    "Take one down and pass it around, 78 bottles of beer on the wall.\n\n" +
    "78 bottles of beer on the wall, 78 bottles of beer.\n" +
    "Take one down and pass it around, 77 bottles of beer on the wall.\n\n" +
    "77 bottles of beer on the wall, 77 bottles of beer.\n" +
    "Take one down and pass it around, 76 bottles of beer on the wall.\n\n" +
    "76 bottles of beer on the wall, 76 bottles of beer.\n" +
    "Take one down and pass it around, 75 bottles of beer on the wall.\n\n" +
    "75 bottles of beer on the wall, 75 bottles of beer.\n" +
    "Take one down and pass it around, 74 bottles of beer on the wall.\n\n" +
    "74 bottles of beer on the wall, 74 bottles of beer.\n" +
    "Take one down and pass it around, 73 bottles of beer on the wall.\n\n" +
    "73 bottles of beer on the wall, 73 bottles of beer.\n" +
    "Take one down and pass it around, 72 bottles of beer on the wall.\n\n" +
    "72 bottles of beer on the wall, 72 bottles of beer.\n" +
    "Take one down and pass it around, 71 bottles of beer on the wall.\n\n" +
    "71 bottles of beer on the wall, 71 bottles of beer.\n" +
    "Take one down and pass it around, 70 bottles of beer on the wall.\n\n" +
    "70 bottles of beer on the wall, 70 bottles of beer.\n" +
    "Take one down and pass it around, 69 bottles of beer on the wall.\n\n" +
    "69 bottles of beer on the wall, 69 bottles of beer.\n" +
    "Take one down and pass it around, 68 bottles of beer on the wall.\n\n" +
    "68 bottles of beer on the wall, 68 bottles of beer.\n" +
    "Take one down and pass it around, 67 bottles of beer on the wall.\n\n" +
    "67 bottles of beer on the wall, 67 bottles of beer.\n" +
    "Take one down and pass it around, 66 bottles of beer on the wall.\n\n" +
    "66 bottles of beer on the wall, 66 bottles of beer.\n" +
    "Take one down and pass it around, 65 bottles of beer on the wall.\n\n" +
    "65 bottles of beer on the wall, 65 bottles of beer.\n" +
    "Take one down and pass it around, 64 bottles of beer on the wall.\n\n" +
    "64 bottles of beer on the wall, 64 bottles of beer.\n" +
    "Take one down and pass it around, 63 bottles of beer on the wall.\n\n" +
    "63 bottles of beer on the wall, 63 bottles of beer.\n" +
    "Take one down and pass it around, 62 bottles of beer on the wall.\n\n" +
    "62 bottles of beer on the wall, 62 bottles of beer.\n" +
    "Take one down and pass it around, 61 bottles of beer on the wall.\n\n" +
    "61 bottles of beer on the wall, 61 bottles of beer.\n" +
    "Take one down and pass it around, 60 bottles of beer on the wall.\n\n" +
    "60 bottles of beer on the wall, 60 bottles of beer.\n" +
    "Take one down and pass it around, 59 bottles of beer on the wall.\n\n" +
    "59 bottles of beer on the wall, 59 bottles of beer.\n" +
    "Take one down and pass it around, 58 bottles of beer on the wall.\n\n" +
    "58 bottles of beer on the wall, 58 bottles of beer.\n" +
    "Take one down and pass it around, 57 bottles of beer on the wall.\n\n" +
    "57 bottles of beer on the wall, 57 bottles of beer.\n" +
    "Take one down and pass it around, 56 bottles of beer on the wall.\n\n" +
    "56 bottles of beer on the wall, 56 bottles of beer.\n" +
    "Take one down and pass it around, 55 bottles of beer on the wall.\n\n" +
    "55 bottles of beer on the wall, 55 bottles of beer.\n" +
    "Take one down and pass it around, 54 bottles of beer on the wall.\n\n" +
    "54 bottles of beer on the wall, 54 bottles of beer.\n" +
    "Take one down and pass it around, 53 bottles of beer on the wall.\n\n" +
    "53 bottles of beer on the wall, 53 bottles of beer.\n" +
    "Take one down and pass it around, 52 bottles of beer on the wall.\n\n" +
    "52 bottles of beer on the wall, 52 bottles of beer.\n" +
    "Take one down and pass it around, 51 bottles of beer on the wall.\n\n" +
    "51 bottles of beer on the wall, 51 bottles of beer.\n" +
    "Take one down and pass it around, 50 bottles of beer on the wall.\n\n" +
    "50 bottles of beer on the wall, 50 bottles of beer.\n" +
    "Take one down and pass it around, 49 bottles of beer on the wall.\n\n" +
    "49 bottles of beer on the wall, 49 bottles of beer.\n" +
    "Take one down and pass it around, 48 bottles of beer on the wall.\n\n" +
    "48 bottles of beer on the wall, 48 bottles of beer.\n" +
    "Take one down and pass it around, 47 bottles of beer on the wall.\n\n" +
    "47 bottles of beer on the wall, 47 bottles of beer.\n" +
    "Take one down and pass it around, 46 bottles of beer on the wall.\n\n" +
    "46 bottles of beer on the wall, 46 bottles of beer.\n" +
    "Take one down and pass it around, 45 bottles of beer on the wall.\n\n" +
    "45 bottles of beer on the wall, 45 bottles of beer.\n" +
    "Take one down and pass it around, 44 bottles of beer on the wall.\n\n" +
    "44 bottles of beer on the wall, 44 bottles of beer.\n" +
    "Take one down and pass it around, 43 bottles of beer on the wall.\n\n" +
    "43 bottles of beer on the wall, 43 bottles of beer.\n" +
    "Take one down and pass it around, 42 bottles of beer on the wall.\n\n" +
    "42 bottles of beer on the wall, 42 bottles of beer.\n" +
    "Take one down and pass it around, 41 bottles of beer on the wall.\n\n" +
    "41 bottles of beer on the wall, 41 bottles of beer.\n" +
    "Take one down and pass it around, 40 bottles of beer on the wall.\n\n" +
    "40 bottles of beer on the wall, 40 bottles of beer.\n" +
    "Take one down and pass it around, 39 bottles of beer on the wall.\n\n" +
    "39 bottles of beer on the wall, 39 bottles of beer.\n" +
    "Take one down and pass it around, 38 bottles of beer on the wall.\n\n" +
    "38 bottles of beer on the wall, 38 bottles of beer.\n" +
    "Take one down and pass it around, 37 bottles of beer on the wall.\n\n" +
    "37 bottles of beer on the wall, 37 bottles of beer.\n" +
    "Take one down and pass it around, 36 bottles of beer on the wall.\n\n" +
    "36 bottles of beer on the wall, 36 bottles of beer.\n" +
    "Take one down and pass it around, 35 bottles of beer on the wall.\n\n" +
    "35 bottles of beer on the wall, 35 bottles of beer.\n" +
    "Take one down and pass it around, 34 bottles of beer on the wall.\n\n" +
    "34 bottles of beer on the wall, 34 bottles of beer.\n" +
    "Take one down and pass it around, 33 bottles of beer on the wall.\n\n" +
    "33 bottles of beer on the wall, 33 bottles of beer.\n" +
    "Take one down and pass it around, 32 bottles of beer on the wall.\n\n" +
    "32 bottles of beer on the wall, 32 bottles of beer.\n" +
    "Take one down and pass it around, 31 bottles of beer on the wall.\n\n" +
    "31 bottles of beer on the wall, 31 bottles of beer.\n" +
    "Take one down and pass it around, 30 bottles of beer on the wall.\n\n" +
    "30 bottles of beer on the wall, 30 bottles of beer.\n" +
    "Take one down and pass it around, 29 bottles of beer on the wall.\n\n" +
    "29 bottles of beer on the wall, 29 bottles of beer.\n" +
    "Take one down and pass it around, 28 bottles of beer on the wall.\n\n" +
    "28 bottles of beer on the wall, 28 bottles of beer.\n" +
    "Take one down and pass it around, 27 bottles of beer on the wall.\n\n" +
    "27 bottles of beer on the wall, 27 bottles of beer.\n" +
    "Take one down and pass it around, 26 bottles of beer on the wall.\n\n" +
    "26 bottles of beer on the wall, 26 bottles of beer.\n" +
    "Take one down and pass it around, 25 bottles of beer on the wall.\n\n" +
    "25 bottles of beer on the wall, 25 bottles of beer.\n" +
    "Take one down and pass it around, 24 bottles of beer on the wall.\n\n" +
    "24 bottles of beer on the wall, 24 bottles of beer.\n" +
    "Take one down and pass it around, 23 bottles of beer on the wall.\n\n" +
    "23 bottles of beer on the wall, 23 bottles of beer.\n" +
    "Take one down and pass it around, 22 bottles of beer on the wall.\n\n" +
    "22 bottles of beer on the wall, 22 bottles of beer.\n" +
    "Take one down and pass it around, 21 bottles of beer on the wall.\n\n" +
    "21 bottles of beer on the wall, 21 bottles of beer.\n" +
    "Take one down and pass it around, 20 bottles of beer on the wall.\n\n" +
    "20 bottles of beer on the wall, 20 bottles of beer.\n" +
    "Take one down and pass it around, 19 bottles of beer on the wall.\n\n" +
    "19 bottles of beer on the wall, 19 bottles of beer.\n" +
    "Take one down and pass it around, 18 bottles of beer on the wall.\n\n" +
    "18 bottles of beer on the wall, 18 bottles of beer.\n" +
    "Take one down and pass it around, 17 bottles of beer on the wall.\n\n" +
    "17 bottles of beer on the wall, 17 bottles of beer.\n" +
    "Take one down and pass it around, 16 bottles of beer on the wall.\n\n" +
    "16 bottles of beer on the wall, 16 bottles of beer.\n" +
    "Take one down and pass it around, 15 bottles of beer on the wall.\n\n" +
    "15 bottles of beer on the wall, 15 bottles of beer.\n" +
    "Take one down and pass it around, 14 bottles of beer on the wall.\n\n" +
    "14 bottles of beer on the wall, 14 bottles of beer.\n" +
    "Take one down and pass it around, 13 bottles of beer on the wall.\n\n" +
    "13 bottles of beer on the wall, 13 bottles of beer.\n" +
    "Take one down and pass it around, 12 bottles of beer on the wall.\n\n" +
    "12 bottles of beer on the wall, 12 bottles of beer.\n" +
    "Take one down and pass it around, 11 bottles of beer on the wall.\n\n" +
    "11 bottles of beer on the wall, 11 bottles of beer.\n" +
    "Take one down and pass it around, 10 bottles of beer on the wall.\n\n" +
    "10 bottles of beer on the wall, 10 bottles of beer.\n" +
    "Take one down and pass it around, 9 bottles of beer on the wall.\n\n" +
    "9 bottles of beer on the wall, 9 bottles of beer.\n" +
    "Take one down and pass it around, 8 bottles of beer on the wall.\n\n" +
    "8 bottles of beer on the wall, 8 bottles of beer.\n" +
    "Take one down and pass it around, 7 bottles of beer on the wall.\n\n" +
    "7 bottles of beer on the wall, 7 bottles of beer.\n" +
    "Take one down and pass it around, 6 bottles of beer on the wall.\n\n" +
    "6 bottles of beer on the wall, 6 bottles of beer.\n" +
    "Take one down and pass it around, 5 bottles of beer on the wall.\n\n" +
    "5 bottles of beer on the wall, 5 bottles of beer.\n" +
    "Take one down and pass it around, 4 bottles of beer on the wall.\n\n" +
    "4 bottles of beer on the wall, 4 bottles of beer.\n" +
    "Take one down and pass it around, 3 bottles of beer on the wall.\n\n" +
    "3 bottles of beer on the wall, 3 bottles of beer.\n" +
    "Take one down and pass it around, 2 bottles of beer on the wall.\n\n" +
    "2 bottles of beer on the wall, 2 bottles of beer.\n" +
    "Take one down and pass it around, 1 bottle of beer on the wall.\n\n" +
    "1 bottle of beer on the wall, 1 bottle of beer.\n" +
    "Take it down and pass it around, no more bottles of beer on the wall.\n\n" +
    "No more bottles of beer on the wall, no more bottles of beer.\n" +
    "Go to the store and buy some more, 99 bottles of beer on the wall.\n";
}


describe("Series", () => {
  test("test simple slices of one", () => {
    let series = new Series('01234');
    expect(series.slices(1)).toEqual([[0], [1], [2], [3], [4]]);
  });

  test("test simple slices of one again", () => {
    let series = new Series('92834');
    expect(series.slices(1)).toEqual([[9], [2], [8], [3], [4]]);
  });

  test("test simple slices of two", () => {
    let series = new Series('01234');
    expect(series.slices(2)).toEqual([[0, 1], [1, 2], [2, 3], [3, 4]]);
  });

  test("test other slices of two", () => {
    let series = new Series('98273463');
    let expected = [[9, 8], [8, 2], [2, 7], [7, 3], [3, 4], [4, 6], [6, 3]];
    expect(series.slices(2)).toEqual(expected);
  });

  test("test simple slices of two again", () => {
    let series = new Series('37103');
    expect(series.slices(2)).toEqual([[3, 7], [7, 1], [1, 0], [0, 3]]);
  });

  test("test simple slices of three", () => {
    let series = new Series('01234');
    expect(series.slices(3)).toEqual([[0, 1, 2], [1, 2, 3], [2, 3, 4]]);
  });

  test("test simple slices of three again", () => {
    let series = new Series('31001');
    expect(series.slices(3)).toEqual([[3, 1, 0], [1, 0, 0], [0, 0, 1]]);
  });

  test("test other slices of three", () => {
    let series = new Series('982347');
    let expected = [[9, 8, 2], [8, 2, 3], [2, 3, 4], [3, 4, 7]];
    expect(series.slices(3)).toEqual(expected);
  });

  test("test simple slices of four", () => {
    let series = new Series('01234');
    expect(series.slices(4)).toEqual([[0, 1, 2, 3], [1, 2, 3, 4]]);
  });

  test("test simple slices of four again", () => {
    let series = new Series('91274');
    expect(series.slices(4)).toEqual([[9, 1, 2, 7], [1, 2, 7, 4]]);
  });

  test("test simple slices of five", () => {
    let series = new Series('01234');
    expect(series.slices(5)).toEqual([[0, 1, 2, 3, 4]]);
  });

  test("test simple slices of five again", () => {
    let series = new Series('81228');
    expect(series.slices(5)).toEqual([[8, 1, 2, 2, 8]]);
  });

  test("test simple slice that blows up", () => {
    let series = new Series('01234');
    expect(() => { series.slices(6) }).toThrow();
  });

  test("test more complicated slice that blows up", () => {
    let sliceString = '01032987583';
    let series = new Series(sliceString);
    expect(() => { series.slices(sliceString.length+1) }).toThrow();
  });
});
