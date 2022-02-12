// 7. Functions as Object Factories

function createCar(make, fuelLevel, engineOn) {
  // To be implemented by you.
  let obj = {
    make: make,
    fuelLevel: fuelLevel,
    engineOn: engineOn,

    startEngine() {
      this.engineOn = true;
    },

    drive() {
      this.fuelLevel -= 0.1;
    },

    stopEngine() {
      this.engineOn = false;
    },

    refuel(percent) {
      if ((this.fuelLevel + (percent / 100)) < 1) {
        this.fuelLevel += (percent / 100);
      } else {
        this.fuelLevel = 1;
      }
    },
  }

  return obj;
}

let raceCar1 = createCar('BMW', 0.5, false);
raceCar1.drive();
console.log(raceCar1.fuelLevel);

let raceCar2 = createCar('Ferrari', 0.7, true);
raceCar2.drive();
console.log(raceCar2.fuelLevel);


// 8. Practice Problems: Objects and Factories
function createBook(title, author, read = false) {
  return {
    title,
    author,
    read,

    getDescription() {
      if (read) {
        return `${this.title} was written by ${this.author}. I have read it.`;
      } else {
        return `${this.title} was written by ${this.author}. I haven't read it.`;
      }
    },

    readBook() {
      this.read = true;
    },
  }
}

let book1 = createBook("Mythos", 'Stephen Fry');
let book2 = createBook("Me Talk Pretty One Day", 'David Sedaris', false);
let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse', true);

console.log(book1.getDescription());
console.log(book2.getDescription());
console.log(book3.getDescription());

console.log(book1.read);
console.log(book2.read);
console.log(book3.read);















