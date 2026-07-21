/*To write callbackhell in a clean manner we use promise chaining where in
each function usually returns a promise
Common: multiple then() and only one catch
*/
// Login Function
function login() {
    return new Promise((resolve, reject) => {
        console.log("User Logged In");
        resolve("Pranjal");
    });
}

// Get Profile
function getProfile(user) {
    return new Promise((resolve, reject) => {
        console.log("Getting profile of " + user);
        resolve({
            name: user,
            id: 101
        });
    });
}

// Get Cart
function getCart(profile) {
    return new Promise((resolve, reject) => {
        console.log("Fetching cart...");
        resolve(["Laptop", "Mouse"]);
    });
}

// Calculate Total
function calcTotal(cart) {
    return new Promise((resolve, reject) => {
        console.log("Calculating Total...");
        resolve(55000);
    });
}

// Make Payment
function makePayment(total) {
    return new Promise((resolve, reject) => {
        console.log("Payment of ₹" + total + " Successful");
        resolve("Order Placed Successfully!");
    });
}

// Promise Chaining
login()
    .then(getProfile)
    .then(getCart)
    .then(calcTotal)
    .then(makePayment)
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.log(error);
    });