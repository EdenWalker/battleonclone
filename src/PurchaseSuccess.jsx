import React, { useEffect } from "react";
import { Link } from "wouter";
import { useCart } from "./Cart";

const PurchaseSuccess = () => {
  const { cart, addToInventory } = useCart();

  useEffect(() => {
    if (cart.length > 0) {
      cart.forEach(item => addToInventory(item));
    }
  }, [cart, addToInventory]);

  return (
    <div className="container mt-4">
      <h2>Thank You for Your Purchase!</h2>
      <p>Your purchase has been successful. Check your inventory for the updated collection.</p>
      <ul className="list-group mt-4">
        {cart.map((item) => (
          <li key={item.id} className="list-group-item">
            <h5>{item.name}</h5>
            <img
              src={item.imageUrl}
              alt={item.description}
              style={{ width: "30vw", height: "auto" }}
            />
            <p>Quantity: {item.quantity}</p>
            <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <Link href="/inventory" className="btn btn-primary">
          Go to Inventory
        </Link>
      </div>
    </div>
  );
};

export default PurchaseSuccess;
