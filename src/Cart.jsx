import { atom, useAtom } from 'jotai';
import Immutable from 'seamless-immutable';

const initialCart = Immutable([]);
export const inventoryAtom = atom(Immutable([]));


export const cartAtom = atom(initialCart);

export const useCart = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const [inventory, setInventory] = useAtom(inventoryAtom);
  const setCartContent = (cartItems) => {
    setCart(Immutable(cartItems));
  }
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const removeFromCart = (product_id) => {
    setCart((currentCart) => currentCart.filter((item) => item.product_id !== product_id));
  };

  const modifyQuantity = (product_id, quantity) => {
    setCart((currentCart) => {
      const existingItemIndex = currentCart.findIndex((item) => item.product_id === product_id);
      if (existingItemIndex !== -1) {
        if (quantity <= 0) {
          return currentCart.filter((item) => item.product_id !== product_id);
        } else {
          return currentCart.map((item, index) =>
            index === existingItemIndex ? { ...item, quantity } : item
          );
        }
      }
      return currentCart;
    });
  };

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItemIndex = currentCart.findIndex((item) => item.product_id === product.id);
      if (existingItemIndex !== -1) {
        return currentCart.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...currentCart, { ...product, product_id: product.id, quantity: 1 }];
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToInventory = (newItem) => {
    setInventory((currentInventory) => {
      const existingItemIndex = currentInventory.findIndex((item) => item.id === newItem.id);
      if (existingItemIndex > -1) {
        // Update the quantity of an existing item
        return [
          ...currentInventory.slice(0, existingItemIndex),
          { ...currentInventory[existingItemIndex], quantity: currentInventory[existingItemIndex].quantity + newItem.quantity },
          ...currentInventory.slice(existingItemIndex + 1)
        ];
      }
      return [...currentInventory, { ...newItem, quantity: newItem.quantity }];
    });
  };
  
  
  

  return {
    cart,
    getCartTotal,
    removeFromCart,
    modifyQuantity,
    addToCart,
    clearCart,
    inventory,
    addToInventory,
    setCartContent
  };
};
