//Create variables name and age, then build an object using property shorthand.
const name ="Pranjal";
const age = 29;
const student ={
    name,
    age
}
//Add a method greet() using method shorthand.
const student1 ={
    Uname,
    age,
    greet(){
        console.log(`Hello ${this.Uname}`);
    }
};
//Use const key = "course" to create a dynamic property.
const key = "course";
const student2 ={
    Sname,
    age,
    [key]:"Engineering"
};
//build a formData object from variables email and password.
const email ="abc@gmail.com";
const password = "38202";
const formData ={
    email,
    password
};
