// (1) <RE> Function.prototype.bind is a method on all function objects that 
//     allows us to hard-bind a function to a particular object. 
//     The way this works is that you pass a context object to the 
//     bind method and it returns a new function that is essentially 
//     the same function but hard-bound to the context object supplied.

//     Create a function myBind, that accepts two arguments: 
//     1) The function to bind, 2) The context object, and returns a 
//     new function that's hard-bound to the passed in context object.

/*
let obj1 = {
  a: 1,
  b: 2,
};

function test() {
  return this.a + this.b;
}

let t = myBind(test, obj1);
console.log(t()); // 3
*/

function myBind(callback, context) {
  return function() {
    return callback.call(context, ...arguments);
  }
}


// (2) <RE> Our earlier implementation of Function.prototype.bind 
//     as myBind was simplistic. Function.prototype.bind has another trick 
//     up its sleeve besides hard-binding functions to context objects. 
//     It's called partial function application. Read this lesson’s section 
//     on Partial Function Application and the MDN documentation to learn more.

//     Alter the myBind function written in the previous exercise to 
//     support partial function application.

/*
function test(number, callback) {
  if (number > 4) {
    return callback(number);
  }
} 

function add(first, second) {
  return first + second;
}

console.log(test(5, myBind2(add, null, 10))); // 15
*/

// ...firstArgs parameter in myBind2 is like *args in python
function myBind2(callback, context, ...firstArgs) {
  return function() {
    let args = [...firstArgs, ...arguments];
    return callback.call(context, ...args);
  } 
}


// (3) A stack is a compound data type like an array. The difference 
//     between an array and a stack is that in an array you can insert and 
//     remove elements in any order you want, but a stack has a rule 
//     whereby you can only add new elements at the end and remove the 
//     last inserted element.

//     Create a function newStack, that, when called, returns a stack 
//     object with three methods: push, pop, and printStack. push takes a 
//     value and appends it to the stack. pop removes and returns the 
//     last element from the stack. printStack logs each remaining element 
//     of the stack on its own line, starting with the item that was last 
//     recently added to the stack and ending with the most recently added item.

//     Internally, use an array to implement the stack. Make sure that 
//     the array is not accessible from outside the methods.

/*
function newStack() {
  let arr = [];
  return {
    push(value) {
      arr.push(value);
    },

    pop() {
      arr.splice(arr.length - 1, 1);
    },

    printStack() {
      arr.forEach(value => console.log(value));
    },
  };
}

let test = newStack();
test.push(1);
test.push(2);
test.push(3);
test.push(4);
test.pop();
test.pop();
test.printStack();
*/

// (4) Write a delegate function that can be used to delegate the behavior 
//     of a method or function to another object's method. delegate takes 
//     a minimum of two arguments: (1) the object and (2) name of the 
//     method on the object. The remaining arguments, if any, are 
//     passed — as arguments — to the objects' method that it delegates to.
//
//     Note that this is not the same as uing bind. bind returns a new function,
//     whereas delegate maintains the reference.
/*
function delegate(obj, methodName, ...args) {
  return function() {
    return obj[methodName](...args);
  };
}

let foo = {
  name: 'test',
  bar: function(greeting) {
    console.log(greeting + ' ' + this.name);
  },
};

let baz = {
  qux: delegate(foo, 'bar', 'hello'),
};

baz.qux(); // logs 'hello test';

foo.bar = function() { console.log('changed'); };

baz.qux(); // logs 'changed'
*/

// (5) <RE> Using OLOO create an Account prototype object that anonymizes 
//     user objects on init. The created object should not have access to 
//     the function that anonymizes a user other than through the init and 
//     reanonymize methods. The function that anonymizes creates a 16 character 
//     sequence composed of letters and numbers. The following are the 
//     properties and methods on the Account object:

