import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const ticketAmount = items.length;
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  const addItem = (item) => setItems(prev => [...prev, item]);
  const removeItem = (seat_id, showtime_id) => setItems(prev => prev.filter(i => !(i.seat_id === seat_id && i.showtime_id === showtime_id)));
  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, ticketAmount, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);