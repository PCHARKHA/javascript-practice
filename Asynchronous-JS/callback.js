function placeOrder(product, callback) {
    console.log("Order placed for " + product);
    // Simulating server processing
    setTimeout(() => {
        console.log("Checking stock...");
        callback(product);
    }, 2000);
}

function makePayment(product) {
    console.log("Payment Successful for " + product);
}

placeOrder("Smart Watch", makePayment);