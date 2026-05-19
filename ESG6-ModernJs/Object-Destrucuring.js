const student = {
    name: "Pranjal",
    age: 20,
    course: "Engineering"
};
const {name,age,course} =student;
console.log(`${name}is of ${age} years and studies ${course}`);

//Extract only required properties
const product = {
    namepro: "Laptop",
    price: 55000,
    brand: "ASUS",
    rating: 4.7
};
const {namepro,price}= product;
//Renaming variables
const user = {
    name: "Pranjal",
    email: "pranjal@gmail.com"
};
const {name:userName,email:userEmail} = user;
//default values
const employee = {
    empname: "Rahul"
};
const {empname,department="General"} = employee;
// nested destructuring
const Cstudent = {
    name: "Pranjal",
    address: {
        studentcity: "Pune",
        state: "Maharashtra"
    }
};
const {address : {studentcity,state}}=Cstudent;
//Rest Operator with Objects
const admin = {
    nameofAdmin: "Pranjal",
    age: 20,
    city: "Pune",
    country: "India"
};
const {nameofAdmin, ...otherDetails}=admin;
//Function Parameter Destructuring
//Create a function displayProduct() that accepts an object and directly extracts:name &price
function displayProduct ({name,price}){
    console.log(`${name} costs ${price}`);
}
//Function Parameter Destructuring with Defaults
function greetUser({name="Default",city="Pune"}){
    console.log(`Hello ${name} from ${city}`);
}
//real life API response
const response = {
    user: {
        nameOf: "Pranjal",
        email: "pranjal@gmail.com"
    },
    token: "abc123"
};
const {user:{nameOf,email},token} = response;
//Combined question
const order = {
    orderId: 101,
    customer: {
        name: "Pranjal",
        city: "Pune"
    },
    items: 3,
    total: 1500,
    status: "Delivered"
};
const {orderId,customer:{name:customerName,city},total,...otherInfo} = order;