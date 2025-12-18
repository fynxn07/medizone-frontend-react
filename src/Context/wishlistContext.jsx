// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const wishlistContext = createContext();

// function WishlistProvider({ children }) {
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(true);


//   const userId = localStorage.getItem("access");

//     const getImageUrl = (img) => {
//     if (!img) return "https://via.placeholder.com/150";
//     if (img.startsWith("http")) return img;
//     return `http://127.0.0.1:8000${img}`;
//   };


//   const userUrl = userId ? `http://localhost:3000/user/${userId}` : null;

  
//   const fetchWishlist = async () => {
//     if (!access) {
//       setWishlist([]);
//       setLoading(false);
//       return;
//     }

//     try {
     
//       const res = await axios.get('http://127.0.0.1:8000/wishlist/wishlist/');
//       setWishlist(res.data.wishlist || []);
//       setLoading(false);
//     } catch (err) {
//       console.log("Error fetching wishlist:", err);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchWishlist();
//   }, [userUrl]);

//   const addToWishlist = async (item) => {
   
//     if (!wishlist.find((w) => w.id === item.id)) {
//       try {
//         const newWishlist = [...wishlist, item];
//         setWishlist(newWishlist);

        
//         if (userUrl) {
//           await axios.patch(userUrl, { wishlist: newWishlist });
//         }
//       } catch (err) {
//         console.log("Error adding to wishlist:", err);
//       }
//     }
//   };

  
//   const removeFromWishlist = async (id) => {
//     try {
//       const newWishlist = wishlist.filter((item) => item.id !== id);
//       setWishlist(newWishlist);

      
//       if (userUrl) {
//         await axios.patch(userUrl, { wishlist: newWishlist });
//       }
//     } catch (err) {
//       console.log("Error removing from wishlist:", err);
//     }
//   };

//   return (
//     <wishlistContext.Provider
//       value={{ wishlist, loading, setWishlist, addToWishlist, removeFromWishlist }}>
//       {children}
//     </wishlistContext.Provider>
//   );
// }

// export default WishlistProvider;


import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { authContext } from "./ProtectContext";

export const wishlistContext = createContext();

function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  
    // const {}=useContext(authContext)

  const getAccess = () => localStorage.getItem("access");

  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/150";
    if (img.startsWith("http")) return img;
    return `http://127.0.0.1:8000${img}`;
  };

  const fetchWishlist = async () => {
    const access = getAccess();


    if (!access) {
      setWishlist([]);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/wishlist/wishlist/",
        {
          headers: { Authorization: `Bearer ${access}` },
          withCredentials: true,
        }
      );

      const items = (res.data || []).map((w) => ({
        ...w.product,
        image: getImageUrl(w.product?.image),
      }));

      setWishlist(items);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching wishlist:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const addToWishlist = async (product) => {
    const access = getAccess();
    if (!access) {
      console.log("Not logged in -> cannot add to wishlist");
      return;
    }

    if (wishlist.find((w) => w.id === product.id)) return;

    try {
      await axios.post(
        "http://127.0.0.1:8000/wishlist/wishlist_add/",
        { product_id: product.id },
        {
          headers: { Authorization: `Bearer ${access}` },
          withCredentials: true,
        }
      );

      setWishlist((prev) => [
        ...prev,
        { ...product, image: getImageUrl(product.image) },
      ]);
    } catch (err) {
      console.log("Error adding to wishlist:", err);
    }
  };

  const removeFromWishlist = async (id) => {
    const access = getAccess();
    if (!access) {
      console.log("Not logged in -> cannot remove from wishlist");
      return;
    }

    try {
      await axios.delete(
        "http://127.0.0.1:8000/wishlist/wishlist_remove/",
        {
          params: { product_id: id },
          headers: { Authorization: `Bearer ${access}` },
          withCredentials: true,
        }
      );

      setWishlist((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log("Error removing from wishlist:", err);
    }
  };

  return (
    <wishlistContext.Provider
      value={{ wishlist, loading,fetchWishlist, setWishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </wishlistContext.Provider>
  );
}

export default WishlistProvider;

