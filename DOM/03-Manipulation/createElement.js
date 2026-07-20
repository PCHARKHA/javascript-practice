function create(){
    // document.createElement("tagName");
    const p = document.createElement("p");
    //create element creates the element in the memory but not on webpage
    p.textContent ="Hey world";
    p.classList.add("active");

    const container = document.getElementById("container");
    container.appendChild(p);
    //places the element inside DOM
}

/*
const element = document.createElement("div");   : Step 1--> Create Element
element.textContent = "Hello";   : Step 2--> Add content to display
parent.appendChild(element);     : Step 3-->Insert element onto web page
*/ 
// =================== LEARNING APPEND====================
const appendBtn = document.getElementById("appendBtn");
appendBtn.addEventListener("click",function(event){
    const img = document.createElement("img");
    const p = document.getElementById("demo");

    img.src = "../assets/append.png";
    img.alt = "Append Image";
    img.style.width = "450px";

    p.appendChild(img);
});
