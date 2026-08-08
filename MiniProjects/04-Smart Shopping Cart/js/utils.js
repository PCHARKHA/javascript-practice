// PRICE UTILITIES
export function formatPrice(price) {
    return `₹${price.toLocaleString("en-IN")}`;
}

export function getDiscountPercentage(product) {
    if (!product.oldPrice) {
        return 0;
    }

    return Math.round(
        ((product.oldPrice - product.price) / product.oldPrice) * 100
    );
}

// PRODUCT UTILITIES
export function findProductById(products, productId) {
    return products.find(product => product.id === productId);
}

// CART CALCULATIONS
export function calculateSubtotal(cart, products) {
    return cart.reduce((subtotal, item) => {

        const product = findProductById(products, item.id);

        if (!product) {
            return subtotal;
        }

        return subtotal + (product.price * item.quantity);

    }, 0);
}

export function calculateTax(subtotal, taxRate) {
    return Number((subtotal * taxRate).toFixed(2));
}

export function getShippingCharge(
    subtotal,
    freeShippingLimit,
    shippingCharge
) {
    return subtotal >= freeShippingLimit
        ? 0
        : shippingCharge;
}

export function calculateGrandTotal(
    subtotal,
    tax,
    shipping,
    discount = 0
) {
    return Number(
        (subtotal + tax + shipping - discount).toFixed(2)
    );
}

export function getCartItemCount(cart) {
    return cart.reduce(
        (count, item) => count + item.quantity,
        0
    );
}


// DOM UTILITIES
export function createElement(
    tag,
    className = "",
    text = ""
) {
    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    if (text) {
        element.textContent = text;
    }

    return element;
}


// FUNCTION UTILITIES
export function debounce(callback, delay = 300) {
    let timer;

    return function (...args) {

        clearTimeout(timer);

        timer = setTimeout(() => {
            callback.apply(this, args);
        }, delay);

    };
}

// UI UTILITIES
export function showToast(message) {
    alert(message);

    // We'll replace this later with
    // a proper animated toast component.
}