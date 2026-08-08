const STORAGE_KEYS = {
    cart: "smartcart-cart",
    wishlist: "smartcart-wishlist"
};

// Cart
export function getCart() {
    const cart = localStorage.getItem(STORAGE_KEYS.cart);

    return cart ? JSON.parse(cart) : [];
}

export function saveCart(cart) {
    localStorage.setItem(
        STORAGE_KEYS.cart,
        JSON.stringify(cart)
    );
}

export function clearCart() {
    localStorage.removeItem(STORAGE_KEYS.cart);
}

// function getWishlist() {
//     const wishlist = localStorage.getItem(STORAGE_KEYS.wishlist);

//     return wishlist ? JSON.parse(wishlist) : [];
// }

// function saveWishlist(wishlist) {
//     localStorage.setItem(
//         STORAGE_KEYS.wishlist,
//         JSON.stringify(wishlist)
//     );
// }

// function clearWishlist() {
//     localStorage.removeItem(STORAGE_KEYS.wishlist);
// }