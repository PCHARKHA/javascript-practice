const quotess= [
    "Success is built daily.",
    "Consistency beats intensity.",
    "Small progress is still progress.",
    "Time is money",
    "Try try but don't cry"
];
const quote = document.getElementById("quote");
let i = 0;

function changeQuote() {
    quote.textContent = quotess[i];
    i++;

    if(i >= quotess.length){
        i=0; // reset to 0 so that an infinite loop runs
    }
}
    
changeQuote();
setInterval(changeQuote, 3000);  // changeQuote() is wrong
// In timer functions we usually pass the functions rathet than call them

