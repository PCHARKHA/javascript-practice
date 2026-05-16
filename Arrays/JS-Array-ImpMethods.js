//map
let arr = [1, 2, 3, 4, 5];
let squaredArr = arr.map((num) => num * num); // creates a new array with each element squared
console.log(squaredArr); // [1, 4, 9, 16, 25]
// filter
let evenArr = arr.filter((num) => num % 2 === 0); // creates a new array with only even numbers
console.log(evenArr); // [2, 4]
// reduce
let sum = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0); // sums all elements in the array
console.log(sum); // 15
// find
let found = arr.find((num) => num > 3); // finds the first element greater than 3
console.log(found); // 4
// findIndex
let foundIndex = arr.findIndex((num) => num > 3); // finds the index of the first element greater than 3
console.log(foundIndex); // 3
// some
let hasEven = arr.some((num) => num % 2 === 0); // checks if there is at least one even number in the array
console.log(hasEven); // true
// every
let allPositive = arr.every((num) => num > 0); // checks if all elements are positive
console.log(allPositive); // true
// sort
let sortedArr = arr.sort((a, b) => b - a); // sorts the array in descending order
console.log(sortedArr); // [5, 4, 3, 2, 1]

//methods that mutate the original array :sort
//methods that do not mutate the original array : map & filter
//methods that have boolean return type : some & every
//methods that return a single value : reduce,find,findIndex