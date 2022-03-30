// (1) Create a class Rectangle. The constructor should take 2 arguments which 
//     represent width and length respectively. Implement the class so that the output 
//     from the example below is correct.
// (2) Write a class called Square that inherits from Rectangle
/*
class Rectangle {
  constructor(width, length) {
    this.width = width;
    this.length = length;
  }

  getWidth() {
    return this.width;
  }

  getLength() {
    return this.length;
  }

  getArea() {
    return this.width * this.length;
  }
}

class Square extends Rectangle {
  constructor(size) {
    super(size, size)
  }
}

let rect = new Rectangle(4, 5);

console.log(rect.getWidth()); // 4
console.log(rect.getLength()); // 5
console.log(rect.getArea()); // 20

let square = new Square(5);
console.log(`area of square = ${square.getArea()}`); // area of square = 25
*/

// (3) <RE> Without calling the Cat constructor, create an object that looks and acts like 
//     a Cat instance that doesn't have a defined name.
/*
class Cat {
  constructor(name) {
    this.name = name;
  }
  speaks() {
    return `${this.name} says meowwww.`;
  }
}

let fakeCat = Object.create(Cat.prototype);
console.log(fakeCat instanceof Cat); // logs true
console.log(fakeCat.name);           // logs undefined
console.log(fakeCat.speaks());       // logs undefined says meowwww.
*/

// (4) Update code below so that it logs: 
//     - My cat Pudding is 7 years old and has black and white fur.
//     - My cat Butterscotch is 10 years old and has tan and white fur.
/*
class Pet {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

class Cat extends Pet {
  constructor(name, age, color) {
    super(name, age);
    this.color = color;
  }

  info() {
    return `My cat ${this.name} is ${this.age} years old and has ${this.color}.`;
  }
}

let pudding = new Cat('Pudding', 7, 'black and white');
let butterscotch = new Cat('Butterscotch', 10, 'tan and white');

console.log(pudding.info());
console.log(butterscotch.info());
*/

// (5) Given a class Animal create two classes Cat and Dog that inherit from it.
//     The Cat constructor should take 3 arguments, name, age and status. 
//     Cats should always have a leg count of 4 and a species of cat. 
//     Also, the introduce method should be identical to the original except, after the 
//     phrase there should be a single space and the words Meow meow!.
//     The Dog constructor should take 4 arguments, name, age and status and master. 
//     Dogs should always have a leg count of 4 and a species of dog. 
//     Dogs have the same introduce method as any other animal, but they have their own 
//     method called greetMaster(), which accepts no arguments and returns 
//     Hello (master's name)! Woof, woof!. (Make sure you replace (master's name) with the 
//     name of the dog's master.)

/*
class Animal {
  constructor(name, age, legs, species, status) {
    this.name = name;
    this.age = age;
    this.legs = legs;
    this.species = species;
    this.status = status;
  }
  introduce() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}.`;
  }
}

class Cat extends Animal {
  constructor(name, age, status) {
    super(name, age, 4, 'cat', status);
  }

  introduce() {
    return super.introduce() + ' Meow meow!';
  }
}

class Dog extends Animal {
  constructor(name, age, status, master) {
    super(name, age, 4, 'dog', status);
    this.master = master;
  }

  greetMaster() {
    return `Hello ${this.master}! Woof, woof!.`;
  }
}

let cat = new Cat("Pepe", 2, "happy");
console.log(cat.introduce() === "Hello, my name is Pepe and I am 2 years old and happy. Meow meow!"); // true

let dog = new Dog("Grumpy", 6, "angry", "Chris");
console.log(dog.introduce());
console.log(dog.greetMaster());
*/

// (6) Refactor these classes so they all use a common superclass, and inherit behavior as needed.
/*
class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.year = year;
  }

  info() {
    return `${this.make} ${this.model}`
  }
}

class Car extends Vehicle {
  getWheels() {
    return 4;
  }
}

class Motorcycle extends Vehicle {
  getWheels() {
    return 2;
  }
}

class Truck extends Vehicle {
  constructor(make, model, payload) {
    super(make, model);
    this.payload = payload;
  }

  getWheels() {
    return 6;
  }
}
*/

// (7) What will this log to the console?
/*
class Something {
  constructor() {
    this.data = "Hello";
  }

  dupData() {
    return this.data + this.data;
  }

  static dupData() {
    return "ByeBye";
  }
}

let thing = new Something();
console.log(Something.dupData());
console.log(thing.dupData());
*/

