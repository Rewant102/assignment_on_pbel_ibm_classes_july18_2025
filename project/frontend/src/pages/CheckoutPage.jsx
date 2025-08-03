import React from 'react';
import api from '../api/api';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Login first');

    try {
     const res = await api.post("/orders", { items: cartItems },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Order placed!');
      clearCart();
    } catch (err) {
      console.error(err);
      alert('Checkout failed');
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id}>
                {item.title} × {item.quantity} = ₹{item.price * item.quantity}
              </li>
            ))}
          </ul>
          <h4>Total: ₹{total}</h4>
          <button onClick={handleCheckout}>Place Order</button>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
