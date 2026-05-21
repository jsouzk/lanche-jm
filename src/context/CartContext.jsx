import { useEffect, useState } from "react";

import { CartContext } from "./cartContextValue";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  /* SALVAR NO LOCALSTORAGE */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ADICIONAR */
  const addToCart = (item) => {
    setCart((prev) => {
      const itemKey = item.cartId || String(item.id);
      const itemToAdd = { ...item, cartId: itemKey };
      const exists = prev.find((p) => (p.cartId || String(p.id)) === itemKey);

      if (exists) {
        return prev.map((p) =>
          (p.cartId || String(p.id)) === itemKey
            ? { ...p, cartId: itemKey, quantity: p.quantity + 1 }
            : p
        );
      }

      return [...prev, { ...itemToAdd, quantity: 1 }];
    });
  };

  /* AUMENTAR */
  const increase = (cartId) => {
    setCart((prev) =>
      prev.map((item) =>
        (item.cartId || String(item.id)) === cartId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  /* DIMINUIR */
  const decrease = (cartId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          (item.cartId || String(item.id)) === cartId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  /* REMOVER */
  const removeFromCart = (cartId) => {
    setCart((prev) => prev.filter((item) => (item.cartId || String(item.id)) !== cartId));
  };

  const updateItemObservation = (cartId, observation) => {
    setCart((prev) =>
      prev.map((item) =>
        (item.cartId || String(item.id)) === cartId
          ? { ...item, observation }
          : item
      )
    );
  };

  /* LIMPAR */
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increase,
        decrease,
        removeFromCart,
        updateItemObservation,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