// (8) Rewrite these two object types to use the class keyword, instead of direct prototype 
//     manipulation. Person exposes method greeting which when called logs the provided 
//     greeting text. Shouter is a subtype of Person and is a bit loud so whatever he says is uppercased.
/*
function Person() {
}
Person.prototype.greeting = function(text) {
  console.log(text);
}

function Shouter() {
  Person.call(this);
}
Shouter.prototype = Object.create(Person.prototype)
Shouter.prototype.greeting = function(text) {
  Person.prototype.greeting.call(this, text.toUpperCase());
}
*/

/*
class Person {
  greeting(text) {
    console.log(text);
  }
}

class Shouter extends Person {
  greeting(text) {
    super.greeting(text.toUpperCase());
  }
}

let person = new Person();
let shouter = new Shouter();

person.greeting("Hello. It's very nice to meet you."); // Hello. It's very nice to meet you
shouter.greeting("Hello my friend."); // HELLO MY FRIEND.
*/

// (9) Modify code below to make the code work. You are only allowed to write one new method.
/*
const walkMixin = {
  walk() {
    return `${this.name} ${this.gait()} forward`;
  }
};

class Person {
  constructor(name) {
    this.name = name;
  }

  gait() {
    return "strolls";
  }
}
Object.assign(Person.prototype, walkMixin);

class Cat {
  constructor(name) {
    this.name = name;
  }

  gait() {
    return "saunters";
  }
}
Object.assign(Cat.prototype, walkMixin);

class Cheetah {
  constructor(name) {
    this.name = name;
  }

  gait() {
    return "runs";
  }
}
Object.assign(Cheetah.prototype, walkMixin);

let mike = new Person("Mike");
console.log(mike.walk());
// "Mike strolls forward"

let kitty = new Cat("Kitty");
console.log(kitty.walk());
// "Kitty saunters forward"

let flash = new Cheetah("Flash");
console.log(flash.walk());
// "Flash runs forward"
*/

// (10) Update code so that it logs the following to the console:
//      - P Hanson has adopted the following pets:
//      - a cat named Butterscotch
//      - a cat named Pudding
//      - a bearded dragon named Darwin
//      - 
//      - B Holmes has adopted the following pets:
//      - a dog named Molly
//      - a parakeet named Sweetie Pie
//      - a dog named Kennedy
//      - a fish named Chester
//      - 
//      - P Hanson has 3 adopted pets.
//      - B Holmes has 4 adopted pets.
/*
class Pet {
  constructor(species, name) {
    this.species = species;
    this.name = name;
  }

  description() {
    console.log(`a ${this.species} named ${this.name}`);
  }
}

class Owner {
  constructor(name) {
    this.name = name;
    this.pets = [];
  }

  addPet(pet) {
    this.pets.push(pet)
  }

  numberOfPets() {
    return this.pets.length;
  }

  printPets() {
    for (let pet of this.pets) {
      console.log(`a ${pet.species} named ${this.name}`);
    }
  }

  toString() {
    return this.name;
  }
}

class Shelter {
  constructor() {
    this.owners = {};
  }

  adopt(owner, pet) {
    owner.addPet(pet);
    if (!this.owners[owner.name]) {
      this.owners[owner.name] = owner;
    }
  }

  printAdoptions() {
    for (let [key, value] of Object.entries(this.owners)) {
      console.log(`${key} has adopted the following pets:`);
      value.printPets();
      console.log('');
    }
  }
}

let butterscotch = new Pet('cat', 'Butterscotch');
let pudding      = new Pet('cat', 'Pudding');
let darwin       = new Pet('bearded dragon', 'Darwin');
let kennedy      = new Pet('dog', 'Kennedy');
let sweetie      = new Pet('parakeet', 'Sweetie Pie');
let molly        = new Pet('dog', 'Molly');
let chester      = new Pet('fish', 'Chester');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');

let shelter = new Shelter();
shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);
*/

// (11) Complete this class so that the test cases shown below work as intended. 
//      You are free to add any properties you need.
class Banner {
  constructor(message) {
    this.message = message;
  }

  displayBanner() {
    console.log([this.horizontalRule(), this.emptyLine(), this.messageLine(), this.emptyLine(), this.horizontalRule()].join("\n"));
  }

  horizontalRule() {
    return '+' + '-'.repeat(this.message.length + 2) + '+';
  }

  emptyLine() {
    return '|' + ' '.repeat(this.message.length + 2) + '|';
  }

  messageLine() {
    return '| ' + this.message + ' |';
  }
}


let banner1 = new Banner('To boldly go where no one has gone before.');
banner1.displayBanner();
// +--------------------------------------------+
// |                                            |
// | To boldly go where no one has gone before. |
// |                                            |
// +--------------------------------------------+

 
let banner2 = new Banner('');
banner2.displayBanner();
// +--+
// |  |
// |  |
// |  |
// +--+ 































