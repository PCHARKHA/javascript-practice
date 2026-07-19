let title = document.getElementById("title");
let profile = document.getElementById("profile");
let subjects = document.getElementById("subjects");
let button = document.getElementById("updateBtn");
console.log (title);
console.log(profile);
console.log(subjects);
console.log(button);

//querySelector() selects the first element that matches a CSS selector.
//query selector understands CSS selectors
console.log("  -----Learning query selectors now----");

const firstInfo = document.querySelector(".info");
const profileName = document.querySelector("#profile h2");
const profileCourse = document.querySelector("#profile p");
console.log(firstInfo);  // only first element that matches info gets selected

//querySelectorAll() :It selects every element that matches a CSS selector.
console.log("  -----Learning querySelectorAll now----");
const infos = document.querySelectorAll(".info");
console.log(infos);
//info will be a NodeList , to access indivisual elements use indexing

let subj = document.querySelectorAll(".subject");
console.log("Printing length of subjects:" + subj.length);

button.addEventListener("click", function () {
    const newSubject = document.createElement("li");

    newSubject.className = "subject";
    newSubject.textContent = "Python";

    subjects.appendChild(newSubject);

    console.log(subj.length); // expected output:4 , actual output:3
    //Why? querySelectorAll creates a static Nodelist
});
/*Note : If the same above process of adding a subject and printing the length of subj..
is done using getElemenyByClassName() it returns a live HTMLCollection that automatically 
reflects changes in the DOM.
If you want a fixed list that won't change while you're processing it, a static NodeList (querySelectorAll()) is useful.
If you want a collection that always reflects the current DOM, a live HTMLCollection (getElementsByClassName()) is useful.

querySelectorAll() → Static snapshot
getElementsByClassName() → Live view of the DOM
*/

button.addEventListener("click", function(event){
    for(let info of infos){
        info.style.backgroundColor = "blue";
        info.style.fontWeight = "bold";
        info.style.color="white";
        info.style.padding ="10px";
        console.log(info.textContent);
    }
});

//document.getElementsByTagName("tagName");
console.log("----Learning getElementByTagName----")
const listItems = document.getElementsByTagName("li");
console.log(listItems);
console.log(listItems.length);
//returns an HTMLCollection,is live,selects by tag name instead of class

