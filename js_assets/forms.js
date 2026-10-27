
document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");

    const STORAGE_KEY = "luxuryPerfumeUsers";

    // Display feedback messages
    function showMessage(form, message, success) {
        let messageBox = form.querySelector(".form-message");

        if (!messageBox) {
            messageBox = document.createElement("p");
            messageBox.className = "form-message";
            messageBox.setAttribute("role", "status");
            form.prepend(messageBox);
        }

        messageBox.textContent = message;
        messageBox.style.color = success ? "green" : "red";
        messageBox.style.fontWeight = "bold";
        messageBox.style.textAlign = "center";
    }

    // Read registered demo accounts
    function getUsers() {
        try {
            const users = JSON.parse(
                localStorage.getItem(STORAGE_KEY) || "[]"
            );

            return Array.isArray(users) ? users : [];
        } catch (error) {
            return [];
        }
    }

    // SIGN UP
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const firstName =
                signupForm.elements["firstname"].value.trim();
            const lastName =
                signupForm.elements["lastname"].value.trim();
            const email =
                signupForm.elements["email"].value.trim().toLowerCase();
            const password =
                signupForm.elements["password"].value;
            const favorite =
                signupForm.elements["favorite_brand"].value;

            if (!firstName || !lastName || !email || !password) {
                showMessage(
                    signupForm,
                    "Please complete all required fields.",
                    false
                );
                return;
            }

            if (password.length < 8) {
                showMessage(
                    signupForm,
                    "Your password must be at least 8 characters.",
                    false
                );
                return;
            }

            const users = getUsers();

            if (users.some(user => user.email === email)) {
                showMessage(
                    signupForm,
                    "This email is already registered. Please log in.",
                    false
                );
                return;
            }

            users.push({
                firstname: firstName,
                lastname: lastName,
                email: email,
                password: password,
                favorite_brand: favorite
            });

            try {
                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(users)
                );

                showMessage(
                    signupForm,
                    "Registration successful! Welcome to The Luxury Perfumes VIP Club.",
                    true
                );

                signupForm.reset();

                // Go to login after successful registration
                setTimeout(function () {
                    window.location.href = "login.html";
                }, 1500);

            } catch (error) {
                showMessage(
                    signupForm,
                    "Registration could not be saved in this browser.",
                    false
                );
            }
        });
    }

    // LOGIN — only one login handler
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email =
                loginForm.elements["email"].value.trim().toLowerCase();
            const password =
                loginForm.elements["password"].value;

            const users = getUsers();

            const user = users.find(function (account) {
                return account.email === email &&
                       account.password === password;
            });

            if (user) {
                // Redirect immediately after successful login
                window.location.href = "./index.html";
            } else {
                showMessage(
                    loginForm,
                    "Invalid email or password. Please register first or try again.",
                    false
                );
            }
        });
    }
});
