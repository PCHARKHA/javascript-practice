//The rest operator (...) collects multiple values into a single array or object.
//QS-Sum All Numbers- function sumAll(...numbers) that returns the sum of all numbers passed to it.
let numbers = [1,2,3,4];
function sumAll(...numbers){
    return numbers.reduce((sum,num) => sum+num,0);
}
//QS-Write a function findMax that returns the largest number.
let nums = [10, 25, 7, 99, 42];
function findMax(...nums){
    return Math.max(...nums);
}
//QS- Write a function countArgs(...args) that returns how many arguments were passed.
function countArgs(...args) {
    return args.length;
}
//QS-Separate First Argument
//QS-Write a function showFirstAndRest(first, ...rest) that returns:
let fst =9;
let arr= [1,2,4,3,2,4,1];
function showFirstandRest (fst,...arr){
    return [fst,...rest];
}
//QS-Write a function createPost(title, ...tags) that returns an object:
function createPost(title,...tags){
    return {title,tags};
}
//-----------------REST IN ARRAY DESTRUCTURING------------
//QS-Extract First and Remaining Numbers
let num =[10,20,30,40,50];
let [first,...others] = num;
/* QS- Create:fruit1 = "apple" ,fruit2 = "banana"
remainingFruits = ["mango", "grapes", "orange"] */
fruits = ["apple","banana","mango","grapes","orange"];
let [fruit1,fruit2,...remainingFruits]=fruits;
//QS-Separate Name and Remaining Properties
const student = {
    name: "Pranjal",
    age: 20,
    branch: "Engineering",
    year: 2
  };
const {name,...details} =student;

const settings = {
    theme: "dark",
    fontSize: 16,
    language: "English"
  };
const {theme,...otherSettings} =settings;
//QS- Build a User Object ,Write a function:createUser(name, age, ...skills) that returns an object
function createUser(name,age,...skills){
    return {name,age,skills};
}
createUser("Pranjal",20,"JavaScript", "Python", "FastAPI");
 /**When using rest parameters:function example(...args) {
}
args is already an array.
Want the array? → return args
Want it in an object? → return { args }
Want its elements in another array? → return [...args] */




 