// innerText reads or changes only the text that is visible on the webpage.
const intro = document.getElementById("intro");
const hiddenPara = document.getElementById("hiddenP");
console.log("Learning innerText");
console.log(intro.textContent);
console.log(intro.innerText);

const demo = document.getElementById("demo");
console.log(demo.textContent);
console.log(demo.innerText);

/*
textContent → works with the raw text inside the DOM.
innerText → works with the text as it is rendered to the user.
*/