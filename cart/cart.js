// cart.js

document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const itemTotalElement = document.getElementById('item-total');
    const deliveryCharge = 1.00;
    const tax = 0.50;
    const totalAmountElement = document.getElementById('total-amount');

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let itemTotal = 0;

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="Images/${item.img}" alt="${item.name}">
                <div class="cart-item-info">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <input type="number" value="${item.quantity}" min="1" data-name="${item.name}" class="quantity-input">
                </div>
                <button class="remove-btn" data-name="${item.name}">Remove</button>
            `;

            cartItemsContainer.appendChild(itemElement);

            itemTotal += item.price * item.quantity;
        });

        itemTotalElement.textContent = itemTotal.toFixed(2);
        const totalAmount = itemTotal + deliveryCharge + tax;
        totalAmountElement.textContent = totalAmount.toFixed(2);

        // Add event listeners for quantity inputs
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', updateQuantity);
        });

        // Add event listeners for remove buttons
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', removeItem);
        });
    }

    function updateQuantity(event) {
        const input = event.target;
        const itemName = input.getAttribute('data-name');
        const newQuantity = parseInt(input.value, 10);

        const item = cart.find(item => item.name === itemName);
        if (item) {
            item.quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    }

    function removeItem(event) {
        const button = event.target;
        const itemName = button.getAttribute('data-name');

        const itemIndex = cart.findIndex(item => item.name === itemName);
        if (itemIndex > -1) {
            cart.splice(itemIndex, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    }

    function checkout() {
        alert('Proceeding to checkout!');
        // Add further checkout logic here
    }

    renderCart();
});
