import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {LayoutDashboard, Users, Package, ShoppingCart,LogOut} from "lucide-react";

function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={18} /> },
    { name: "Manage Users", path: "/admin/users", icon: <Users size={18} /> },
    { name: "Manage Products", path: "/admin/products", icon: <Package size={18} /> },
    { name: "Manage Orders", path: "/admin/orders", icon: <ShoppingCart size={18} /> },
  ];

  const Logout = () => {
    
    localStorage.clear(); 
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen shadow-lg fixed top-0 left-0">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>
      <ul className="mt-4 space-y-1">
        {menuItems.map((item, idx) => (
          <li key={idx}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 transition-colors duration-200 ${
                location.pathname === item.path
                  ? "bg-gray-700 text-blue-400"
                  : "hover:bg-gray-800 hover:text-blue-300"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>


       <div className="p-4 border-t border-gray-700">
        <button
          onClick={Logout}
          className="flex items-center gap-3 w-full px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition-colors"
        >
          <LogOut size={15} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
