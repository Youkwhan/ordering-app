import { menuArray } from "./data.js";
const cardForm = document.getElementById("card-form");

cardForm.addEventListener("submit", function (e) {
	e.preventDefault();
	const cardFormData = new FormData(cardForm);
	const fullName = cardFormData.get("full-name");
	const orderSuccess = document.getElementById("order-success");

	orderSuccess.textContent = `Thanks, ${fullName}! Your order is on the way!`;

	document.getElementById("cart-container").classList.add("hidden");
	document.getElementById("modal").classList.add("hidden");
	orderSuccess.classList.remove("hidden");
});

document.addEventListener("click", function (e) {
	// if it's a menu button
	if (e.target.dataset.select) {
		handleAddItem(e.target.dataset.select);
	} else if (e.target.dataset.remove) {
		handleRemoveItem(e.target.dataset.remove);
	} else if (e.target.id === "checkout-btn") {
		handleCompleteOrderBtn();
	}
});

// This function should pull up modal for checking out
function handleCompleteOrderBtn() {
	document.getElementById("modal").classList.remove("hidden");
}

function handleAddItem(itemId) {
	document.getElementById("cart-container").classList.remove("hidden");
	// grab correct item in data,
	const targetProductObj = menuArray.filter(function (item) {
		return item.id === Number(itemId);
	})[0];
	targetProductObj.amount++;
	renderCart();
}

function handleRemoveItem(itemId) {
	// so when we click remove button, it should decrease the item.amount, then render shopping cart
	// IF item.amount == 0, Remove entire item, which renderCart() already deals with

	// which object did user click
	const targetProductObj = menuArray.filter(function (item) {
		// int === str
		return item.id === Number(itemId);
	})[0];

	targetProductObj.amount--;
	renderCart();
}

function renderCart() {
	const cartOrdersEl = document.getElementById("cart-orders");
	// render the items if they have an amount greater than 0
	let cartOrders = "";

	menuArray.forEach(function (item) {
		if (item.amount > 0) {
			cartOrders += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <button class="remove-item-btn" data-remove=${item.id}>remove</button>
                <p>$${item.price} <span class="amount">x${item.amount}</span></p>
            </div>
            `;
		}
	});

	// IF there is something in cartOrder render, ELSE hidden cart-container
	if (cartOrders) {
		cartOrdersEl.innerHTML = cartOrders;

		// update total price, by call function to calculate.
		document.querySelector(
			".price .total-price"
		).textContent = `$${totalPrice()}`;
	} else {
		document.getElementById("cart-container").classList.add("hidden");
	}
}

function totalPrice() {
	// we calculate by grabbing the amount and price, return the totalPrice
	let total = 0;
	menuArray.forEach(function (item) {
		total += item.amount * item.price;
	});
	return total;
}

function renderMenu() {
	const menuEl = document.getElementById("menu-section");
	let menuItems = "";

	menuArray.forEach(function (item) {
		menuItems += `
        <div class="product">
            <i class="icon">${item.emoji}</i>
            <div class="product-description">
                <h3>${item.name}</h3>
                <p class="opacity">${item.ingredients.join(", ")}</p>
                <p>$${item.price}</p>
            </div>
            <button class="product-add product-btn" data-select=${
							item.id
						}>+</button>
        </div>
        <hr class="spacing product-line">
        `;
	});

	menuEl.innerHTML = menuItems;
}

function render() {
	renderMenu();
}

render();
