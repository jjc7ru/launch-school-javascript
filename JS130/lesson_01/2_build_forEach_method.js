//
// >>> Walkthrough: Build a forEach Method
//

// >> Iteration and Callbacks
/*
function forEach(array, callback) {
  for (let index = 0; index < array.length; index += 1) {
    callback(array[index]);
  }
}
*/

// >> Defining the Execution Context
class Foo {
  constructor(prefix) {
    this.prefix = prefix;
  }

  showItem(item) {
    console.log(this.prefix, item);
  }
}

//let foo = new Foo("Item: ");
//[1, 2, 3].forEach(foo.showItem, foo);
//[4, 5, 6].forEach(foo.showItem);

/*
function forEach(array, callback, thisArg) {
  for (let index = 0; index < array.length; index += 1) {
    callback.call(thisArg, array[index]);
  }
}
*/

//forEach(['a', 'b', 'c'], item => console.log(item));

//let foo = new Foo("Item: ");
//forEach([1, 2, 3], foo.showItem, foo);
//forEach([4, 5, 6], foo.showItem);

// >> Adding the Index and Array Arguments
["a", "b", "c"].forEach(function(value, index, arr) {
  console.log(`After ${value} comes ${arr[index + 1]}`);
});

function forEach(array, callback, thisArg) {
  for (let index = 0; index < array.length; index += 1) {
    callback.call(thisArg, array[index], index, array);
  }
}

forEach(['a', 'b', 'c'], function(value, index, arr) {
  console.log(`After ${value} comes ${arr[index + 1]}`);
});

