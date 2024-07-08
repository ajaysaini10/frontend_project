// scripts.js

document.querySelector('.search-bar button').addEventListener('click', function() {
    const query = document.querySelector('.search-bar input').value;
    alert(`Searching for: ${query}`);
});

document.querySelectorAll('.option').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.option').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
    });
});

let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

function addToCart(name, price, img) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ name, price, img, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    window.location.href = 'cart.html'; // Navigate to cart page
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = cartCount;
}

function toggleLike(button) {
    button.classList.toggle('liked');
}
