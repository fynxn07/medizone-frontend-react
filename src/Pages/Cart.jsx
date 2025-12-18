import React, { useContext } from 'react'
import { cartContext } from '../Context/cartContext';
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar';

function Cart() {
  const navigate = useNavigate()
  const { cart,total, removeFromCart, updateQuantity, clearCart } = useContext(cartContext);

  return (
     <div className="bg-black min-h-screen flex flex-col text-white">
      <Navbar />
     
    <div className="p-6 flex-1 font-bold text-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-100">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-400">Your cart is empty</p>
      ) : (
        <div>
          {cart.map(function (item) {
            return (
              <div key={item.product.id} className="flex items-center justify-between border-b border-gray-700 py-2">
                <div>
                  <h3 className="font-semibold text-gray-100">{item.product.name}</h3>
                  <p className="text-sm text-gray-400 w-24">₹{item.product.price}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={function () { updateQuantity(item.product.id, -1); }} className="px-2 py-1 bg-gray-800 text-gray-200 rounded hover:bg-gray-700">-</button>
                  <span className="text-gray-100">{item.quantity}</span>
                  <button onClick={function () { updateQuantity(item.product.id, +1); }} className="px-2 py-1 bg-gray-800 text-gray-200 rounded hover:bg-gray-700">+</button>
                  <button onClick={function () { removeFromCart(item.product.id); }} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Remove</button>
                </div>
              </div>
              
            );
          })}

          

          <div className="mt-4 font-bold text-gray-100">
              Total: ₹{total}
          </div>

         
          <button onClick={function () { clearCart(); }} className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Clear Cart
          </button>
          <button onClick={ ()=> { navigate("/checkout"); }}
            className="mt-4 ml-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
    </div>
  )
}

export default Cart
