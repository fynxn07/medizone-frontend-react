


import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Products from "../Pages/Products";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import Cart from "../Pages/Cart";
import Wishlist from "../Pages/Wishlist";
import Checkout from "../Pages/Checkout";
import Payment from "../Pages/Payment";
import ViewProducts from "../Pages/ViewProducts";
import AdminRoutes from "../Admin/Path/AdminRoutes.jsx";
import Orders from "../Pages/Orders.jsx";
import ForgotPassword from "../Pages/ForgotPassword.jsx";
import ResetPassword from "../Pages/ResetPassword.jsx";
import OrderSuccess from "../Pages/OrderSuccess.jsx";
import ProtectedRoute from "./ProtectedRoute";


function Routing() {
  const isAuthenticated = !!localStorage.getItem("access");

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:category" element={<Products />} />
      <Route path="/product/:id" element={<ViewProducts />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />

      {/* Protected User Routes */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-success"
        element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminRoutes />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Routing;