// > init: The init method sets the email, password, firstName, lastName, and 
//   displayName of user. The displayName is a 16 character sequence 
//   generated for the user. It's used as the display name of a user.
//
// > reanonymize: This method generates a new 16 character sequence and 
//   reassigns it to the displayName property if the password 
//   provided is valid. Returns true if successfully 
//   re-anonymized. Returns 'Invalid Password' if the password 
//   provided is not valid.
//
// > resetPassword: This method asks the user for a new password and reassigns 
//   it to the password property. To reset the password, the 
//   user must provide the current password. Returns 
//   'Invalid Password' if the password provided is not valid. 
//   Returns true if the password is successfully reset.
//
// > firstName: This method returns the first name of the user if the 
//   password provided is valid. Returns 'Invalid Password' 
//   if the password provided is not valid.
//
// > lastName: This method returns the last name of the user if the 
//   password provided is valid. Returns 'Invalid Password' if 
//   the password provided is not valid.
//
// > email: This method returns the email name of the user if the password 
//   provided is valid. Returns 'Invalid Password' if the password 
//   provided is not valid.
//
// > displayName: This property returns the displayName — the 16 character sequence.

// Other than the above properties, methods, and properties inherited from 
// Object.prototype, no other method or property should exist on the object 
// returned by the Account prototype object.

/*
let Account = (function() {
  let useremail;
  let userPassword;
  let userFirstName;
  let userLastName;
  
  function validPassword(password) {
    return password === userPassword;
  }

  function anonymize() {
    let s = '';
    for (let i = 0; i < 17; i += 1) {
      let alphaNumeric = 'abcdefghijklmnopqrstuvwxyz' + 
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
      let index = Math.floor(Math.random() * (alphaNumeric.length - 1));
      s += alphaNumeric[index];
    }
    return s;
  }
  
  return {
    init(email, password, firstName, lastName) {
      userEmail = email;
      userPassword = password;
      userFirstName = firstName;
      userLastName = lastName;
      this.displayName = anonymize();
      return this;
    },

    firstName(password) {
      if (validPassword(password)) return userFirstName;
      return "Invalid Password";
    },

    email(password) {
      if (validPassword(password)) return userEmail;
      return "Invalid Password";
    },

    resetPassword(currentPassword, newPassword) {
      if (validPassword(currentPassword)) {
        userPassword = newPassword;
        return true;
      };
      return 'Invalid Password';
    },

    reanonymize(password) {
      if (validPassword(password)) {
        this.displayName = anonymize();
        return true;
      }
      return 'Invalid Password';
    },
  }
})();

console.log('--------------------------------------------------');
let fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
console.log(fooBar.firstName);                     // returns the firstName function
console.log(fooBar.email);                         // returns the email function
console.log(fooBar.firstName('123456'));           // logs 'foo'
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.displayName);                   // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password';
console.log(fooBar.resetPassword('123456', 'abc')) // logs true
let displayName = fooBar.displayName;
fooBar.reanonymize('abc');                         // returns true
console.log(displayName === fooBar.displayName);   // logs false
*/


// (6) Mini Inventory Management System
// System is composed of:
// > item creator - all necessary information are present and valid.
//
// > item manager - responsible for:
//     >> Creating, updating, and deleting items.
//     >> Queries information on items
//        >>> create(): creates new item. returns false if creation not successful
//        >>> update(SKUcode, obj): updates information on item. valid values. 
//        >>> delete(SKUCode): deletes item from list. valid skucode
//        >>> <p> items: contains a list of all the items
//        >>> inStock(): lists all items where quantity > 0
//        >>> itemsInCategory(): lists all items for a give category
//
// > reports manager - 
//     >> generates reports for a specific item
//     >> generates reports for ALL items
//        >>> init(ItemManager): Accepts ItemManager obj and assigns to items propty
//        >>> createReporter(SKUcode): returns object that has a method:
//            >>>> itemInfo(): logs all the properties of an object as "key:value"
//            >>>> no other properties or methods on this object
//        >>> reportInStock: logs all item names that are in stock as csv
//
// Reports are generated from report objects created from report manager
//
// item:
//   > SKU code: 
//     > first 3 letters of the item + first 2 letters of the category
//     > if item name consists of two words and first word has only two letters,
//       then next letter is taken from next word
//   > Item name:
//     > Minimum 5 characters. Spaces are not counted as characters
//   > Category:
//     > Item category. Minimum 5 characters and can only be one word.
//   > Quantity:
//     > Quantity of item. Must not be blank. Valid number is always provided
//
// Notes:
// > SKU can be duplicated. No need to check for uniqueness
// > If any of the require information for an item is not valid, item creator
//   returns an object {notValid: true};
// > Item objects should not have any additional methods/properties 

