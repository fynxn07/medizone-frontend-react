import React from "react";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="text-center">
        
        <div className="mx-auto mb-6 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-green-600 flex items-center justify-center animate-pulse shadow-[0_0_30px_#22c55e]">
            <svg
              width="48"
              height="48"
              viewBox="0 0 52 52"
              className="block"
            >
              <path
                d="M14 27 L22 35 L38 19"
                fill="none"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl text-white font-bold mb-3">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-400 mb-8">
          Thank you! Your order has been confirmed.
        </p>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl text-white font-semibold transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;
