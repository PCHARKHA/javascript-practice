
const box = document.getElementById("box");
//classList.add() function : adds a class to classlist
box.classList.add("dark"); // add kiya classlist mai toh ab dark ke bhi styling webpage pe dikhenge
box.classList.remove("dark"); // same like add
//Note : Javascript is not removing styles directly , it is removing the class
// CSS handles style separately & automatically

// classList.toggle() --> if exists then remove OR if does not exist then add
box.classList.toggle("active"); // adds
box.classList.toggle("active"); // removes

console.log(box.classList.contains("active")); // return type is boolean
