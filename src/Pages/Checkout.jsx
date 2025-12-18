import React, { useContext } from 'react'
import { cartContext } from '../Context/cartContext';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Checkout() {
  const { cart,total } = useContext(cartContext);
  const navigate = useNavigate();


  return (
    <div>
      <Navbar />

      <div className="p-6 min-h-screen bg-black text-white text-center">
        <h2 className="text-3xl font-bold mb-8 tracking-wide">Order Summary</h2>

        <div className="max-w-2xl mx-auto mb-6 bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg">
          {cart.length === 0 ? (
            <p className="text-gray-400">Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 border-b border-gray-700 last:border-none"
                >
                  <p className="font-semibold text-left text-lg">{item.product.name}</p>
                  <p className="text-gray-300">₹{item.product.price} × {item.quantity}</p>
                </div>
              ))}

              <div className="mt-6 pt-4 border-t border-gray-600 text-center">
                <p className="text-xl font-bold text-green-400">Total: ₹{total}</p>
              </div>
            </>
          )}
        </div>

        <button
          onClick={() => navigate("/payment")}
          className="mt-6 px-8 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default Checkout;
