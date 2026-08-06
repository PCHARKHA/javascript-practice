let appliedCoupon = null;

// FIND COUPON

function findCoupon(code) {
    return coupons.find(coupon =>
        coupon.code.toUpperCase() === code.toUpperCase()
    );
}

// CALCULATE DISCOUNT
function calculateCouponDiscount(subtotal, coupon) {
    if (!coupon) {
        return 0;
    }

    switch (coupon.type) {
        case "percentage":
            return (subtotal * coupon.value) / 100;

        case "fixed":
            return coupon.value;

        case "shipping":
            return SHIPPING_CHARGE;

        default:
            return 0;
    }
}


// APPLY COUPON
function applyCoupon(event) {
    event.preventDefault();
    const couponInput = document.getElementById("couponInput");
    const code = couponInput.value.trim();

    if (code === "") {
        showToast("Enter a coupon code");
        return;
    }

    const coupon = findCoupon(code);

    if (!coupon) {
        showToast("Invalid Coupon");
        return;
    }

    appliedCoupon = coupon;

    updateCouponUI();

    showToast(`${coupon.code} Applied Successfully`);

}


// REMOVE COUPON
function removeCoupon() {
    appliedCoupon = null;
    document.getElementById("couponInput").value = "";
    updateCouponUI();
    showToast("Coupon Removed");
}

// UPDATE COUPON UI
function updateCouponUI() {
    const couponApplied = document.getElementById("couponApplied");
    const couponAppliedText = document.getElementById("couponAppliedText");

    if (appliedCoupon) {
        couponApplied.style.display = "flex";
        couponAppliedText.innerHTML = `
            <i class="fa-solid fa-circle-check"></i>
            ${appliedCoupon.code} Applied
        `;

    }
    else {
        couponApplied.style.display = "none";
    }
}

// INITIALIZE
function initializeCoupons() {
    const couponForm = document.getElementById("couponForm");
    const removeCouponButton = document.getElementById("removeCoupon");

    if (couponForm) {
        couponForm.addEventListener("submit",applyCoupon);
    }

    if (removeCouponButton) {
        removeCouponButton.addEventListener("click",removeCoupon);
    }
}

document.addEventListener("DOMContentLoaded",initializeCoupons);