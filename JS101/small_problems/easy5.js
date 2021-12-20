// (1) Write a function that takes a floating point number representing an 
// angle between 0 and 360 degrees and returns a string representing that angle 
// in degrees, minutes, and seconds. You should use a degree symbol (˚) to 
// represent degrees, a single quote (') to represent minutes, and a double quote 
// (") to represent seconds. There are 60 minutes in a degree, and 60 seconds in a minute.

function dms(number) {
  let degreesMinutesSeconds = ['0', '°', '00', "'", '00', '"'];
  let whole = parseInt(number);
  let decimal = number - parseInt(number);
  degreesMinutesSeconds[0] = String(whole);

  let index = 2;
  while (index < degreesMinutesSeconds.length) {
    decimal *= 60;

    whole = parseInt(decimal);
    decimal -= whole;

    degreesMinutesSeconds[index] = String(whole);
    index += 2;
  }
  
  for (let i = 1; i < degreesMinutesSeconds.length; i++) {
    if (degreesMinutesSeconds[i] === '0') {
      degreesMinutesSeconds[i] = '00';
    }
  }
  return degreesMinutesSeconds.join('');
}

//console.log(dms(30));           // 30°00'00"
//console.log(dms(76.73));        // 76°43'48"
//console.log(dms(254.6));        // 254°35'59"
//console.log(dms(93.034773));    // 93°02'05"
//console.log(dms(0));            // 0°00'00"
//console.log(dms(360));          // 360°00'00" or 0°00'00"



// (2) Write a function that takes two arrays as arguments and returns an array containing 
// the union of the values from the two. There should be no duplication of values in 
// the returned array, even if there are duplicates in the original arrays. You may assume 
// that both arguments will always be arrays.

function union(arr1, arr2) {
  let arr = arr1.concat(arr2);
  let out = [];
  for (let number of arr) {
    if (!out.includes(number)) {
      out.push(number);
    }
  }
  return out;
}

console.log(union([1, 3, 5], [3, 6, 9]));    // [1, 3, 5, 6, 9]



// (3) Write a function that takes an array as an argument and returns an array that contains two 
// elements, each of which is an array. Put the first half of the original array elements in 
// the first element of the return value, and put the second half in the second element. If the original 
// array contains an odd number of elements, place the middle element in the first half array.

function halvsies(arr) {
	
}

halvsies([1, 2, 3, 4]);       // [[1, 2], [3, 4]]
halvsies([1, 5, 2, 4, 3]);    // [[1, 5, 2], [4, 3]]
halvsies([5]);                // [[5], []]
halvsies([]);                 // [[], []]





































