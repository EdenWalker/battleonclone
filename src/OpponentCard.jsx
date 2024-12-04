import React, { useState } from 'react';
import { useCart } from './Cart';
import { useJwt } from './UserStore';
import axios from 'axios';

const OpponentCard = (props) => {
  const { addToCart } = useCart();
  const { getJwt } = useJwt();

  const [messages, setMessages] = useState('');
  const [showMessages, setShowMessages] = useState(false);

  const handleAddToCart = async () => {
    const jwt = getJwt();
    try {
     
      console.log(props.id);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cart`,
        { 
          cartItems: [
            { product_id: props.id, quantity: 1 } // Match the backend's structure
          ] 
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      addToCart({ ...props, quantity: response.data.quantity });
      setMessages(`${props.Name} added to cart`);
      setShowMessages(true);
      setTimeout(() => setShowMessages(false), 2000);
    } catch (error) {
      console.log(props.id)
      console.error('Error adding to cart:', error.response?.data || error.message);
      console.log(error.message)
      console.error('Error adding to cart:', error);
      setMessages('Failed to add to cart');
      setShowMessages(true);
      setTimeout(() => setShowMessages(false), 2000);
    }
  };

  return (
    <div className="card" style={{ width: '100%', height: '100%' }}>
      <div
        className="card-img-top"
        style={{
          width: '100%',
          height: '60%',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={props.imageUrl || props.image}
          alt={props.Name}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
      <div className="card-body" style={{ height: '40%' }}>
        <h5 className="card-title">{props.Name}</h5>
        <p className="card-text">${props.price}</p>
        {props.quantity && <p className="card-text">Quantity: {props.quantity}</p>}
        {!props.hideAddToCart && (
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
        )}
        {showMessages && (
          <div
            className="message-container"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              zIndex: '9999',
            }}
          >
            {messages}
          </div>
        )}
      </div>
    </div>
  );
};

export default OpponentCard;
