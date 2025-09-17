import React, { useState } from "react";
import useCart from "../context/useCart";

const Cart = () => {
  const { cart, setCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showCheckoutCard, setShowCheckoutCard] = useState(false);

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setShowCheckoutCard(true);

    setTimeout(() => {
      setIsCheckingOut(false);
    }, 2000);
  };

  const handleSubmitOrder = () => {
    setShowCheckoutCard(false);
    setCart([]);
  };

  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="cart">
        <h2>Your Cart is Empty</h2>
        <p>Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cart.map((product) => (
          <div className="cart-item" key={product.id}>
            <img src={product.image} alt={product.title} />
            <div className="cart-item-details">
              <h3>{product.title}</h3>
              <p className="price">Price: ${product.price}</p>

              <div className="quantity-buttons">
                <button
                  className="decrease"
                  onClick={() => decreaseQuantity(product.id)}
                >
                  -
                </button>
                <span>{product.quantity}</span>
                <button
                  className="increase"
                  onClick={() => increaseQuantity(product.id)}
                >
                  +
                </button>
              </div>

              <p className="subtotal">
                Subtotal: ${(product.price * product.quantity).toFixed(2)}
              </p>

              <button
                className="remove-btn"
                onClick={() => removeItem(product.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: ${total.toFixed(2)}</h3>
        <div className="cart-actions">
          <button className="clear-cart" onClick={clearCart}>
            Clear Cart
          </button>
          <button
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={isCheckingOut}
          >
            {isCheckingOut ? "Processing..." : "Checkout"}
          </button>
        </div>
      </div>

      {/* Checkout Success Card */}
      {showCheckoutCard && (
        <div className="checkout-overlay">
          <div className="checkout-card">
            <div className="checkout-icon">✅</div>
            <h3>Order Placed Successfully!</h3>
            <p>Thank you for your purchase.</p>
            <p>Your order has been confirmed.</p>
            <div className="checkout-details">
              <p>Total Amount: ${total.toFixed(2)}</p>
              <p>
                Order ID: #
                {Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
            </div>
            <button className="submit-order-btn" onClick={handleSubmitOrder}>
              Submit Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
