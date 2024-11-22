import React, { useEffect, useRef, useState } from 'react';
import { useCart } from './Cart';
import { useJwt } from './UserStore';
import { useLocation } from 'wouter';
import axios from 'axios';

const ShoppingCart = () => {
  const { cart, getCartTotal, modifyQuantity, removeFromCart, setCartContent } = useCart();
  const { getJwt } = useJwt();
  const [isUpdating, setIsUpdating] = useState(false);
  const [, setLocation] = useLocation();
  const isFirstRender = useRef(true); // Skip updates on first render

  // Fetch cart from server
  const fetchCart = async () => {
    const jwt = getJwt();
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL + '/api/cart', {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      console.log('Cart:', response.data);
      setCartContent(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  // Update cart on server
  const updateCart = async () => {
    setIsUpdating(true);
    const jwt = getJwt();
    try {
      const updatedCart = cart.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity
      }));

      await axios.put(
        import.meta.env.VITE_API_URL + '/api/cart',
        { cartItems: updatedCart },
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        }
      );
    } catch (error) {
      console.error('Error updating cart:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Fetch cart on initial render
  useEffect(() => {
    fetchCart();
    return () => console.log('Cleanup after fetchCart');
  }, []);

  // Update cart when cart state changes (except on first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    updateCart();
    return () => console.log('Cleanup after updateCart');
  }, [cart]);

  // Navigate to confirmation page
  const handleProceedToConfirmation = () => {
    setLocation('/confirmation', { cart });
  };

  return (
    <div className="container mt-4">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group">
            {cart.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <h5>{item.name}</h5>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '30vw', height: 'auto' }}
                  />
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-sm btn-secondary me-2"
                      onClick={() => modifyQuantity(item.product_id, item.quantity - 1)}
                      disabled={isUpdating}
                    >
                      -
                    </button>
                    <p className="mb-0">Quantity: {item.quantity}</p>
                    <button
                      className="btn btn-sm btn-secondary ms-2"
                      onClick={() => modifyQuantity(item.product_id, item.quantity + 1)}
                      disabled={isUpdating}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-sm btn-danger ms-2"
                      onClick={() => removeFromCart(item.product_id)}
                      disabled={isUpdating}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 text-end">
            <h4>Total: ${getCartTotal()}</h4>
          </div>
          <div className="text-center mt-4">
            <button
              className="btn btn-primary"
              onClick={handleProceedToConfirmation}
              disabled={isUpdating}
            >
              Proceed to Confirm Purchase
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
