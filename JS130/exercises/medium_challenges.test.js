const {
  Diamond,
  Robot,
} = require('./medium_challenges');


describe("Diamond", () => {
  test("letter a", () => {
    let answer = Diamond.makeDiamond('A');
    expect(answer).toBe("A\n");
  });

  test("letter b", () => {
    let answer = Diamond.makeDiamond('B');
    expect(answer).toBe(" A \nB B\n A \n");
  });

  test("letter c", () => {
    let answer = Diamond.makeDiamond('C');
    let expected = "  A  \n" +
                   " B B \n" +
                   "C   C\n" +
                   " B B \n" +
                   "  A  \n";
    expect(answer).toBe(expected);
  });

  test("letter e", () => {
    let answer = Diamond.makeDiamond('E');
    let expected = "    A    \n" +
                   "   B B   \n" +
                   "  C   C  \n" +
                   " D     D \n" +
                   "E       E\n" +
                   " D     D \n" +
                   "  C   C  \n" +
                   "   B B   \n" +
                   "    A    \n";
    expect(answer).toBe(expected);
  });
});


Math.seedrandom = require('seedrandom');

describe("Robot Name", () => {
  const NAME_REGEXP = /^[A-Z]{2}\d{3}$/;
  const DIFFERENT_ROBOT_NAME_SEED = 1234;
  const SAME_INITIAL_ROBOT_NAME_SEED = 1000;

  test("has name", () => {
    expect(new Robot().name()).toMatch(NAME_REGEXP);
  });

  xtest("name sticks", () => {
    let robot = new Robot();
    let name = robot.name();
    expect(robot.name()).toBe(name);
  });

  xtest("different robots have different names", () => {
    Math.seedrandom(DIFFERENT_ROBOT_NAME_SEED);

    let robot1 = new Robot();
    let robot2 = new Robot();

    expect(robot1.name()).not.toBe(robot2.name());
  });

  xtest("different name when chosen name is taken", () => {
    Math.seedrandom(SAME_INITIAL_ROBOT_NAME_SEED);
    let robot1 = new Robot();
    Math.seedrandom(SAME_INITIAL_ROBOT_NAME_SEED);
    let robot2 = new Robot();
    expect(robot1.name()).not.toBe(robot2.name());
  });

  xtest("reset name", () => {
    Math.seedrandom(DIFFERENT_ROBOT_NAME_SEED);

    let robot = new Robot();
    let name1 = robot.name();
    robot.reset();
    let name2 = robot.name();

    expect(name1).not.toBe(name2);
  });
});
