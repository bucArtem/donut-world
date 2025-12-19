let cart = {};
let total = 0;

const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartModal = document.getElementById("cart-modal");

// +
document.querySelectorAll(".plus").forEach(btn => {
    btn.addEventListener("click", () => {
        const name = btn.dataset.name;
        const price = Number(btn.dataset.price);
        const counter = btn.parentElement.querySelector(".count");

        cart[name] = (cart[name] || 0) + 1;
        total += price;

        counter.textContent = cart[name];
        animate(counter);
        updateCart();
    });
});

// −
document.querySelectorAll(".minus").forEach(btn => {
    btn.addEventListener("click", () => {
        const plusBtn = btn.parentElement.querySelector(".plus");
        const name = plusBtn.dataset.name;
        const price = Number(plusBtn.dataset.price);
        const counter = btn.parentElement.querySelector(".count");

        if (cart[name] > 0) {
            cart[name]--;
            total -= price;
            counter.textContent = cart[name];
            animate(counter);

            if (cart[name] === 0) delete cart[name];
            updateCart();
        }
    });
});

function updateCart() {
    cartItems.innerHTML = "";
    let count = 0;

    for (let item in cart) {
        const li = document.createElement("li");
        li.textContent = `${item} × ${cart[item]}`;
        cartItems.appendChild(li);
        count += cart[item];
    }

    cartCount.textContent = count;
    cartTotal.textContent = total;
}

function animate(el) {
    el.classList.add("bump");
    setTimeout(() => el.classList.remove("bump"), 300);
}

document.querySelector(".cart").onclick = () => {
    cartModal.style.display = "block";
};

function closeCart() {
    cartModal.style.display = "none";
}

function openTab(id) {
    document.querySelectorAll(".tab").forEach(tab => {
        tab.classList.remove("active-tab");
    });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
    });

    document.getElementById(id).classList.add("active-tab");
    event.target.classList.add("active");
}
