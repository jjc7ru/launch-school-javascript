// Section 4 ----------------------------------------------------------------------
// Problem 4
/*
let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

assignProperty(fooC, "bar", 2);
console.log(fooA.bar); // 2
console.log(fooC.bar); // 2

assignProperty(fooC, "qux", 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty("qux")); // false
console.log(fooC.hasOwnProperty("qux")); // false

// recursive
function assignProperty(obj, key, value) {
  if (obj === null) {
    return
  }

  obj[key] = value;
  assignProperty(Object.getPrototypeOf(obj), key, value);
}

// iterative
function assignProperty(obj, key, value) {
  while (obj !== null) {
    if (obj.hasOwnProperty(key)) {
      obj[key] = value;
      break;
    }
    obj = Object.getPrototypeOf(obj);
  }
}
*/

// Problem 5
/*
let bar = {a: 1, b: 2};
let foo = Object.create(bar);
foo['c'] = 3;

for (let property in foo) {
  console.log(`${property}: ${foo[property]}`);
}

Object.keys(foo).forEach(property => {
  console.log(`${property}: ${foo[property]}`);
});
*/


// Problem 6
/*
let noPrototype = Object.create(null);
console.log(Object.getPrototypeOf(noPrototype));
*/

//
// (5) Function Expressions
//

/*
// Problem 5
// Use call to invoke the add method but with foo as execution context.
// What will this return?
let foo = {
  a: 1,
  b: 2,
};

let bar = {
   a: 'abc',
   b: 'def',
   add: function() {
     return this.a + this.b;
   },
};

let l2 = bar.add.call(foo);
//console.log(l2);
*/


//
// (11) Practice Problems: Hard Binding Functions with Contexts
//

/*
// Problem 1
//let practice = l2bar.add.bind(l2foo);
//console.log(practice());
*/


/*
// Problem 2

let obj = {
  message: 'JavaScript',
}

function foo() {
  console.log(this.message);
}

foo.bind(obj)();
*/

//
// (15) Practice Problems: Dealing with context Loss
//

/*
// Problem 1
// The code below should output "Christopher Turk is a Surgeon". 
// Without running the code, what will it output? 
// If there is a difference between the actual and desired output, 
// explain the difference.

let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
      return this.firstName + ' ' + this.lastName + ' is a '
                                  + this.occupation + '.';
  }
};

function logReturnVal(func) {
  let returnVal = func();
  console.log(returnVal);
}

logReturnVal(turk.getDescription);
*/

/*
// Problem 2
// Modify the program from the previous problem so that logReturnVal accepts 
// an additional context argument. If you then run the program with 
// turk as the context argument, it should produce the desired output.

function logReturnVal(func, context) {
  console.log(func.call(context));
}

logReturnVal(turk.getDescription, turk);
*/

/*
// Problem 3
// Suppose that we want to extract getDescription from turk, but we 
// always want it to execute with turk as its execution context. 
// How would you modify your code to do that?

let permanent = turk.getDescription.bind(turk);
function logReturnVal(func) {
  console.log(func());
}
logReturnVal(permanent);
*/

// Problem 5
// Use let self = this; to ensure that TESgames.listGames uses 
// TESGames as its context and logs the proper output.

/*
const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    let self = this;

    this.titles.forEach(function(title) {
      console.log(self.seriesTitle + ': ' + title);
    });
  }
};

TESgames.listGames();
*/

// Problem 6
// The forEach method provides an alternative way to supply 
// the execution context for the callback function. Modify the 
// program from the previous problem to use that technique to produce 
// the proper output:
/*
const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ': ' + title);
    }, thisValue=this);
  }
};

TESgames.listGames();
*/


// Problem 7
// Use an arrow function to achieve the same result:
/*
const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach((title) => {
      console.log(this.seriesTitle + ': ' + title);
    });
  }
};

TESgames.listGames();
*/


// Problem 9
// Use one of the methods we learned in this lesson to invoke increment with
// an explicit context such that foo.a gets incremented with each invocation
// of incrementA

let foo = {
  a: 0,
  incrementA: function() {
    let increment = () => {
      this.a += 1;
    }

    increment();
  },

};

foo.incrementA();
foo.incrementA();
foo.incrementA();
console.log(foo.a);
























