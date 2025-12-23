import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { cartContext } from "./cartContext";
import { wishlistContext } from "./wishlistContext";


export const authContext = createContext();

function ProtectProvider({ children }) {
  const navigate = useNavigate();

  const [user, setCurrentUser] = useState(null);
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: null,
  });
  const {setCart}=useContext(cartContext)
  const {setWishlist}=useContext(wishlistContext)

 
  const login = (role, userData, accessToken) => {
    setAuth({
      isAuthenticated: true,
      role: role,
    });

    if (userData) {
      setCurrentUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    }
    if (accessToken) {
      localStorage.setItem("access", accessToken);
    }
    localStorage.setItem("isLoggedIn", "true");
    if (userData?.id) {
      localStorage.setItem("userId", userData.id);
    }
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      role: null,
    });
    setCurrentUser(null);
    
    
  };

 
  const removeLogout = async () => {
    const access = localStorage.getItem("access");

    try {
      await axios.post(
        "https://medizone.duckdns.org/medicals/auth/logout/",
        {},
        {
          headers: access ? { Authorization: `Bearer ${access}` } : {},
          withCredentials: true,
        }
      );
      setCart([])
      setWishlist([])
      setCurrentUser(null)

    } catch (err) {
     if (err.response && err.response.status === 401) {
      console.warn("Already logged out or token invalid, continuing logout.");
    } else {
      console.log("LOGOUT ERROR:", err.response?.data || err.message);
    }
    setCart([]);
    setWishlist([])
  }

  
    localStorage.removeItem("access");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");

    logout();
    navigate("/login");
  };

  return (
    <authContext.Provider
      value={{ auth, login, logout, removeLogout, user }}
    >
      {children}
    </authContext.Provider>
  );
}

export default ProtectProvider;
