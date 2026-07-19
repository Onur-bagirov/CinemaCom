import React, { createContext, useState, useContext, ReactNode } from "react";

interface CartItem {
  movieTitle: string;
  seats: number;
  totalPrice: number;
  selectedSeats: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  updateCartItem: (index: number, item: CartItem) => void;
  getCartItem: (index: number) => CartItem | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = (): number => {
    return cart.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  const getTotalItems = (): number => {
    return cart.length;
  };

  const updateCartItem = (index: number, item: CartItem) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      if (index >= 0 && index < newCart.length) {
        newCart[index] = item;
      }
      return newCart;
    });
  };

  const getCartItem = (index: number): CartItem | undefined => {
    return cart[index];
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalPrice,
        getTotalItems,
        updateCartItem,
        getCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};