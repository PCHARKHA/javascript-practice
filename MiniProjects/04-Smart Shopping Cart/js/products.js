import { products } from "./data.js";
import { getCart, saveCart } from "./storage.js";

import {
    formatPrice,
    findProductById,
    getDiscountPercentage,
    showToast
} from "./utils.js";

const productsGrid = document.getElementById("productsGrid");

function renderProducts(productList) {
    productsGrid.innerHTML = "";

    productList.forEach(product => {
        const card = createProductCard(product);
        productsGrid.appendChild(card);
    });
}
//function creates and returns one product card
function createProductCard(product){
    const card = document.createElement("article");

    card.className = "product-card";

    card.dataset.id = product.id;
    card.dataset.name = product.name;
    card.dataset.category = product.category;
    card.dataset.brand = product.brand;
    card.dataset.price = product.price;
    card.dataset.oldPrice = product.oldPrice;
    card.dataset.rating = product.rating;
    card.dataset.stock = product.stock;

    card.innerHTML = `
        <div class="product-card__media">
            ${
                product.badge
                    ? `<span class="badge ${product.badgeClass} product-card__badge">
                            ${product.badge}
                       </span>`
                    : ""
            }

            <img src="${product.image}" alt="${product.name}"
                class="product-card__image"
                loading="lazy">

        </div>

        <div class="product-card__body">
            <span class="product-card__category">${product.category}</span>

            <h3 class="product-card__title">${product.name}</h3>

            <span class="rating">
                <span class="rating__stars">${generateStars(product.rating)}</span>

                (${product.rating})

            </span>

            <div class="product-card__price-row">
                <span class="product-card__price">
                    ${formatPrice(product.price)}</span>

                ${
                    product.oldPrice
                        ? `
                        <span class="product-card__price-old">
                            ${formatPrice(product.oldPrice)}
                        </span>

                        <span class="product-card__price-off">
                            ${getDiscountPercentage(product)}% off
                        </span>
                        `
                        : ""
                }
            </div>

        </div>

        <div class="product-card__footer">
            <div class="quantity-selector">
                <button
                    class="quantity-selector__btn"
                    data-action="decrease"
                    data-id="${product.id}">
                    -
                </button>

                <span class="quantity-selector__value" data-quantity>1</span>

                <button class="quantity-selector__btn"
                    data-action="increase"
                    data-id="${product.id}">
                    +
                </button>
            </div>

            <button class="product-card__add-btn"
                data-id="${product.id}"> 
                <i class="fa-solid fa-cart-plus"></i>

                ${isProductInCart(product.id) ? "Added" : "Add"}
            </button>
        </div>
    `;
    return card;
}


function generateStars(rating) {
    let stars = "";

    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
        stars += `<i class="fa-solid fa-star"></i>`;
    }

    if (halfStar) {
        stars += `<i class="fa-solid fa-star-half-stroke"></i>`;
    }

    while (stars.match(/fa-/g)?.length < 5) {
        stars += `<i class="fa-regular fa-star"></i>`;
    }
    return stars;
}

function increaseQuantity(button) {
    const quantityElement = button.parentElement.querySelector("[data-quantity]");

    let quantity = Number(quantityElement.textContent);
    quantity++;
    quantityElement.textContent = quantity;
}

function decreaseQuantity(button) {
    const quantityElement = button.parentElement.querySelector("[data-quantity]");
    let quantity = Number(quantityElement.textContent);

    if (quantity > 1) {
        quantity--;
    }
    quantityElement.textContent = quantity;
}

function isProductInCart(productId) {
    const cart = getCart();
    return cart.some(item => item.id === productId);
}

function addToCart(productId) {
    const cart = getCart();
    const product = findProductById(products, productId);

    const card = document.querySelector(`[data-id="${productId}"]`);

    const quantity = Number(card.querySelector("[data-quantity]").textContent);

    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += quantity;
        showToast("Cart Updated");
    } else {
        cart.push({
            id: product.id,
            quantity: quantity
        });

        showToast("Added to Cart");
    }
    saveCart(cart);
    applyFilters();
}

// Event delegation: quantity buttons and Add to Cart button
document.addEventListener("click", (event) => {
    if (event.target.dataset.action === "increase") {
        increaseQuantity(event.target);
    }

    if (event.target.dataset.action === "decrease") {
        decreaseQuantity(event.target);
    }

    const addButton = event.target.closest(".product-card__add-btn");
    if (addButton) {
        const productId = Number(addButton.dataset.id);
        addToCart(productId);
    }
});

const activeFilters = {
    search: "",
    category: "all",
    brand: "all",
    minPrice: 0,
    maxPrice: Infinity,
    sort: "default"
};

function searchProducts(productList) {
    if (!activeFilters.search) {
        return productList;
    }
    const searchText = activeFilters.search.toLowerCase();

    return productList.filter(product =>
        product.name.toLowerCase().includes(searchText) ||
        product.brand.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText)
    );
}

function filterByCategory(productList) {
    if (activeFilters.category === "all") {
        return productList;
    }

    return productList.filter(product =>
        product.category === activeFilters.category
    );
}

