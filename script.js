let cart = [];

// Función para agregar productos al carrito
function addToCart(productName, price) {
  cart.push({ name: productName, price: price });
  updateCart();
}

// Función para eliminar productos del carrito
function removeFromCart(index) {
  const item = cart[index];
  if (confirm(`¿Eliminar "${item.name}" del carrito?`)) {
    cart.splice(index, 1); // Elimina el producto
    updateCart(); // Actualiza carrito
  }
}

// Función para actualizar la vista del carrito
function updateCart() {
  const cartCount = document.getElementById('cart-count');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartSummary = document.getElementById('cart-summary');
  const whatsappLink = document.getElementById('whatsapp-link');

  cartCount.textContent = cart.length;
  cartItems.innerHTML = '';
  let total = 0;

  // Generar lista de productos
  let message = "¡Hola! Quiero hacer el siguiente pedido:%0A";

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add('flex', 'justify-between', 'items-center', 'mb-2');

    // Texto del producto
    const itemText = document.createElement('span');
    itemText.textContent = `${item.name} - $${item.price.toFixed(2)}`;

    // Botón eliminar
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '❌';
    deleteBtn.classList.add('ml-2', 'text-red-500', 'hover:text-red-700', 'font-bold');
    deleteBtn.onclick = () => removeFromCart(index);

    li.appendChild(itemText);
    li.appendChild(deleteBtn);
    cartItems.appendChild(li);

    total += item.price;
    message += `• ${item.name} - $${item.price.toFixed(2)}%0A`;
  });

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  message += `Total a pagar: $${total.toFixed(2)}`;

  // Número de WhatsApp (cambiar por el real)
  const phoneNumber = "18098794247";
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

  // Asignar link de WhatsApp
  whatsappLink.href = whatsappURL;

  // Mostrar carrito solo si hay productos
  cartSummary.classList.toggle('hidden', cart.length === 0);
}

