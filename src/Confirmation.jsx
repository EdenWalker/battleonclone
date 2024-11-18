import React, { useRef } from "react";
import { useCart } from "./Cart";
import { useLocation } from "wouter";

const Confirmation = () => {
  const { cart, getCartTotal, addToInventory, clearCart, inventory } = useCart();
  const [, setLocation] = useLocation();

  // Refs to track purchase confirmation and inventory update
  const purchaseConfirmedRef = useRef(false);
  const inventoryUpdatedRef = useRef(false);

  const handleCompletePurchase = () => {
    if (!purchaseConfirmedRef.current) {
      purchaseConfirmedRef.current = true;
      console.log("Cart before purchase:", cart);

      // Add items to inventory if not already done
      if (!inventoryUpdatedRef.current && cart.length > 0) {
        cart.forEach(item => addToInventory(item)); // Add each item to inventory
        inventoryUpdatedRef.current = true; // Mark inventory as updated
      }

      // Optionally clear cart after confirming purchase
      clearCart();

      // Redirect to success page
      setTimeout(() => {
        setLocation("/PurchaseSuccess");
      }, 200);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Confirm Your Purchase</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group">
            {cart.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.productName}</h5>
                  <img
                    src={item.imageUrl}
                    alt="Image description"
                    style={{ width: "30vw", height: "auto" }}
                  />
                  <p>Quantity: {item.quantity}</p>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 text-end">
            <h4>Total: ${getCartTotal()}</h4>
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-success" onClick={handleCompletePurchase}>
              Complete Purchase
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Confirmation;
