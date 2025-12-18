// import axios from "axios";
// import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export const cartContext = createContext();


  
// function CartProvider({ children }) {
//     const [cart, setCart] = useState([]);

//     const userId = localStorage.getItem("access"); 
//     const userUrl = userId ? `http://127.0.0.1:8000/cart/cart_list/` : null; 


//   useEffect(() => {
//     console.log(localStorage.getItem("userId"))
//     axios
//       .get(userUrl)
//       .then((res) => setCart(res.data.cart || []))
//       .catch(() => toast.error("❌ Failed to load cart"));
      
//       let store=localStorage.getItem("userId")
//       // console.log(store)
//   }, []);

//   const Carts = async (newCart, message) => {
//     try {
//       await axios.patch(userUrl, { cart: newCart });
//       setCart(newCart);
//       if (message) toast.success(message);
//     } catch {
//       toast.error("❌ Failed to sync cart with server");
//     }
//   };

  
//   function addToCart(product) {
//     const found = cart.find((item) => item.id === product.id);

//     if (found) {
//       const updatedItem = { ...found, quantity: found.quantity + 1 };
//       const newCart = cart.map((i) => (i.id === found.id ? updatedItem : i));
//       Carts(newCart, "ℹ️ Quantity updated in cart");

//     } else {
//       const newProduct = { ...product, quantity: 1 };
//       const newCart = [...cart, newProduct];
//       Carts(newCart, `✅ ${product.name} successfully added to Cart`);
//     }
//   }

 
//   function removeFromCart(id) {
//     const newCart = cart.filter((item) => item.id !== id);
//     Carts(newCart, "🗑️ Removed from cart");
//   }

 
//   function updateQuantity(id, amount) {
//     const item = cart.find((i) => i.id === id);
//     if (!item) return;

//     const updatedItem = { ...item, quantity: item.quantity + amount };
//     if (updatedItem.quantity < 1) {
//       removeFromCart(id);
//       return;
//     }

//     const newCart = cart.map((i) => (i.id === id ? updatedItem : i));
//     Carts(newCart, "🔄 Quantity updated");
//   }

  
//   function clearCart() {
//     Carts([]);
//   }

//   return (
//     <cartContext.Provider
//       value={{ cart, setCart, addToCart, removeFromCart, updateQuantity, clearCart }} >

//       {children}
      
//     </cartContext.Provider>
//   );
// }

// export default CartProvider;



import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const cartContext = createContext();



function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Helper: get auth header (JWT)
  const getAuthHeaders = () => {
    const token = localStorage.getItem("access"); // ⬅️ adjust key if needed
    return token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};
  };

  // Load cart from backend
  const loadCart = async () => {
    try {
      const token = localStorage.getItem("access");

      // 🔹 If no token → user not logged in → skip API, empty cart
      if (!token) {
        setCart([]);
        setTotal(0);
        return;
      }

      const res = await axios.get("http://127.0.0.1:8000/cart/cart_list/", {
        headers: getAuthHeaders(),
      });

      setCart(res.data.items || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      // If unauthorized, just clear cart quietly
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

  // Add item to cart (or increase quantity if already exists)
 const addToCart = async (product) => {
  // ✅ 1. Check if product already in cart
  const exists = cart.some((item) => item.product.id === product.id);

  if (exists) {
    toast.info("🛒 This product is already in your cart");
    return; // ⬅️ stop here, don't call backend
  }

  // ✅ 2. Only first time we actually call API
  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/cart/cart_add/",
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

  // Update quantity by +1 / -1
  const updateQuantity = async (productId, amount) => {
    const item = cart.find((i) => i.product.id === productId);
    if (!item) return;

    const newQuantity = item.quantity + amount;

    if (newQuantity <= 0) {
      // If quantity goes to 0 or below → remove
      return removeFromCart(productId);
    }

    try {
      await axios.patch('http://127.0.0.1:8000/cart/cart_update/',
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

  // Remove single item
  const removeFromCart = async (productId) => {
    try {
      // using query param, easier with axios.delete
      await axios.delete( `http://127.0.0.1:8000/cart/cart_remove/?product_id=${productId}`,
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

  // Clear entire cart (loop delete since backend is per-product)
  const clearCart = async () => {
    try {
      await Promise.all(
        cart.map((item) =>
          axios.delete(
            `http://127.0.0.1:8000/cart/cart_remove/?product_id=${item.product.id}`,
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
