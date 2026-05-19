function loginStudent(){
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const message = document.getElementById("msg");

    try{
        if(username === "" || password ===""){
            throw new Error("Username  or password cannot be empty.");
        }
        if(username.length < 3){
            throw new Error("Username too short");
        }
        // Check whether password contains at least one digit (0-9)
        if (!/\d/.test(password)) {
            throw new Error("Password must contain at least one number.");
        }
        if (password.length <8){
            throw new Error("Password must contain a minimum of 8 characters");
        }
         // Success message
         msg.style.color = "green";
         msg.textContent = "Login successful!";
 
    }
    catch(error){
        msg.style.color ="red";
        msg.textContent = error.message;
    }finally {
    console.log("Login attempt finished");
    }

}

