// (1) Name the constructor
console.log("Hello".constructor.name);
console.log([1, 2, 3].constructor.name);
console.log(typeof {name: 'Srdjan'});

// (2) Create an empty class named Cat.
// (3) Using code from (2) create an instance of Cat and assign it to a variable named kitty.
// (4) Add a constructor method that logs I'm a cat! when a new Cat object is initialized
// (5) Using code from previous exercise, add a parameter to constructor that provides a name for
//     the Cat object. Assign this parameter to a property called name and use it to log a greeting with
//     the provided name.
// (6) Using code from previous exericse, move the greeting from the constructor method to an instance
//     method named greet that logs a greeting to the console when invoked.
/*j
class Cat {
  constructor(name) {
    //console.log("I'm a cat!");
    //console.log(`Hello! My name is ${name}!`);
    this.name = name;
  }
  greet() {
    console.log(`Hello! My name is ${this.name}!`);
  }
}
let kitty = new Cat('Sophie');
kitty.greet();
*/

// (7) Create a class Person. Person should accept one argument for "name" when instantiated. If no
//     arguments are given, person object should instantiate with a "name" of "John Doe"
class Person {
  constructor(name = "John Doe") {
    this.name = name;
  }
}
let person1 = new Person();
let person2 = new Person('Pepe');
console.log(person1.name);
console.log(person2.name);

// (8) Using the following code, add an instance method named rename that renames kitty when invoked
/*
class Cat {
  constructor(name) {
    this.name = name;
  }

  rename(name) {
    this.name = name;
  }
}

let kitty = new Cat('Sophie');
console.log(kitty.name);
kitty.rename('Chloe');
console.log(kitty.name);
*/

// (9) Modify the following code so that `Hello! I'm a cat!` is logged when Cat.genericGreeting is invoked
/*
class Cat {
  static genericGreeting() {
    console.log("Hello! I'm a cat!");
  }
}
Cat.genericGreeting();
*/
class Cat {
  constructor(name) {
    this.name = name;
  }

  static genericGreeting() {
    console.log("Hello! I'm a cat!");
  }

  personalGreeting() {
    console.log(`Hello! My name is ${this.name}!`);
  }
}

let kitty = new Cat("Sophie");
Cat.genericGreeting();
kitty.personalGreeting();

