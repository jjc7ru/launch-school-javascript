// (1) Using the following code, create two classes - Truck and Car - that both inherit from Vehicle
// (2) Change the following code so that creating a new Truck automatically invokes startEngine
/*
class Vehicle {
  constructor(year) {
    this.year = year;
  }
}

class Truck extends Vehicle {
  constructor(year, bedType) {
    super(year);
    this.bedType = bedType;
    this.startEngine();
  }

  startEngine() {
    console.log("Ready to go!");
  }
}

class Car extends Vehicle {}

let truck = new Truck(2003, 'Short');
console.log(truck.year);
console.log(truck.bedType);

let car = new Car(2015);
console.log(car.year);
*/

// (3) Using the following code, allow Truck to accept a second argument upon instantiation. 
//     Name the parameter bedType and implement the modification so that Car 
//     continues to only accept one argument.
/*
class Vehicle {
  constructor(year) {
    this.year = year;
  }
}

class Truck extends Vehicle {
  constructor(year, bedType) {
    super(year);
    this.bedType = bedType;
  }
}

class Car extends Vehicle {
  constructor(year) {
    super(year);
  }
}

let truck1 = new Truck(2003, 'Short');
console.log(truck1.year);
console.log(truck1.bedType);
*/

// (4) <RE> Modify the Truck class so that the code shown below displays the indicated output. Your code should
//     make use of the startEngine method in the Vehicle class.
/*
class Vehicle {
  startEngine() {
    return 'Ready to go!';
  }
}

class Truck extends Vehicle{
  startEngine(speed) {
    return super.startEngine() + ` Drive ${speed}, please!`;
  }
}

let truck1 = new Truck();
console.log(truck1.startEngine('fast')); // Ready to go! Drive fast, please!

let truck2 = new Truck();
console.log(truck1.startEngine('slow')); // Ready to go! Drive slow, please!

// (5) Create a mixin named walkMixin that contains a method named walk. This method should return
//     Let's go for a walk! when invoked. Include walkMixin in Cat and invoke walk on kitty.
let walkMixin = {
  walk() {
    return "Let's go for a walk!";
  }
}

class Cat {
  constructor(name) {
    this.name = name;
  }
  
  greet() {
    return `Hello! My name is ${this.name}!`;
  }
}
Object.assign(Cat.prototype, walkMixin);

let kitty = new Cat("Sophie");
console.log(kitty.greet()); // Hello! My name is Sophie!
console.log(kitty.walk());  // Let's go for a walk!
*/

// (6) <RE> Make the smallest possible change to ensure that objects of Maltese and Fish class have access
//     to the swim method
/*
const swimMixin = {
  swim() {
    return `${this.name} is swimming.`;
  }
}

class Fish {
  constructor(name) {
    this.name = name;
  }
}
Object.assign(Fish.prototype, swimMixin);

class Dog {
  constructor(name) {
    this.name = name;
  }
}
Object.assign(Dog.prototype, swimMixin);

class Maltese extends Dog {
  constructor(name) {
    super(name);
  }
}

let dog1 = new Maltese("Buddy");
let fish1 = new Fish("Nemo");

console.log(dog1.swim());  // Buddy is swimming.
console.log(fish1.swim()); // Nemo is swimming.
*/

// (7) Create a `towMixin` mixin that contains a method named `tow` that returns `I can tow a trailer!` when
//     invoked. Include the mixin in the Truck class
/*
const towMixin = {
  tow() {
    return "I can tow a trailer!";
  }
}

class Truck {}
Object.assign(Truck.prototype, towMixin);

class Car {}

let truck = new Truck();
console.log(truck.tow());
*/

// (8) Create a class named `Vehicle` that, upon instantiation, assigns the passed in argument to
//     `year` property. Both `Truck` and `Car` should inherit from `Vehicle`.

/*
const towMixin = {
  tow() {
    return "I can tow a trailer!";
  }
}

class Vehicle {
  constructor(year) {
    this.year = year;
  }
}

class Truck extends Vehicle {
  constructor(year) {
    super(year)
    Object.assign(this, towMixin);
  }
}

class Car extends Vehicle {}

let truck = new Truck(2002);
console.log(truck.year);
console.log(truck.tow());

let car = new Car(2015);
console.log(car.year);
*/
