
document.addEventListener("DOMContentLoaded", function () {
    const cartKey = "luxuryPerfumeCart";

    const cartItems = document.getElementById("lp-cart-items");
    const cartEmpty = document.getElementById("lp-cart-empty");
    const cartTotal = document.getElementById("lp-cart-total");
    const cartCount = document.getElementById("lp-cart-count");
    const cartMessage = document.getElementById("lp-cart-message");
    const clearButton = document.getElementById("lp-clear-cart");
    const checkoutButton = document.getElementById("lp-checkout");

    // Stop if this page does not contain the shopping bag.
    if (!cartItems || !cartTotal || !cartCount) return;

    let cart = [];

    try {
        const savedCart = JSON.parse(localStorage.getItem(cartKey));
        if (Array.isArray(savedCart)) {
            cart = savedCart.filter(function (item) {
                return item &&
                    typeof item.id === "string" &&
                    typeof item.name === "string" &&
                    Number.isFinite(Number(item.price)) &&
                    Number(item.price) >= 0 &&
                    Number.isInteger(Number(item.quantity)) &&
                    Number(item.quantity) > 0;
            }).map(function (item) {
                return {
                    id: item.id,
                    name: item.name,
                    price: Number(item.price),
                    quantity: Number(item.quantity)
                };
            });
        }
    } catch (error) {
        cart = [];
    }

    function money(amount) {
        const value = Number(amount) || 0;
        const parts = value.toFixed(2).split(".");
        const whole = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");
        return "R" + whole + "." + parts[1];
    }

    function saveCart() {
        localStorage.setItem(cartKey, JSON.stringify(cart));
    }

    function renderCart() {
        cartItems.replaceChildren();

        let total = 0;
        let count = 0;

        cart.forEach(function (item) {
            const lineTotal = item.price * item.quantity;
            total += lineTotal;
            count += item.quantity;

            const row = document.createElement("div");
            row.className = "cart-item";

            const details = document.createElement("div");

            const heading = document.createElement("h3");
            heading.textContent = item.name;

            const price = document.createElement("p");
            price.textContent = money(item.price) + " each";

            const line = document.createElement("p");
            line.textContent = "Subtotal: " + money(lineTotal);

            details.append(heading, price, line);

            const controls = document.createElement("div");
            controls.className = "cart-controls";

            const decrease = document.createElement("button");
            decrease.type = "button";
            decrease.textContent = "−";
            decrease.setAttribute("aria-label", "Decrease " + item.name);
            decrease.addEventListener("click", function () {
                changeQuantity(item.id, -1);
            });

            const quantity = document.createElement("span");
            quantity.textContent = "Qty: " + item.quantity;

            const increase = document.createElement("button");
            increase.type = "button";
            increase.textContent = "+";
            increase.setAttribute("aria-label", "Increase " + item.name);
            increase.addEventListener("click", function () {
                changeQuantity(item.id, 1);
            });

            const remove = document.createElement("button");
            remove.type = "button";
            remove.textContent = "REMOVE";
            remove.addEventListener("click", function () {
                cart = cart.filter(function (product) {
                    return product.id !== item.id;
                });
                saveCart();
                renderCart();
                showMessage(item.name + " removed from your bag.");
            });

            controls.append(decrease, quantity, increase, remove);
            row.append(details, controls);
            cartItems.appendChild(row);
        });

        cartTotal.textContent = money(total);
        cartCount.textContent = count;
        cartEmpty.hidden = cart.length > 0;

        if (clearButton) clearButton.disabled = cart.length === 0;
        if (checkoutButton) checkoutButton.disabled = cart.length === 0;
    }

    function changeQuantity(id, amount) {
        const item = cart.find(function (product) {
            return product.id === id;
        });

        if (!item) return;

        item.quantity += amount;

        if (item.quantity <= 0) {
            cart = cart.filter(function (product) {
                return product.id !== id;
            });
        }

        saveCart();
        renderCart();
    }

    function showMessage(message) {
        if (cartMessage) cartMessage.textContent = message;
    }

    // Connect each perfume's Add to Bag button.
    document.querySelectorAll(".lp-add-to-cart").forEach(function (button) {
        button.addEventListener("click", function () {
            const card = button.closest(".lp-product-card");
            if (!card) return;

            const id = button.dataset.id;
            const name = button.dataset.name;
            const price = Number(button.dataset.price);

            if (!id || !name || !Number.isFinite(price) || price < 0) {
                showMessage("Sorry, this product could not be added.");
                return;
            }

            const existing = cart.find(function (item) {
                return item.id === id;
            });

            if (existing) {
                existing.quantity++;
            } else {
                cart.push({
                    id: id,
                    name: name,
                    price: price,
                    quantity: 1
                });
            }

            saveCart();
            renderCart();
            showMessage(name + " added to your bag.");

            // Let the site open the shopping bag drawer for feedback.
            document.dispatchEvent(new CustomEvent("cart:add", {
                detail: { name: name }
            }));
        });
    });

    if (clearButton) {
        clearButton.addEventListener("click", function () {
            if (cart.length === 0) return;

            cart = [];
            saveCart();
            renderCart();
            showMessage("Your shopping bag has been cleared.");
        });
    }

    if (checkoutButton) {
        checkoutButton.addEventListener("click", function () {
            if (cart.length === 0) {
                showMessage("Your shopping bag is empty.");
                return;
            }

            showMessage(
                "Demo checkout only. No payment has been processed. " +
                "Your subtotal is " + cartTotal.textContent + "."
            );
        });
    }

    renderCart();
});