function filterByBrand(productList) {
    if (activeFilters.brand === "all") {
        return productList;
    }

    return productList.filter(product =>
        product.brand === activeFilters.brand
    );
}

function filterByPrice(productList) {
    return productList.filter(product =>
        product.price >= activeFilters.minPrice &&
        product.price <= activeFilters.maxPrice
    );
}


function sortProducts(productList) {
    const sortedProducts = [...productList];
    switch (activeFilters.sort) {
        case "price-low-high":
            sortedProducts.sort((a, b) => a.price - b.price);
            break;

        case "price-high-low":
            sortedProducts.sort((a, b) => b.price - a.price);
            break;

        case "rating-high-low":
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;

        case "name-a-z":
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;

        case "name-z":
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;

        default:
            break;
    }
    return sortedProducts;
}

function updateProductsCount(count) {
    const productsCountElement = document.getElementById("productsCount");
    if (productsCountElement) {
        productsCountElement.textContent = `Showing ${count} products`;
    }
}

function applyFilters() {
    let filteredProducts = [...products];
    filteredProducts = searchProducts(filteredProducts);
    filteredProducts = filterByCategory(filteredProducts);
    filteredProducts = filterByBrand(filteredProducts);
    filteredProducts = filterByPrice(filteredProducts);
    filteredProducts = sortProducts(filteredProducts);
    renderProducts(filteredProducts);
    updateProductsCount(filteredProducts.length);
    renderActiveFilters();
}

function renderActiveFilters() {
    const activeFiltersContainer = document.getElementById("activeFilters");
    if (!activeFiltersContainer) {
        return;
    }

    const filterTags = [];

    if (activeFilters.search) {
        filterTags.push(`Search: "${activeFilters.search}"`);
    }

    if (activeFilters.category !== "all") {
        filterTags.push(`Category: ${activeFilters.category}`);
    }

    if (activeFilters.brand !== "all") {
        filterTags.push(`Brand: ${activeFilters.brand}`);
    }

    if (activeFilters.maxPrice !== Infinity) {
        filterTags.push(`Max Price: ${formatPrice(activeFilters.maxPrice)}`);
    }

    activeFiltersContainer.textContent = filterTags.join(" | ");
}

function clearFilters() {
    activeFilters.search = "";
    activeFilters.category = "all";
    activeFilters.brand = "all";
    activeFilters.minPrice = 0;
    activeFilters.maxPrice = Infinity;
    activeFilters.sort = "default";

    // Reset the HTML controls to match
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.value = "";
    }

    const categoryRadios = document.querySelectorAll('input[name="category"]');
    categoryRadios.forEach(radio => {
        radio.checked = radio.value === "all";
    });

    const brandRadios = document.querySelectorAll('input[name="brand"]');
    brandRadios.forEach(radio => {
        radio.checked = radio.value === "all";
    });

    const priceSlider = document.getElementById("priceRange");
    const minPriceInput = document.getElementById("minPrice");
    const maxPriceInput = document.getElementById("maxPrice");

    if (priceSlider) {
        priceSlider.value = priceSlider.max;
    }
    if (minPriceInput) {
        minPriceInput.value = "₹0";
    }
    if (maxPriceInput && priceSlider) {
        maxPriceInput.value = `₹${Number(priceSlider.max).toLocaleString("en-IN")}`;
    }

    const sortSelect = document.getElementById("sortProducts");
    if (sortSelect) {
        sortSelect.value = "default";
    }

    applyFilters();
}

function initializeProductsPage() {
    // Initial Render
    applyFilters();

    // Search
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", (event) => {
            activeFilters.search = event.target.value;
            applyFilters();
        });
    }

    // Category Radio Buttons
    const categoryRadios = document.querySelectorAll('input[name="category"]');
    categoryRadios.forEach(radio => {
        radio.addEventListener("change", function () {
            activeFilters.category = this.value;
            applyFilters();
        });
    });

    // Brand Radio Buttons
    const brandRadios = document.querySelectorAll('input[name="brand"]');
    brandRadios.forEach(radio => {
        radio.addEventListener("change", function () {
            activeFilters.brand = this.value;
            applyFilters();
        });
    });

    // Price Slider
    const priceSlider = document.getElementById("priceRange");
    if (priceSlider) {
        priceSlider.addEventListener("input", function () {
            activeFilters.minPrice = 0;
            activeFilters.maxPrice = Number(this.value);
            document.getElementById("maxPrice").value =
                `₹${Number(this.value).toLocaleString("en-IN")}`;

            applyFilters();
        });
    }

    // Sorting
    const sortSelect = document.getElementById("sortProducts");
    if (sortSelect) {
        sortSelect.addEventListener("change", function () {
            activeFilters.sort = this.value;
            applyFilters();
        });
    }

    // Clear Filters
    const clearButton = document.getElementById("clearFilters");
    if (clearButton) {
        clearButton.addEventListener("click", clearFilters);
    }
}
document.addEventListener("DOMContentLoaded", initializeProductsPage);