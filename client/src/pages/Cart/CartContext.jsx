import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_KEY   = 'cartItems';
const EXPIRE_KEY = 'cartExpireTime';
const EXPIRE_MINUTES = 15;

export function CartProvider({ children }){
  // ── State — restore from localStorage on first load ────────────────────────
  const [items, setItems] = useState(() => {
    try {
      const saved      = localStorage.getItem(CART_KEY);
      const expireTime = localStorage.getItem(EXPIRE_KEY);

      // ถ้าตะกร้าหมดอายุแล้วให้ล้างทิ้ง
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

  // ── Derived values ─────────────────────────────────────────────────────────
  const ticketAmount = items.length;
  const totalPrice   = items.reduce((sum, item) => sum + item.price, 0);

  // ── Sync items → localStorage ──────────────────────────────────────────────
  useEffect(() => {
    if(items.length === 0){
      localStorage.removeItem(CART_KEY);
    } else {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    }
  }, [items]);

  // ── Actions ────────────────────────────────────────────────────────────────
  const addItem = (item) => {
    setItems((prev) => {
      const isFirstItem = prev.length === 0;

      // ตั้ง expire timer เฉพาะตอนเพิ่มชิ้นแรก
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

      // ถ้าตะกร้าว่างแล้วให้ลบ expire timer ด้วย
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

  // ── Context value ──────────────────────────────────────────────────────────
  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, ticketAmount, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  // return useContext(CartContext);
  const context = useContext(CartContext);
  
  // ถ้า context เป็น undefined แสดงว่าลืมเอา Provider ไปครอบตอนเรียกใช้
  if(context === undefined){
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};