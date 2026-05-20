const display = document.getElementById("display");
let time = 0;
let timer = null;

function startStopwatch(){
    clearInterval(timer);

    timer = setInterval(()=> {
        time ++;
        display.textContent = time;
    },1000);
}

function stopStopwatch() {
    clearInterval(timer);
}

function resetStopwatch() {
    clearInterval(timer);
    time = 0;
    display.textContent = 0;
}

