import React, { useState } from 'react';
import { useCart } from './Cart';
import { useLocation } from 'wouter';

const OpponentCard = (props) => {
  const { addToCart } = useCart();
  const [, setLocation] = useLocation();

  const [messages, setMessages] = useState('');
  const [showMessages, setShowMessages] = useState(false);

  const handleAddToCart = () => {
    addToCart(props);
    setMessages(`${props.productName} added to cart`);
    setShowMessages(true);

    setTimeout(() => {
      setShowMessages(false);
    }, 2000);
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
          src={props.imageUrl}
          alt={props.productName}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
      <div className="card-body" style={{ height: '40%' }}>
        <h5 className="card-title">{props.productName}</h5>
        <p className="card-text">${props.price}</p>
        {/* <p className="card-text">{props.description}</p> */}
       {/* { <p className="card-text">Difficulty: {props.difficulty}</p>} */}
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
