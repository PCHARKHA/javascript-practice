function greet(name = "Guest") {
    return `Hello, ${name}`;
}

function add(a=0,b=0){
    return `Sum of ${a} and ${b} is ${a+b}`;
}

function createUser(name="Anonymous", age=18){
    return {name,age};
}

function calculatePrice(price,tax=0.18){
    return price+price*tax;
}

function createPost(title = "Untitled", tags = []){
    return {title,tags};
}

function sendEmail(to, subject = "No Subject", body = "Empty"){
    return {to,subject,body};
}

function rectangleArea(length = 1, width = 1){
    return length*width;
}

function increment(value, step = 1){
    return value+step;
}

function login(username = "guest", isAdmin = false){
    return {username,isAdmin};
}

function addToCart(product, quantity = 1){
    return {product,quantity};
}

function createProduct(name="Unknown Product",price=0,...categories){
    let isExpensive = false;
    if (price >5000){
        isExpensive=true;
    }
    return {name,price,categories,isExpensive};
}