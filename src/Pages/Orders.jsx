import React, { useEffect, useState } from "react";
import axiosInstance from "../Admin/Services/AxioxInstance";
import Navbar from "./Navbar";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("access");
        if (!token) {
          toast.error("Please login first");
          navigate("/login");
          return;
        }

        const res = await axiosInstance.get(
          "/orders/orders/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <Toaster position="top-right" />

      <div className="min-h-screen bg-black text-white p-6">
        <h2 className="text-2xl font-bold text-center mb-6">My Orders</h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : orders.length === 0 ? (
          <div className="text-center mt-10">
            <p className="text-lg mb-4">You have not placed any orders yet.</p>
            <button
              onClick={() => navigate("/products")}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
            >
              Go to Shop
            </button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-800 rounded-lg p-4 border border-gray-700"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">
                    Order #{order.id}
                  </h3>
                  
                  <span className="text-sm text-gray-400">
                    {order.orderDate}
                  </span>
                </div>

                <p className="text-sm text-gray-300">
                  <span className="font-semibold">Name:</span>{" "}
                  {order.shippingInfo?.fullName}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">Phone:</span>{" "}
                  {order.shippingInfo?.phone}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">Address:</span>{" "}
                  {order.shippingInfo?.address} - {order.shippingInfo?.pincode}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">Payment:</span>{" "}
                  {order.paymentMethod?.toUpperCase()}
                </p>
                <p className="text-sm text-gray-100 mt-2">
                  <span className="font-semibold">Total Amount:</span>{" "}
                  ₹{order.totalAmount}
                </p>
                <p className="text-sm text-gray-300 mt-1">
                  <span className="font-semibold">Status:</span>{" "}
                  {order.status}
                </p>

                {order.items && order.items.length > 0 && (
                  <div className="mt-3">
                    <h4 className="font-semibold mb-1">Items:</h4>
                    <ul className="space-y-1 text-sm">
                      {order.items.map((item, index) => (
                        <li
                          key={index}
                          className="grid grid-cols-3 items-center border-b border-gray-700 pb-1"
                        >
                         
                          <span className="truncate">
                            {item.product?.name || "Product"}
                          </span>

                          
                          <span className="text-center">
                            Qty: {item.quantity}
                          </span>

                          
                          <span className="text-right">
                            ₹{item.price}
                          </span>
                        </li>

                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
