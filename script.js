let cart = [];

function addToCart(name, price, quantity) {
    quantity = parseInt(quantity);
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += quantity;
        existing.totalPrice = existing.quantity * existing.price;
    } else {
        cart.push({ name, price, quantity, totalPrice: price * quantity });
    }
    alert(`✅ "${name}" x${quantity} agregado al carrito.`);
    updateCart();
}

function updateCart() {
    const items = document.getElementById('cart-items');
    const total = document.getElementById('cart-total');
    items.innerHTML = '';
    let sum = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('flex', 'justify-between', 'items-center', 'mb-2');
        li.innerHTML = `${item.name} x${item.quantity} - $${item.totalPrice.toFixed(2)} <button onclick="removeItemFromCart(${index})" class="bg-red-500 text-white rounded-full px-2 py-1">❌</button>`;
        items.appendChild(li);
        sum += item.totalPrice;
    });

    const delivery = 100;
    const totalWithDelivery = sum + delivery;
    items.innerHTML += `<li class="flex justify-between font-semibold">🚚 Delivery: <span>$${delivery.toFixed(2)}</span></li>`;
    total.textContent = `Total con Delivery: $${totalWithDelivery.toFixed(2)}`;
    document.getElementById('total-payment').textContent = totalWithDelivery.toFixed(2);
}

function removeItemFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    document.getElementById('cart-summary').classList.toggle('hidden');
}

function showPaymentDetails() {
    document.getElementById('bank-payment-modal').classList.remove('hidden');
}

function closePaymentModal() {
    document.getElementById('bank-payment-modal').classList.add('hidden');
}

function sendOrder(phone) {
    const details = cart.map(item => `${item.name} x${item.quantity} - $${item.totalPrice.toFixed(2)}`).join('%0A');
    const total = cart.reduce((acc, item) => acc + item.totalPrice, 0) + 100; // Incluye delivery
    const message = `Hola! Quiero ordenar:%0A${details}%0A🚚 Delivery: $100.00%0ATotal: $${total.toFixed(2)}`;
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

