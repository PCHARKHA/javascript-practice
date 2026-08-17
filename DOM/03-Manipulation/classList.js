/*classList.add()
classList.remove()
classList.toggle()
classList.contains()
 */
const cLBtn = document.getElementById("classListBtn");
cLBtn.addEventListener("click",function(event){
    const p1 = document.querySelector(".content");
    console.log(p1);
    p1.classList.add("redText");
});

/* element.classList.remove("className");
 What is classList.toggle()? It switches a class on and off.
If the class exists → remove it ====== If the class doesn't exist → add it.
Syntax : element.classList.toggle("className");
*/

/*
classList.contains()
What is it?---> It checks whether an element currently has a particular class.
Syntax:element.classList.contains("className");
It returns a boolean:true → the class exists,false → the class doesn't exist.
*/