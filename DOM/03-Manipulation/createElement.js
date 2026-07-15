function create(){
    const p = document.createElement("p");
    //create element creates the element in the memory but not on webpage
    p.textContent ="Hey world";
    p.classList.add("active");

    const container = document.getElementById("container");
    container.appendChild(p);
    //places the element inside DOM
}

/*
const element = document.createElement("div");
element.textContent = "Hello";
parent.appendChild(element);
*/ 
