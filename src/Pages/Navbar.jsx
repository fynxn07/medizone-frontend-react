import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import Logout from "./Logout";

function Navbar({ search, setSearch }) {
  const navigate = useNavigate();

  const handleSearch = (value) => {
    if (setSearch) setSearch(value);
    navigate("/products");  // always search inside Products page
  };

  return (
    <>
      <nav className="bg-black px-6 py-3 flex items-center justify-between pb-2 sticky top-0 z-[999] w-full">
        
        {/* Logo */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/logos.png"
            alt="Logo"
            className="h-12 w-25 object-cover rounded-lg"
          />
          <span className="text-red-400 font-semibold text-xl">MediZone</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex space-x-6 ml-10">
          <Link to="/" className="text-white hover:text-white transition">Home</Link>
          <Link to="/products" className="text-white hover:text-white transition">Products</Link>
          <Link to="/profile" className="text-white hover:text-white transition">Profile</Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-6 max-w-md hidden md:block">
          <div className="relative">
            <input
              type="text"
              value={search || ""}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && navigate("/products")}
              placeholder="Search medical equipment..."
              className="w-full pl-4 pr-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-5">
          <button
            onClick={() => navigate("/wishlist")}
            className="text-gray-300 hover:text-red-400 transition"
          >
            <Heart className="h-6 w-6" />
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="text-gray-300 hover:text-green-400 transition"
          >
            <ShoppingCart className="h-6 w-6" />
          </button>

          <Logout />
        </div>

      </nav>

      {/* Spacer to stop overlapping EVERYWHERE */}
      <div className="h-[80px] md:h-[88px]"></div>
    </>
  );
}

export default Navbar;
