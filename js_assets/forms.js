/**
 * THE LUXURY PERFUMES — account forms
 * Demonstration sign-up and login, stored in localStorage only.
 */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    var STORAGE_KEY = "luxuryPerfumeUsers";

    var signupForm = document.getElementById("signupForm");
    var loginForm = document.getElementById("loginForm");

    /* ---------- helpers ---------- */

    function showMessage(form, message, success) {
        var box = form.querySelector(".form-message");

        if (!box) {
            box = document.createElement("p");
            box.className = "form-message";
            box.setAttribute("role", "status");
            form.appendChild(box);
        }

        box.textContent = message;
        box.className = "form-message is-visible " + (success ? "success" : "error");
    }

    function clearMessage(form) {
        var box = form.querySelector(".form-message");
        if (box) box.className = "form-message";
    }

    function getUsers() {
        try {
            var users = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
            return Array.isArray(users) ? users : [];
        } catch (error) {
            return [];
        }
    }

    /* ---------- sign up ---------- */

    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();
            clearMessage(signupForm);

            var firstName = signupForm.elements["firstname"].value.trim();
            var lastName = signupForm.elements["lastname"].value.trim();
            var email = signupForm.elements["email"].value.trim().toLowerCase();
            var password = signupForm.elements["password"].value;
            var favourite = signupForm.elements["favorite_brand"].value;

            if (!firstName || !lastName || !email || !password) {
                showMessage(signupForm, "Please complete every required field.", false);
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
                showMessage(signupForm, "Please enter a valid email address.", false);
                return;
            }

            if (password.length < 8) {
                showMessage(signupForm, "Your password must be at least 8 characters.", false);
                return;
            }

            var users = getUsers();

            if (users.some(function (user) { return user.email === email; })) {
                showMessage(signupForm, "This email is already registered. Please log in.", false);
                return;
            }

            users.push({
                firstname: firstName,
                lastname: lastName,
                email: email,
                password: password,
                favorite_brand: favourite
            });

            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
            } catch (error) {
                showMessage(signupForm, "Registration could not be saved in this browser.", false);
                return;
            }

            showMessage(
                signupForm,
                "Welcome to the house, " + firstName + ". Your account is ready — taking you to sign in…",
                true
            );

            signupForm.reset();

            window.setTimeout(function () {
                window.location.href = "login.html";
            }, 1600);
        });
    }

    /* ---------- log in ---------- */

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            clearMessage(loginForm);

            var email = loginForm.elements["email"].value.trim().toLowerCase();
            var password = loginForm.elements["password"].value;

            if (!email || !password) {
                showMessage(loginForm, "Please enter your email and password.", false);
                return;
            }

            var user = getUsers().find(function (account) {
                return account.email === email;
            });

            if (user && user.password === password) {
                showMessage(loginForm, "Welcome back. Opening your account…", true);
                window.setTimeout(function () {
                    window.location.href = "index.html";
                }, 900);
            } else {
                showMessage(loginForm, "Invalid email or password. Please register first or try again.", false);
            }
        });
    }
});
