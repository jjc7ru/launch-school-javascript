// Section 3 ----------------------------------------------------------------------
// Problem 1
// Use a factory function to create pet objects. The factory should let us create
// and use pets
//
/*
function createPet(animal, name) {
  return {
    animal,
    name,

    sleep: function() {
      console.log("I am sleeping");
    },

    wake: function() {
      console.log("I am awake");
    },
  };
}

let pudding = createPet("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

let neptune = createPet("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake
*/

// Problem 2
// Use the OLOO pattern to create an object prototype that we can use to create
// pet objects. The prototype should let us create and use pets

/*
let PetPrototype = {
  init(animal, name) {
    this.animal = animal;
    this.name = name;
    return this;
  },

  sleep: function() {
    console.log("I am sleeping");
  },

  wake: function() {
    console.log("I am awake");
  },
}

let pudding = Object.create(PetPrototype).init("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

let neptune = Object.create(PetPrototype).init("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake
*/


// Section 8 ----------------------------------------------------------------------
// Problem 1
/*
const Speed = {
  goFast() {
    console.log(`I'm a ${this.constructor.name} and going super fast!`);
  }
};

class Car {
  goSlow() {
    console.log(`I'm safe and driving slow.`);
  }
}
Object.assign(Car.prototype, Speed);

class Truck {
  goVerySlow() {
    console.log(`I'm a heavy truck and like going very slow.`);
  }
}
Object.assign(Truck.prototype, Speed);

let car = new Car();
let truck = new Truck();
car.goFast();
truck.goFast();
console.log('goFast' in car);
console.log(Object.getOwnPropertyNames(Car.prototype));
*/

// Problem 3
/*
class Vehicle {
  constructor(kmTravelledPerLiter, fuelCapInLiter) {
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }

  range() {
    return this.fuelCap *  this.fuelEfficiency;
  }
}

class WheeledVehicle extends Vehicle {
  constructor(kmTravelledPerLiter, fuelCapInLiter, tirePressure) {
    super(kmTravelledPerLiter, fuelCapInLiter)
    this.tires = tirePressure;
  }

  tirePressure(tireIdx) {
    return this.tires[tireIdx];
  }

  inflateTire(tireIdx, pressure) {
    this.tires[tireIdx] = pressure;
  }
}


class Catamaran extends Vehicle {
  constructor(propellerCount, hullCount) {
    this.propellerCount = propellerCount;
    this.hullCount = hullCount;
  }
}

class Auto extends WheeledVehicle {
  constructor() {
    // the array represents tire pressure for four tires
    super(50, 25.0, [30,30,32,32]);
  }
}

class Motorcycle extends WheeledVehicle {
  constructor() {
    // array represents tire pressure for two tires
    super(80, 8.0, [20,20]);
  }
}
*/

const vehicleCommons = {
  range() {
    return this.fuelCap *  this.fuelEfficiency;
  }
}

class WheeledVehicle {
  constructor(tirePressure, kmTravelledPerLiter, fuelCapInLiter) {
    this.tires = tirePressure;
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }

  tirePressure(tireIdx) {
    return this.tires[tireIdx];
  }

  inflateTire(tireIdx, pressure) {
    this.tires[tireIdx] = pressure;
  }
}
Object.assign(WheeledVehicle.prototype, vehicleCommons);


class Auto extends WheeledVehicle {
  constructor() {
    // the array represents tire pressure for four tires
    super([30,30,32,32], 50, 25.0);
  }
}

class Motorcycle extends WheeledVehicle {
  constructor() {
    // array represents tire pressure for two tires
    super([20,20], 80, 8.0);
  }
}

class Catamaran {
  constructor(tires,propellerCount, hullCount, kmTravelledPerLiter, fuelCapInLiter) {
    // catamaran specific logic
    super(tires);
    this.propellerCount = propellerCount;
    this.hullCount = hullCount;
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }
}
Object.assign(Catamaran.prototype, vehicleCommons);
Object.assign(Catamaran.constructor, WheeledVehicle.tires);

let c = new Catamaran([1, 2], 1, 2, 3, 4);
console.log(c.tires);
















