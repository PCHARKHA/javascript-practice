//creating and updating an array in JavaScript 
let arr = [1, 2, 3, 4, 5]; 
arr[0]=10; // updates the first element of the array to 10

//1 )push and pop 
arr.push(6); // adds 6 to the end of the array
console.log(arr); // [10, 2, 3, 4, 5, 6]
arr.pop(); // removes the last element (6) from the array
console.log(arr); // [10, 2, 3, 4, 5]

//2) shift and unshift
arr.unshift(0); // adds 0 to the beginning of the array
console.log(arr); // [0, 10, 2, 3, 4, 5]
arr.shift(); // removes the first element (0) from the array
console.log(arr); // [10, 2, 3, 4, 5]

//3)includes / indexOf
console.log(arr.includes(3)); // true
console.log(arr.indexOf(3)); // 2 (index of the first occurrence of 3)

//4) slice and splice
let slicedArr = arr.slice(1, 4); // creates a new array with elements from index 1 to 3(3 because end indez is not included)
console.log(slicedArr); // [2, 3, 4]

arr.splice(2, 1); // removes 1 element at index 2 (removes 3),modifies original array (destructive)
console.log(arr); // [1, 2, 4, 5]

//Looping through an array
//1) for loop
let num =[2,4,6,8,10,12,1,4,14,16];
for(let i=0;9<num.length;i++){
    console.log(num[i]);
}
/*2) forEach loop - “Har element pe kuch kaam karna hai, but result store nahi karna” → 
 also when we do not need a returned array */
num.forEach((number)=>{
    console.log(number/2);
});
//3)for...of
for(let element of num){
    console.log(element*2);
}


//Array of Objects
const students =[
    {name : "Alice", age: 20, grade: "A"},
    {name : "Bob", age: 22, grade: "B"},
    {name : "Charlie", age: 21, grade: "A"},
]
