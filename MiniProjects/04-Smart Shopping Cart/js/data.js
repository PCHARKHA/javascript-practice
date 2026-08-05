const products = [
    {
        id: 1,
        name: "Noise Cancelling Wireless Headphones",
        category: "electronics",
        brand: "Noise",
        price: 2499,
        oldPrice: 3999,
        rating: 4.5,
        stock: 18,
        badge: "Best Seller",
        image: "assets/images/products/product-1.jpg"
    },

    {
        id: 2,
        name: "Smart Fitness Watch Series 5",
        category: "electronics",
        brand: "Boat",
        price: 4199,
        oldPrice: 5499,
        rating: 4.0,
        stock: 12,
        badge: "New",
        image: "assets/images/products/product-2.jpg"
    },

    {
        id: 3,
        name: "Men's Air Cushion Running Shoes",
        category: "footwear",
        brand: "Puma",
        price: 1799,
        oldPrice: 2999,
        rating: 5.0,
        stock: 25,
        badge: "Sale",
        image: "assets/images/products/product-3.jpg"
    },

    {
        id: 4,
        name: "Minimalist Leather Backpack",
        category: "fashion",
        brand: "Wildcraft",
        price: 3299,
        oldPrice: null,
        rating: 3.5,
        stock: 10,
        badge: null,
        image: "assets/images/products/product-4.jpg"
    },

    {
        id: 5,
        name: "Portable Bluetooth Speaker 20W",
        category: "electronics",
        brand: "Boat",
        price: 1999,
        oldPrice: 2799,
        rating: 4.2,
        stock: 22,
        badge: "Trending",
        image: "assets/images/products/product-5.jpg"
    },

    {
        id: 6,
        name: "Classic Fit Cotton T-Shirt",
        category: "fashion",
        brand: "H&M",
        price: 599,
        oldPrice: 899,
        rating: 4.1,
        stock: 35,
        badge: null,
        image: "assets/images/products/product-6.jpg"
    },

    {
        id: 7,
        name: "Non-Stick Ceramic Cookware Set",
        category: "home-living",
        brand: "Prestige",
        price: 3899,
        oldPrice: 5299,
        rating: 4.6,
        stock: 0,
        badge: "New",
        image: "assets/images/products/product-7.jpg"
    },

    {
        id: 8,
        name: "Anti-Slip Yoga Mat 6mm",
        category: "sports",
        brand: "Boldfit",
        price: 799,
        oldPrice: null,
        rating: 3.2,
        stock: 15,
        badge: null,
        image: "assets/images/products/product-8.jpg"
    },

    {
        id: 9,
        name: "Vitamin C Brightening Face Serum",
        category: "beauty",
        brand: "Mamaearth",
        price: 899,
        oldPrice: 1199,
        rating: 4.8,
        stock: 30,
        badge: "Sale",
        image: "assets/images/products/product-9.jpg"
    }
];


//CATEGORIES
const categories = [
    "electronics",
    "fashion",
    "footwear",
    "home-living",
    "sports",
    "beauty"
];

//COUPONS
const coupons = [
    {
        code: "WELCOME10",
        type: "percentage",
        value: 10
    },

    {
        code: "SAVE20",
        type: "percentage",
        value: 20
    },

    {
        code: "FLAT100",
        type: "fixed",
        value: 100
    },

    {
        code: "FLAT250",
        type: "fixed",
        value: 250
    },

    {
        code: "FREESHIP",
        type: "shipping",
        value: 0
    }
];

// =========================
// APP CONSTANTS
// =========================

const TAX_RATE = 0.18;

const SHIPPING_CHARGE = 99;

const FREE_SHIPPING_LIMIT = 2000;