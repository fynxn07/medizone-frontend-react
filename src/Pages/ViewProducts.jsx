import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { wishlistContext } from '../Context/wishlistContext';
import { toast } from 'react-toastify';
import { cartContext } from '../Context/cartContext';
import Navbar from './Navbar';


function ViewProducts() {
  const { id } = useParams();
  const [product, setProduct] = useState(null)
  const { addToCart } = useContext(cartContext)
  const { addToWishlist } = useContext(wishlistContext)





  useEffect(() => {
    axios
      .get(`https://medizone.duckdns.org/products/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.log("Error fetching product:", err);
        toast.error("Failed to load product");
      });
  }, [id])


  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/300";
    if (img.startsWith("http")) return img;
    return `https://medizone.duckdns.org${img}`;
  };


  const getUser = () => {
    const stored = localStorage.getItem("user");
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  };

  console.log(product)

  return (
    <div>
      <Navbar/>
    

    <div className="min-h-screen bg-black text-white p-30">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

    
        <div className="flex justify-center">
          <img
            src={getImageUrl(product?.image)}
            alt={product?.name}
            className="w-72 h-72 object-cover rounded-2xl"
          />
        </div>

       
        <div>
          <h2 className="text-3xl font-bold mb-4">{product?.name}</h2>
          <p className="text-xl text-green-400 mb-2">₹ {product?.price}</p>
          <p className="text-gray-400 mb-6">{product?.description}</p>


          <div className="flex space-x-4">
            <button
              className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              onClick={() => {
                const userId = localStorage.getItem("user");
                if (!userId) {
                  toast.error(" Please login first to add to cart!");
                  return
                }
                  addToCart(product)
                }}>
              Add to Cart
            </button>
            <button
              className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
              onClick={() => {
                const user = getUser();
                  if (!user?.id) {
                    toast.error(" Please login first to add to cart!");
                  return
                }
                addToWishlist(product)
                toast.success(`${product.name} added to wishlist!`);
              }}>
              Add to Wishlist
            </button>
          </div>
        </div>

      </div>
    </div>
    </div>

  )
}

export default ViewProducts