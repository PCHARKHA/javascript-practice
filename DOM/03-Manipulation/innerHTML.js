/* 
What is it?
innerHTML reads or changes the HTML content inside an element, not just the text.
NOTE:
textContent → Works with plain text.
innerHTML → Works with HTML tags + text.
*/
const topics = document.getElementById("topics");
console.log("Learning innerHTML");
console.log(topics.innerHTML);

(() => {
const button = document.getElementById("updateBtn");
button.addEventListener("click", function(event){
    const quote = document.getElementById("quote");
    quote.innerHTML = ` <strong>Consistency</strong> beats <em>motivation</em>. `;

    const topics = document.getElementById("topics");
    topics.innerHTML = `
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>Python</li>
        `;
/* 
JavaScript does **not** add one new item. The browser does this:
What the browser does
Remove all existing children of #topics.
Parse the new HTML string.
Create brand-new `` elements.
Insert them into the ``.
*/
    });
})();
