function f(a, b, c, d, e) {
  return {
    first: a,
    last: e,
    array: [b, c, d].sort(),
  };
}

let args = [1, 2, 3, 4, 5];
let {first, last, middle} = f(...args);
console.log(first);