function ItemCreator(name, category, quantity) {
  this.name = name;
  this.category = category;
  this.quantity = quantity;
  this.SKUcode = this.createSKUcode();
}

ItemCreator.prototype = {
  createSKUcode() {
    let sku = '';
    let names = this.name.split(' ');
    if (names[0].length >= 3) {
      sku += names[0].slice(0, 3);
    } else {
      sku += names[0].slice(0, 2) + names[1].slice(0, 1);
    }
    sku += this.category.slice(0, 2);
    return sku;
  },

  validName() {
    let alphaLength = this.name.split('').filter(name => {
      return name.toLowerCase() !== name.toUpperCase()
    }).length;

    if (alphaLength < 5) return false;
    return true;
  },

  validCategory() {
    if (this.category.split(' ').length > 1) return false;
    if (this.category.length < 5) return false;
    return true;
  },

  validQuantity() {
    if (this.quantity === undefined) return false;
    return true;
  },

  isValid() {
    if (!this.validName() || !this.validCategory() || 
        !this.validQuantity()) return false;
    return true;
  },

  getName() {
    return this.name;
  },

  getCategory() {
    return this.category;
  },

  getQuantity() {
    return this.quantity;
  },

  getSKUcode() {
    return this.SKUcode;
  },
}
ItemCreator.prototype.constructor = ItemCreator;


let ItemManager = {
  items: [],

  /*
  getSKUmatchingItem(SKUcode) {
    return this.items.filter(item => item.getSKUcode === SKUcode);
  },
  */

  create(name, category, quantity) {
    let item = new ItemCreator(name, category, quantity);
    console.log('>>>', item.getName());
    //let item = Object.create(ItemCreator).init(name, category, quantity);
    if (!item.isValid()) return false;
    //console.log(item.getName(), item.getCategory(), item.getQuantity());
    
    this.items.push(item);
  },

  /*
  update(SKUcode, obj) {
    let item = this.getSKUmatchingItem(SKUcode);
    for (let [key, value] of Object.entries(obj)) {
      item[key] = value;
    }
  },

  delete(SKUcode) {
    let item = this.getSKUmatchingItem(SKUcode);
    let index = this.items.indexOf(item);
    this.item.splice(index, 1);
  },

  inStock() {
    return this.items.filter(item => item.getQuantity > 0);
  },

  itemsInCategory(category) {
    return this.items.filter(item => item.getCategory === category);
  },
  */
};

/*
let ReportManager = (function() {
  let report;

  return {
    init(itemManager) {
      report = itemManager;
    },
    
    createReporter(SKUcode) {
      return {
        itemInfo() {
          report.forEach(item => console.log(Object.entries(item)));
        }
      }
    },

    reportInStock() {
      let names = [];
      report.inStock().forEach(item => names.push(item.getName()));
    },
  }
})();
*/

ItemManager.create('basket ball', 'sports', 0);           // valid item
ItemManager.create('asd', 'sports', 0);
ItemManager.create('soccer ball', 'sports', 5);           // valid item
ItemManager.create('football', 'sports');
ItemManager.create('football', 'sports', 3);              // valid item
ItemManager.create('kitchen pot', 'cooking items', 0);
ItemManager.create('kitchen pot', 'cooking', 3);          // valid item

// returns list with the 4 valid items
console.log(ItemManager.items);
console.log(ItemManager.items[0].getName());
console.log(ItemManager.items[1].getName());
console.log(ItemManager.items[2].getName());
console.log(ItemManager.items[3].getName());
/*
ReportManager.init(ItemManager);

// logs soccer ball,football,kitchen pot
ReportManager.reportInStock();

ItemManager.update('SOCSP', { quantity: 0 });
// returns list with the item objects for football and kitchen pot
ItemManager.inStock();
// football,kitchen pot
ReportManager.reportInStock();

// returns list with the item objects for basket ball, soccer ball, and football
ItemManager.itemsInCategory('sports');

ItemManager.delete('SOCSP');
// returns list the remaining 3 valid items (soccer ball is removed from the list)
ItemManager.items;

let kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 3

ItemManager.update('KITCO', { quantity: 10 });
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 10
*/



























