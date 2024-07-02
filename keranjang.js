document.addEventListener("DOMContentLoaded", function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function renderCart() {
        const cartContainer = document.getElementById('cart-items');
        cartContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p>${item.price}</p>
                </div>
                <button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button>
            `;
            cartContainer.appendChild(itemElement);
        });

        if (cart.length > 0) {
            const orderNowButton = document.createElement('button');
            orderNowButton.className = 'btn btn-success';
            orderNowButton.textContent = 'Order Now';
            orderNowButton.onclick = orderNow;
            cartContainer.appendChild(orderNowButton);
        }
    }

    window.addToCart = function(item) {
        cart.push(item);
        saveCart();
        renderCart();
    };

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        saveCart();
        renderCart();
    };

    window.orderNow = function() {
        if (cart.length === 0) {
            alert('Your cart is empty.');
            return;
        }
        
        const orderDetails = {
            items: cart,
            total: cart.reduce((sum, item) => sum + parseFloat(item.price), 0)
        };

        // For now, we'll just log the order details. You can replace this with an actual order processing logic.
        console.log('Order details:', orderDetails);

        alert('Order has been placed successfully!');

        // Clear the cart after placing the order
        cart.length = 0;
        saveCart();
        renderCart();
    };

    renderCart();
});
