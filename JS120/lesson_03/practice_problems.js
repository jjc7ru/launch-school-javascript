// Practice Problem 1 --------------------------------------------------------------
// Problem 2
// rewrite the following code to use object-literal syntax to 
// generate the returned object:

/*
function makeObj() {
  let obj = {};
  obj.propA = 10;
  obj.propB = 20;
  return obj;
}

function rewriteMakeObj() {
  return {
    propA: 10,
    propB: 20,
  };
}
*/

// Practice Problem 2 --------------------------------------------------------------
// Problem 3
// In this problem and the remaining problems, we'll build a 
// simple invoice processing program. 

/*
function createInvoice(services) {
  let servicesObj = {
    phone: 3000,
    internet: 5500,
    total() {
      return this.phone + this.internet;
    },
  };

  if (services) {
    for (let [k, v] of Object.entries(services)) {
      servicesObj[k] = v;
    }
  }

  return servicesObj;
}
*/

/*
function invoiceTotal(invoices) {
  let total = 0;

  for (let index = 0; index < invoices.length; index += 1) {
    total += invoices[index].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(createInvoice({
  phone: 1000,
  internet: 4500,
}));

console.log(invoiceTotal(invoices)); // 31000
*/


// Practice Problem 3 --------------------------------------------------------------
// Problem 4

/*
function createPayment(services = {}) {
  let paymentObj = {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount || 0,
  };

  paymentObj.total = function() {
    return this.amount || (this.phone + this.internet);
  }

  return paymentObj;
}

function paymentTotal(payments) {
  return payments.reduce((sum, payment) => sum + payment.total(), 0);
}

let payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));

console.log(paymentTotal(payments));      // => 24000

// Problem 5: Update problem 3
// Update the createInvoice function so that it can add payment(s) to invoices.
// Use the following code as guideline.

function createInvoice(services) {
  let servicesObj = {
    phone: 3000,
    internet: 5500,
    paid: 0,
    total() {
      return this.phone + this.internet;
    },
  };

  if (services) {
    for (let [k, v] of Object.entries(services)) {
      servicesObj[k] = v;
    }
  }

  servicesObj.addPayment = function(payment) {
    this.paid += payment.total();
  }

  servicesObj.addPayments = function(payments) {
    payments.forEach((payment) => {
      this.paid += payment.total();
    });
  }

  servicesObj.amountDue = function() {
    return this.total() - this.paid;
  }

  return servicesObj;
}

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000 });

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
console.log(invoice.amountDue());       // this should return 0
*/


// Practice Problem 4 --------------------------------------------------------------
// Problem 2

/*
let RECTANGLE = {
  area: function() {
    return this.width * this.height;
  },
  perimeter: function() {
    return 2 * (this.width + this.height);
  },
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area.call(this);
  this.perimeter = RECTANGLE.perimeter.call(this);
}

let rect1 = new Rectangle(2, 3);

console.log(rect1.area);
console.log(rect1.perimeter);
*/

// Problem 3
// Write a constructor function called Circle that takes a radius 
// as an argument. You should be able to call an area method on any 
// objects created by the constructor to get the circle's area. 
// Test your implementation with the following code:

/*
function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.area = function() {
  return 2 * Math.pi * this.radius;
}

let a = new Circle(3);
let b = new Circle(4);

a.area().toFixed(2);
b.area().toFixed(2);
a.hasOwnProperty('area');
*/


// Problem 6
/*
function Ninja() {
  this.swung = false;
}

// Add a swing method to the Ninja prototype which
// modifies `swung` and returns the calling object
Ninja.prototype.swing = function() {
  this.swung = true;
  return this;
}

let ninjaA = new Ninja();
let ninjaB = new Ninja();

console.log(ninjaA.swing().swung);      // logs `true`
console.log(ninjaB.swing().swung);      // logs `true`
*/

// Problem 7
/*
let ninjaA;

{
  const Ninja = function() {
    this.swung = false;
  };

  ninjaA = new Ninja();
}

// create a `ninjaB` object here; don't change anything else
let ninjaB = new ninjaA.constructor;
console.log(ninjaB.swung);

console.log(ninjaA.constructor === ninjaB.constructor) // => true
*/

// Problem 8
// Since a constructor is just a function, you can call it without 
// the new operator. However, that can lead to unexpected results and errors, 
// especially for inexperienced programmers. Write a constructor function 
// that you can use with or without the new operator. The function 
// should return the same result with either form. Use the code below 
// to check your solution:
function User(first, last) {
  if (this instanceof User) {
    this.name = first + ' ' + last;
  } else {
    return new User(first, last);
  }
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe

