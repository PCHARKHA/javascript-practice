const form = document.querySelector("#registrationForm");
let  name = document.querySelector("#name");
let email = document.querySelector("#email");
let phoneNo = document.querySelector("#phone");
let  age = document.querySelector("#age");
let password = document.querySelector("#password");
let confirmPassword = document.querySelector("#confirmPassword");
const Btn = document.querySelector("#submitBtn");
const terms = document.querySelector("#terms");


//Errors & Messages
let nameError = document.querySelector("#nameError");
let emailError = document.querySelector("#emailError");
let phoneError = document.querySelector("#phoneError");
let genderError = document.querySelector("#genderError");
let ageError = document.querySelector("#ageError");
let passwordError = document.querySelector("#passwordError");
let confirmPasswordError = document.querySelector("#confirmPasswordError");
let termsError = document.querySelector("#termsError");
let successMsg = document.querySelector("#successMessage");

form.addEventListener("submit", function(details) {
    details.preventDefault();
    let isValid = true;

    if ( name.value.trim().length <=2){
        nameError.textContent =" Name must be greater than 2 letters";
        isValid = false;
    } else {
        nameError.textContent = "";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        emailError.textContent = "Please enter a valid email address";
        isValid = false;
    } else{
        emailError.textContent = "";
    }

    if(phoneNo.value.trim().length !== 10){
        phoneError.textContent = "Phone number must have exactly 10 digits!";
        isValid = false;
    }else {
         phoneError.textContent = "";
    }

    const ageValue = age.value.trim();
    if (ageValue === "") {
        ageError.textContent = "Age is required";
        isValid = false;

    }
    else if (isNaN(ageValue)) {
        ageError.textContent = "Age must be a number";
        isValid = false;
    }
    else if (Number(ageValue) < 18) {
        ageError.textContent = "Age must be 18 or above";
        isValid = false;
    }
    else {
        ageError.textContent = "";
    }

    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
        genderError.textContent = "Please select your gender";
        isValid = false;
    } else {
        genderError.textContent = "";
        console.log(gender.value);
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password.value)) {
        passwordError.textContent =
            "Password must contain 8+ characters, uppercase, lowercase, number and special character";
        isValid = false;

    } else {
        passwordError.textContent = "";
    }
    
    if (!terms.checked) {
        termsError.textContent = "You must agree to the Terms & Conditions";
        isValid = false;
    } else {
        termsError.textContent = "";
    }

    //SUCCESS MSG
    if (isValid) {
        successMsg.textContent = "Account created successfully!";
    }else {
        successMsg.textContent = "";
    }
    
});

