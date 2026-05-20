const timeIp = document.getElementById("count");
const display = document.getElementById("display");
const message = document.getElementById("message");

let timer = null;
function startCountdown(){
    clearInterval(timer);
    let count = Number(timeIp.value);

    // validate
    if(count <= 0 || isNaN(count)){
        alert("Please enter valid time to coundown");
        return;
    }
    //resetting UI
    message.textContent = "";
    display.textContent = count;

    //start countdown
    timer = setInterval(()=>{
        count--;
        display.textContent = count;


        if (count <= 0) {
            clearInterval(timer);
            display.textContent = 0;
            message.textContent = "Time's up!";
        }
    },1000);
}