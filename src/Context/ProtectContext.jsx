// import { createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";

// // export context
// export const authContext = createContext();

// function ProtectProvider({ children }) {
//       const navigate = useNavigate();
  
//   const [user,setCurrentUser] = useState(null)
//   const [auth, setAuth] = useState({
//     isAuthenticated: false,
//     role: null,
//   });

//       function removeLogout() {
//         localStorage.removeItem("userId");
//         localStorage.removeItem("isLoggedIn");
//         setCurrentUser(null)
//         localStorage.clear()
//         navigate("/login");
//     }

//   const login = (role) => {
//     setAuth({
//       isAuthenticated: true,
//       role: role,
//     });
//   };

  
//   const logout = () => {
//     setAuth({
//       isAuthenticated: false,
//       role: null,
//     });
//   };

//   return (
//     <authContext.Provider value={{ auth, login, logout,removeLogout,user }}>
//       {children}
//     </authContext.Provider>
//   );
// }

// export default ProtectProvider;


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

  // called on successful login (you can extend this)
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

  // 👇 this is what your <Logout /> component calls
  const removeLogout = async () => {
    const access = localStorage.getItem("access");

    try {
      await axios.post(
        "http://127.0.0.1:8000/medicals/auth/logout/",
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
    setWishlist([]) // still clear cart in any case
  }

    // Clear frontend auth data
    localStorage.removeItem("access");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");

    logout(); // reset auth + user state

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
