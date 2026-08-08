// IMPORTS
import { getCart } from "./storage.js";
import { getCartItemCount } from "./utils.js";

// DOM ELEMENTS

const navToggle = document.getElementById("navToggle");
const navbarLinks = document.getElementById("navbarLinks");

const searchToggle = document.getElementById("searchToggle");
const searchContainer = document.getElementById("searchContainer");
const searchForm = document.querySelector(".search-container__form");
const searchInput = document.getElementById("searchInput");

const cartCount = document.getElementById("cartCount");

const backToTop = document.getElementById("backToTop");

// MOBILE NAVIGATION
function initializeNavigation() {
    if (!navToggle || !navbarLinks) {
        return;
    }

    navToggle.addEventListener("click", () => {
        navbarLinks.classList.toggle("active");
    });
}

// SEARCH TOGGLE
function initializeSearchToggle() {
    if (!searchToggle || !searchContainer) {
        return;
    }

    searchToggle.addEventListener("click", () => {
        searchContainer.classList.toggle("active");

        if (searchContainer.classList.contains("active")) {
            searchInput?.focus();
        }
    });
}


// SEARCH
function initializeSearch() {
    if (!searchForm || !searchInput) {
        return;
    }

    searchForm.addEventListener("submit", event => {
        event.preventDefault();

        const searchTerm = searchInput.value.trim();

        if (searchTerm === "") {
            return;
        }

        window.location.href =`products.html?search=${encodeURIComponent(searchTerm)}`;
    });
}


// UPDATE NAVBAR CART COUNT
function updateNavbarCartCount() {
    if (!cartCount) {
        return;
    }
    const cart = getCart();
    const itemCount = getCartItemCount(cart);
    cartCount.textContent = itemCount;
}

// BACK TO TOP
function initializeBackToTop() {
    if (!backToTop) {
        return;
    }

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0,behavior: "smooth"});
    });
}

// INITIALIZE APP
function initializeApp() {
    initializeNavigation();
    initializeSearchToggle();
    initializeSearch();
    updateNavbarCartCount();
    initializeBackToTop();
}

// START APP
document.addEventListener("DOMContentLoaded",initializeApp);