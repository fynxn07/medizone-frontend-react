import { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "../Admin/Services/AxioxInstance";
import { authContext } from "./ProtectContext";

export const wishlistContext = createContext();

function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  
    

  const getAccess = () => localStorage.getItem("access");

  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/150";
    if (img.startsWith("http")) return img;
    return `https://medizone.duckdns.org${img}`;
  };

  const fetchWishlist = async () => {
    const access = getAccess();


    if (!access) {
      setWishlist([]);
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.get(
        "/wishlist/wishlist/",
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
      await axiosInstance.post(
        "/wishlist/wishlist_add/",
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
      await axiosInstance.delete(
        "/wishlist/wishlist_remove/",
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

