function login(callback) {
    console.log("User Logged In");
    callback("Pranjal");
}

function getProfile(user, callback) {
    console.log("Getting profile of " + user);
    callback({ name: user });
}

function getCart(profile, callback) {
    console.log("Fetching cart...");
    callback(["Laptop", "Mouse"]);
}

function calcTotal(cart, callback) {
    console.log("Calculating total...");
    callback(55000);
}

function makePayment(total, callback) {
    console.log("Payment of ₹" + total + " successful");
    callback();
}

// Callback Hell
login(function(user) {
    getProfile(user, function(profile) {
        getCart(profile, function(cart) {
            calcTotal(cart, function(total) {
                makePayment(total, function() {
                    console.log("Order Placed Successfully!");
                });
            });
        });
    });
});