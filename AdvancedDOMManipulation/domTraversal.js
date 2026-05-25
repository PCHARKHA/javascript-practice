// DOM traversal means:move up,move down,move sideways
const parent = document.querySelector(".parent");
console.log(parent.children);
// kya return hota hai : An HTMLCollection containing all direct children.
// only direct children , no direct children are returned

// Access indivisual child
console.log(parent.children[0]);

// to find parent : JS travels upwards
const firstChild = parent.children[0];
console.log(firstChild.parentElement);

// siblings
//nextElementSibling
const middle = document.getElementById("middle");
console.log(middle.nextElementSibling);
//previousElementSibling
console.log(middle.previousElementSibling);