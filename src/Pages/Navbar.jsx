import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Menu, X } from "lucide-react";
import Logout from "./Logout";

function Navbar({ search, setSearch }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSearch = (value) => {
    if (setSearch) setSearch(value);
    navigate("/products");
  };

  return (
    <nav className="bg-black px-6 py-3 flex items-center justify-between">
      
      {/* Logo */}
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/logos.png" alt="Logo" className="h-10 w-auto rounded-lg" />
        <span className="text-red-400 font-semibold text-xl">MediZone</span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-6 ml-10">
        <Link to="/" className="text-white">Home</Link>
        <Link to="/products" className="text-white">Products</Link>
        <Link to="/profile" className="text-white">Profile</Link>
      </div>

      {/* Desktop Search */}
      <div className="hidden md:block flex-1 mx-6 max-w-md">
        <input
          type="text"
          value={search || ""}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && navigate("/products")}
          placeholder="Search medical equipment..."
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-gray-500 outline-none"
        />
      </div>

      {/* Right Icons */}
      <div className="hidden md:flex items-center space-x-5">
        <button onClick={() => navigate("/wishlist")} className="text-gray-300 hover:text-red-400">
          <Heart className="h-6 w-6" />
        </button>

        <button onClick={() => navigate("/cart")} className="text-gray-300 hover:text-green-400">
          <ShoppingCart className="h-6 w-6" />
        </button>

        <Logout />
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
        {open ? <X size={30} /> : <Menu size={30} />}
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-black border-t border-gray-700 p-6 space-y-4 md:hidden">

          <input
            type="text"
            value={search || ""}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && navigate("/products")}
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
          />

          <Link onClick={() => setOpen(false)} to="/" className="block text-white">Home</Link>
          <Link onClick={() => setOpen(false)} to="/products" className="block text-white">Products</Link>
          <Link onClick={() => setOpen(false)} to="/profile" className="block text-white">Profile</Link>

          <div className="flex items-center gap-4">
            <Heart
              className="text-red-400"
              onClick={() => navigate("/wishlist")}
            />
            <ShoppingCart
              className="text-green-400"
              onClick={() => navigate("/cart")}
            />
            <Logout />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
