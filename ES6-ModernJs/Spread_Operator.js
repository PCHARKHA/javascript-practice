//Spread operator expands iterable into indivisual/separate values
//QS-Create an array  = [1, 2, 3] and make a copy 
let arr1= [1,2,3];
let arr2=[...arr1];
//QS-Add 4 and 5 to the end of array using spread.
let updatedArr =[...arr1,4,5];
//QS-Add 0 to the beginning of array using spread.
let arrayWithzero = [0,...arr1];
//QS-Merge two arrays fruits = ["apple", "banana"] and vegetables = ["carrot", "tomato"].
let fruits =["apple","banana"];
let vegetables =["carrot","tomato"];
let grocery =[...fruits,...vegetables];
//QS-Find the maximum number from [10, 25, 7, 99, 42] using Math.max() and spread.
let nums =[10,25,7,99,42];
Math.max(...nums);

//Spread on objects
//QS-Copy an object user = { name: "Pranjal", age: 19 }
let user ={
    name:"Pranjal",
    age:19
};
let copiedUser = {...user};
//QS-Add a new property city: "Pune" using spread.
user = {...user,city:"Pune"};
//QS-Update age from 19 to 20 using spread.
user ={...user,age:20};
//QS-Merge two objects:
const personalInfo = { name: "Pranjal" };
const  academicInfo = { branch: "Engineering", year: 2 };
const studentInfo ={...personalInfo,...academicInfo};
//Qs -Create a new object with all properties of settings, but change theme to "dark".
const settings = {
    theme: "light",
    fontSize: 16,
    language: "English"
  };
/*
this is wrong --> const newSettings = {theme:"dark", ...settings};
When duplicate properties exist, the property written later overrides earlier ones.
Your code expands settings after setting theme, so "light" overwrites "dark".
*/
const newSettings = { ...settings, theme: "dark" }; // correct version

/* Point to Remember
const updatedObject = {
  ...originalObject,
  propertyToChange: newValue
};
later properties override earlier ones.
*/

