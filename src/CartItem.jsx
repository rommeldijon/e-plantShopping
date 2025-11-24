// CartItem.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate subtotal for a single item (quantity * unit price)
  const calculateItemTotal = (item) => {
    const unitPrice = parseFloat(item.cost.toString().substring(1)); // remove "$"
    return unitPrice * item.quantity;
  };

  // 1. Cost of all items in cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      const itemTotal = calculateItemTotal(item);
      total += itemTotal;
    });
    return total;
  };

  // 2. Continue shopping
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e); // call parent handler to go back to product list
  };

  // 3. Checkout (placeholder for now)
  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Functionality to be added for future reference');
  };

  // 4. Increment quantity
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1, // increase by 1
      })
    );
  };

  // 4. Decrement quantity (or remove if it goes to 0)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1, // decrease by 1
        })
      );
    } else {
      // If quantity would go to 0, remove the item from cart
      dispatch(removeItem(item.name));
    }
  };

  // 5. Remove plant from cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const totalAmount = calculateTotalAmount();

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <button className="cart-button" onClick={handleContinueShopping}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items-list">
            {cart.map((item) => (
              <div className="cart-item-card" key={item.name}>
                <div className="cart-item-left">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                </div>

                <div className="cart-item-middle">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-unit-cost">Unit price: {item.cost}</p>

                  <div className="cart-item-quantity-controls">
                    <button
                      className="quantity-button"
                      onClick={() => handleDecrement(item)}
                    >
                      −
                    </button>
                    <span className="cart-item-quantity">{item.quantity}</span>
                    <button
                      className="quantity-button"
                      onClick={() => handleIncrement(item)}
                    >
                      +
                    </button>
                  </div>

                  <p className="cart-item-subtotal">
                    Subtotal: ${calculateItemTotal(item).toFixed(2)}
                  </p>
                </div>

                <div className="cart-item-right">
                  <button
                    className="remove-button"
                    onClick={() => handleRemove(item)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-total">
              <h3>Total:</h3>
              <span className="cart-total-amount">
                ${totalAmount.toFixed(2)}
              </span>
            </div>

            <div className="cart-actions">
              <button className="cart-button" onClick={handleContinueShopping}>
                Continue Shopping
              </button>
              <button className="cart-button checkout" onClick={handleCheckoutShopping}>
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;
