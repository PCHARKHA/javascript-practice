const productsGrid = document.getElementById("productsGrid");
function renderProducts(products){
    productsGrid.innerHTML ="";
    products.forEach(product => {
        const card = createProductCard(product);
        console.log(card);
        productContainer.appendChild(card);
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

            <button
                class="product-card__wishlist
                ${isInWishlist(product.id) ? "product-card__wishlist--active" : ""}"
                data-id="${product.id}"
                aria-label="Wishlist">

                <i class="fa-${isInWishlist(product.id) ? "solid" : "regular"} fa-heart"></i>

            </button>

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
                </button>

                <span class="quantity-selector__value" data-quantity></span>

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
    const quantityElement =button.parentElement.querySelector("[data-quantity]");

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

document.addEventListener("click", (event) => {
    if (event.target.dataset.action === "increase") {
        increaseQuantity(event.target);
    }

    if (event.target.dataset.action === "decrease") {
        decreaseQuantity(event.target);
    }

});

function isInWishlist(productId) {
    const wishlist = getWishlist();
    return wishlist.includes(productId);
}

function toggleWishlist(productId) {
    const wishlist = getWishlist();

    if (isInWishlist(productId)) {
        const updatedWishlist = wishlist.filter(id => id !== productId);
        saveWishlist(updatedWishlist);
        showToast("Removed from Wishlist");

    } else {
        wishlist.push(productId);
        saveWishlist(wishlist);
        showToast("Added to Wishlist");
    }
    renderProducts(products);
}

function isProductInCart(productId) {
    const cart = getCart();
    return cart.some(item => item.id === productId);
}

function addToCart(productId) {
    const cart = getCart();
    const product = findProductById(productId);

    const card = document.querySelector(`[data-id="${productId}"]`);

    const quantity = Number(card.querySelector("[data-quantity]").textContent);

    const existingProduct = cart.find( item => item.id === productId);

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
    renderProducts(products);

}

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
            sortedProducts.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            break;

        case "name-z-a":
            sortedProducts.sort((a, b) =>
                b.name.localeCompare(a.name)
            );
            break;

        default:
            break;
    }
    return sortedProducts;
}

function applyFilters() {
    let filteredProducts = [...products];
    filteredProducts = searchProducts(filteredProducts);
    filteredProducts = filterByCategory(filteredProducts);
    filteredProducts = filterByBrand(filteredProducts);
    filteredProducts = filterByPrice(filteredProducts);
    filteredProducts = sortProducts(filteredProducts);
    renderProducts(filteredProducts);
    renderActiveFilters();
}

function renderActiveFilters() {
    console.log("Current Filters:");
    console.log("Search :", activeFilters.search);
    console.log("Category :", activeFilters.category);
    console.log("Brand :", activeFilters.brand);
    console.log(
        "Price :",
        activeFilters.minPrice,
        "-",
        activeFilters.maxPrice
    );
    console.log("Sort :", activeFilters.sort);
}

function clearFilters() {
    activeFilters.search = "";
    activeFilters.category = "all";
    activeFilters.brand = "all";
    activeFilters.minPrice = 0;
    activeFilters.maxPrice = Infinity;
    activeFilters.sort = "default";
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

    // Category Checkboxes
    const categoryCheckboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');

    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            if (this.closest(".filter-group").innerText.includes("Category")) {
                activeFilters.category = this.checked ? this.value: "all";
                applyFilters();
            }
        });
    });

    // Brand Checkboxes
    const brandCheckboxes  = document.querySelectorAll(
        '.filter-group input[type="checkbox"]');

    brandCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            if (this.closest(".filter-group").innerText.includes("Brand")) {
                activeFilters.brand = this.checked ? this.value: "all";
                applyFilters();
            }
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

    // Price Sorting
    const priceSort = document.getElementById("priceSort");
    if (priceSort) {
        priceSort.addEventListener("change", function () {
            activeFilters.sort = this.value;
            applyFilters();
        });
    }

    // Rating Sorting
    const ratingSort = document.getElementById("ratingSort");
    if (ratingSort) {
        ratingSort.addEventListener("change", function () {
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
