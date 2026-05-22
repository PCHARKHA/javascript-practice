/*In JavaScript, regular functions determine this based on how they are called.
When an object method is detached and stored separately, 
it loses its original object context.
Then this no longer refers to the original object, causing errors or undefined values.
bind() was introduced to permanently attach a specific object as this to a function.*/
// bind permanently fixes the value of this for a function
//Problem :
const student = {
    name: "Pranjal",

    greet() {
        console.log(this.name);
    }
};

student.greet();  //Pranjal
const fn = student.greet;
fn();  // output : undefined
//Syntax of bind : newFunction = oldFunction.bind(object);
const bindFn = greet.bind(student);
bindFn() ; //Pranjal
//Internally : "Create a new function where this will always be student."
//Note : bind() does NOT execute the function immediately.It returns a new function.

// Binding Arguments too
function greets(city,country){
    console.log(this.nameOfP + "from" + city +" ," + country);
}
const person = {
    nameOfP :"Pranjal",
};
const fn1 = greets.bind(person,"Pune"); 
fn1("India");   //Pranjal from Pune, India

