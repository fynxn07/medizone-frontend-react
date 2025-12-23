import React, { useContext, useEffect } from 'react'
import { wishlistContext } from '../Context/wishlistContext';
import Navbar from './Navbar';


function Wishlist() {
 const { wishlist, removeFromWishlist ,fetchWishlist} = useContext(wishlistContext);

  useEffect(() => {
     fetchWishlist();
   }, []);


 
const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/150";
    if (img.startsWith("http")) return img;
    return `https://medizone.duckdns.org${img}`;
  };
 

  if (wishlist.length === 0) {
    return (
      <div>
        <Navbar/>
      
      <div className="bg-black min-h-screen flex items-center justify-center">
      
        
        <h2 className="text-white text-center text-xl">
          Your wishlist is empty ❤️
        </h2>
      </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar/>
   
      <div className="bg-black min-h-screen py-10">
      <h2 className="text-2xl font-bold text-center text-white mb-10">My Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow p-4 flex flex-col"
          >
            <img
              src={getImageUrl(item.image)}
              alt={item.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="font-semibold text-lg mt-3">{item.name}</h3>
            <p className="text-gray-500">{item.description}</p>
            <p className="text-green-600 font-bold mt-2">₹{item.price}</p>
            <button
              onClick={() => removeFromWishlist(item.id)}
              className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
     </div>
  )
}

export default Wishlist