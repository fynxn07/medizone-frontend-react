

import axiosInstance from "../Admin/Services/AxioxInstance";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const cartContext = createContext();



function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  
  const getAuthHeaders = () => {
    const token = localStorage.getItem("access"); 
    return token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};
  };

 
  const loadCart = async () => {
    try {
      const token = localStorage.getItem("access");

     
      if (!token) {
        setCart([]);
        setTotal(0);
        return;
      }

      const res = await axiosInstance.get("/cart/cart_list/", {
        headers: getAuthHeaders(),
      });

      setCart(res.data.items || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      
      if (err.response && err.response.status === 401) {
        console.warn("Cart request 401 – probably not logged in");
        setCart([]);
        setTotal(0);
        return;
      }

      toast.error("❌ Failed to load cart");
      setCart([]);
      setTotal(0);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  
 const addToCart = async (product) => {
  
  const exists = cart.some((item) => item.product.id === product.id);

  if (exists) {
    toast.info("🛒 This product is already in your cart");
    return;
  }

 
  try {
    const res = await axiosInstance.post(
      "/cart/cart_add/",
      {
        product_id: product.id,
        quantity: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      }
    );

    await loadCart();

    if (res.status === 201) {
      toast.success(`✅ ${product.name} added to cart`);
    } else {
      toast.info("ℹ️ Added to cart");
    }
  } catch (err) {
    console.error(err);
    toast.error("❌ Failed to add to cart");
  }
};

  
  const updateQuantity = async (productId, amount) => {
    const item = cart.find((i) => i.product.id === productId);
    if (!item) return;

    const newQuantity = item.quantity + amount;

    if (newQuantity <= 0) {
     
      return removeFromCart(productId);
    }

    try {
      await axiosInstance.patch('/cart/cart_update/',
        {
          product_id: productId,
          quantity: newQuantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
        }
      );

      await loadCart();
      toast.success("🔄 Quantity updated");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update quantity");
    }
  };


  const removeFromCart = async (productId) => {
    try {
      
      await axiosInstance.delete( `/cart/cart_remove/?product_id=${productId}`,
        {
          headers: getAuthHeaders(),
        }
      );

      await loadCart();
      toast.info("🗑️ Item removed from cart");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to remove item");
    }
  };

  const clearCart = async () => {
    try {
      await Promise.all(
        cart.map((item) =>
          axiosInstance.delete(
            `/cart/cart_remove/?product_id=${item.product.id}`,
            {
              headers: getAuthHeaders(),
            }
          )
        )
      );
      await loadCart();
      toast.info("🧹 Cart cleared");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to clear cart");
    }
  };

  return (
    <cartContext.Provider
      value={{
        cart,
        total,
        setCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        reloadCart: loadCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export default CartProvider;
