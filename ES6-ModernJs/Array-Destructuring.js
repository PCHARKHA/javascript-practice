let colors = ["red","green","blue"];
let [firstColor,secondColor,thirdColor] = colors;

const numbers = [100, 200, 300, 400];
let [num1,num2,...others]= numbers;

const marks = [85, 90, 95]; //skipping first element
let [,science,] =marks;

const user = ["Pranjal"];
const [name,age=18] = user;

let x = 10;
let y = 20;
[x,y] = [y,x];

const scores = [10, 20, 30, 40, 50]; //with rest operator
let [first,...remaining] =scores;

function getCoordinates() {
    return [18.52, 73.85];
}
let [x1,y1]=getCoordinates();

//nested destructuring
const data = ["Pranjal", [85, 90, 95]];
const [naam,mark] = data;
const [math,physics,english] = mark;

//or
const [firstName,[maths,phy,eng]] =data;




