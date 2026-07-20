const removeBtn = document.getElementById("removeBtn");
removeBtn.addEventListener("click",function(event){
    const quote = document.getElementById("quote");
    quote.remove();
});