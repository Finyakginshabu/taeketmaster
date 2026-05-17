import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_KEY   = 'cartItems';
const EXPIRE_KEY = 'cartExpireTime';
const EXPIRE_MINUTES = 15;

export function CartProvider({ children }){
  
  const [items, setItems] = useState(() => {
    try {
      const saved      = localStorage.getItem(CART_KEY);
      const expireTime = localStorage.getItem(EXPIRE_KEY);

      
      if(saved && expireTime && Date.now() > Number(expireTime)){
        localStorage.removeItem(CART_KEY);
        localStorage.removeItem(EXPIRE_KEY);
        return [];
      }

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  
  const ticketAmount = items.length;
  const totalPrice   = items.reduce((sum, item) => sum + item.price, 0);

  
  useEffect(() => {
    if(items.length === 0){
      localStorage.removeItem(CART_KEY);
    } else {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    }
  }, [items]);

  
  const addItem = (item) => {
    setItems((prev) => {
      const isFirstItem = prev.length === 0;

      
      if(isFirstItem){
        const expireTime = Date.now() + EXPIRE_MINUTES * 60 * 1000;
        localStorage.setItem(EXPIRE_KEY, String(expireTime));
      }

      return [...prev, item];
    });
  };

  const removeItem = (seat_id, showtime_id) => {
    setItems((prev) => {
      const next = prev.filter(
        (i) => !(i.seat_id === seat_id && i.showtime_id === showtime_id)
      );

      
      if(next.length === 0){
        localStorage.removeItem(EXPIRE_KEY);
      }

      return next;
    });
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem(EXPIRE_KEY);
  };

  
  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, ticketAmount, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  
  const context = useContext(CartContext);
  
  
  if(context === undefined){
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};