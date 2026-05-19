let students = [];

function registerStudent() {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const email = document.getElementById("email").value;

    const msg = document.getElementById("msg");

    try {
        // validation checks

        if (name === "") {
            throw new Error("Name is required");
        }

        if (age === "") {
            throw new Error("Age is required");
        }

        if (isNaN(age)) {
            throw new Error("Age must be a number");
        }

        if (email === "" || !email.includes("@")) {
            throw new Error("Valid email is required");
        }

        // if all good → create student
        const student = {
            name: name,
            age: Number(age),
            email: email
        };

        students.push(student);

        msg.style.color = "green";
        msg.textContent = "Student added successfully";

        updateList();

    } catch (error) {
        msg.style.color = "red";
        msg.textContent = error.message;

    } finally {
        console.log("Registration attempt finished");
    }
}

function updateList() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    for (let i = 0; i < students.length; i++) {
        const li = document.createElement("li");
        li.textContent =
            students[i].name +
            " | " +
            students[i].age +
            " | " +
            students[i].email;

        list.appendChild(li);
    }
}