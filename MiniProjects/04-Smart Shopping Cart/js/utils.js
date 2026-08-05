// FORMAT PRICE
function formatPrice(price) {
    return `₹${price.toLocaleString("en-IN")}`;
}

// FIND PRODUCT BY ID
function findProductById(productId) {
    return products.find(product => product.id === productId);
}

// CALCULATE DISCOUNT PERCENTAGE
function getDiscountPercentage(product) {
    if (!product.oldPrice) {
        return 0;
    }

    return Math.round(
        ((product.oldPrice - product.price) / product.oldPrice) * 100
    );
}

// CALCULATE TAX
function calculateTax(subtotal) {
    return Number((subtotal * TAX_RATE).toFixed(2));
}


// CALCULATE SUBTOTAL
function calculateSubtotal(cart) {
    let subtotal = 0;

    cart.forEach(item => {
        const product = findProductById(item.id);

        if (product) {
            subtotal += product.price * item.quantity;
        }
    });

    return subtotal;
}

function getShippingCharge(subtotal) {
    return subtotal >= FREE_SHIPPING_LIMIT ? 0 : SHIPPING_CHARGE;
}

function calculateGrandTotal(subtotal, tax, shipping, discount = 0) {
    return Number((subtotal + tax + shipping - discount).toFixed(2));
}
// GET CART ITEM COUNT
function getCartItemCount(cart) {
    let count = 0;

    cart.forEach(item => {
        count += item.quantity;
    });

    return count;
}

//CREATE ELEMENT
function createElement(tag, className = "", text = "") {
    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    if (text) {
        element.textContent = text;
    }

    return element;
}

//debounce and showToast