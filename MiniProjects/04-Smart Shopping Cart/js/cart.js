import { products } from "./data.js";
import { getCart, saveCart, clearCart } from "./storage.js";
import {formatPrice, getShippingCharge,calculateGrandTotal,
    findProductById,calculateTax,calculateSubtotal,getCartItemCount,showToast
} from "./utils.js";
import { appliedCoupon, calculateCouponDiscount } from "./coupons.js";

// DOM ELEMENTS
const cartItemsList = document.getElementById("cartItemsList");
const emptyCart = document.getElementById("emptyCart");
const cartPageCount = document.getElementById("cartPageCount");
const cartCount = document.getElementById("cartCount");

const subtotalLabel = document.getElementById("subtotalLabel");
const subtotalValue = document.getElementById("subtotalValue");
const taxValue = document.getElementById("taxValue");
const shippingValue = document.getElementById("shippingValue");
const grandTotalValue = document.getElementById("grandTotalValue");

const discountRow = document.getElementById("discountRow");
const discountLabel = document.getElementById("discountLabel");
const discountValue = document.getElementById("discountValue");

const clearCartButton = document.getElementById("clearCart");
const checkoutBtn = document.getElementById("checkoutBtn");


// TAX & SHIPPING SETTINGS
const TAX_RATE = 0.18;
const FREE_SHIPPING_LIMIT = 2000;
const SHIPPING_CHARGE = 99;

// RENDER CART
function renderCart() {
    const cart = getCart();

    cartItemsList.innerHTML = "";

    if (cart.length === 0) {
        emptyCart.hidden = false;
        emptyCart.textContent = "Your cart is empty.";

        cartPageCount.textContent = "0 items in your cart";
        cartCount.textContent = "0";

        updateOrderSummary([]);
        return;
    }

    emptyCart.hidden = true;

    cart.forEach(item => {
        const product = findProductById(products, item.id);

        if (!product) {
            return;
        }

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";
        cartItem.dataset.id = product.id;

        cartItem.innerHTML = `
            <div class="cart-item__image">
                <img src="${product.image}" alt="${product.name}">
            </div>

            <div class="cart-item__details">
                <h3 class="cart-item__name">${product.name}</h3>

                <p class="cart-item__brand">${product.brand}</p>

                <p class="cart-item__price">${formatPrice(product.price)}</p>

                <div class="cart-item__quantity">
                    <button type="button"   class="quantity-btn"data-action="decrease">
                        -
                    </button>

                    <span class="quantity-value">${item.quantity}</span>

                    <button type="button" class="quantity-btn" data-action="increase">
                        +
                    </button>
                </div>

                <button type="button" class="cart-item__remove" data-action="remove">
                    Remove
                </button>
            </div>
        `;
        cartItemsList.appendChild(cartItem);
    });

    updateCartCount(cart);
    updateOrderSummary(cart);
}

// UPDATE CART COUNT
function updateCartCount(cart) {
    const totalQuantity = getCartItemCount(cart);

    cartPageCount.textContent =
        `${totalQuantity} ${totalQuantity === 1 ? "item" : "items"} in your cart`;

    cartCount.textContent = totalQuantity;
}

// UPDATE ORDER SUMMARY
function updateOrderSummary(cart) {
    const subtotal = calculateSubtotal(cart, products);
    const tax = calculateTax(subtotal, TAX_RATE);

    let shipping = getShippingCharge(subtotal,FREE_SHIPPING_LIMIT,SHIPPING_CHARGE);
    let discount = 0;

    // Apply the currently active coupon (if any) to the totals
    if (appliedCoupon) {
        if (appliedCoupon.type === "shipping") {
            // FREESHIP coupon: no product-price discount, just free shipping
            shipping = 0;
        } else {
            discount = calculateCouponDiscount(subtotal, appliedCoupon);
        }
    }

    const grandTotal = calculateGrandTotal(subtotal,tax,shipping,discount);

    // Subtotal
    subtotalValue.textContent = formatPrice(subtotal);
    // Tax
    taxValue.textContent = formatPrice(tax);
    // Shipping
    if (shipping === 0) {
        shippingValue.textContent = "Free";
    } else {
        shippingValue.textContent = formatPrice(shipping);
    }

    // Discount
    if (discount > 0) {
        discountRow.hidden = false;
        discountLabel.textContent = `${appliedCoupon.code} Discount`;
        discountValue.textContent = `-${formatPrice(discount)}`;
    } else {
        discountRow.hidden = true;
    }

    // Grand Total
    grandTotalValue.textContent = formatPrice(grandTotal);

    // Number of items in subtotal label
    const totalQuantity = getCartItemCount(cart);

    subtotalLabel.textContent =
        `Subtotal (${totalQuantity} ${totalQuantity === 1 ? "item" : "items"})`;
}


// CHANGE QUANTITY
function changeQuantity(productId, change) {
    const cart = getCart();

    const cartItem = cart.find(item => item.id === productId);

    if (!cartItem) {
        return;
    }

    cartItem.quantity += change;

    if (cartItem.quantity <= 0) {
        const updatedCart = cart.filter(item => item.id !== productId);
        saveCart(updatedCart);
    } else {
        saveCart(cart);
    }
    renderCart();
}

// REMOVE ITEM
function removeItem(productId) {
    const cart = getCart();

    const updatedCart = cart.filter(item => item.id !== productId);

    saveCart(updatedCart);
    renderCart();
}


// CART BUTTON EVENTS (event delegation)
cartItemsList.addEventListener("click", event => {
    const button = event.target.closest("[data-action]");
    if (!button) {
        return;
    }

    const cartItem = button.closest(".cart-item");
    if (!cartItem) {
        return;
    }

    const productId = Number(cartItem.dataset.id);
    const action = button.dataset.action;

    if (action === "increase") {
        changeQuantity(productId, 1);
    }

    if (action === "decrease") {
        changeQuantity(productId, -1);
    }

    if (action === "remove") {
        removeItem(productId);
    }
});

// CLEAR CART
clearCartButton.addEventListener("click", () => {
    clearCart();
    renderCart();
});

// CHECKOUT (no real payment)
if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
        const cart = getCart();

        if (cart.length === 0) {
            showToast("Your cart is empty");
            return;
        }
        showToast("Checkout feature coming soon");
    });
}

// COUPON CHANGES
document.addEventListener("couponChanged", () => {
    renderCart();
});

// INITIALIZE
document.addEventListener("DOMContentLoaded", renderCart);