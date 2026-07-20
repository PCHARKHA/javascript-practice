//What is textContent? It reads or changes all the text inside an element.
const title = document.getElementById("blogTitle");
console.log("Learning textContent");
console.log(title.textContent);
const author = document.getElementById("author");
const date = document.getElementById("date");

let button = document.getElementById("updateBtn");

button.addEventListener("click", function(event){
    title.textContent = "JavaScript DOM Manipulation Masterclass";
    author.textContent = "OpenAI";
    date.textContent = "19-JULY";
    });

//Because textContent treats everything as plain text.It never interprets HTML tags.
/*
Updating scores
Greeting users
Changing headings
Notification messages
Cart count
Quiz results
Timer
Weather information
*/