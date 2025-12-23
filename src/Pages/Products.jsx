import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cartContext } from '../Context/cartContext'
import { Heart } from "lucide-react";
import { wishlistContext } from '../Context/wishlistContext';
import { toast } from "react-toastify";
import Navbar from './Navbar';

function Products() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState()
  const navigate = useNavigate()
  const { addToCart } = useContext(cartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(wishlistContext);

  const [search, setSearch] = useState("")

  useEffect(() => {
    axios
      .get(`https://medizone.duckdns.org/products/products/?search=${search}`)
      .then(res => setProducts(res.data))
      .catch((err) => setError(err.message))
  }, [search])

  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/150";
    if (img.startsWith("http")) return img;
    return `https://medizone.duckdns.org${img}`;
  };

  return (
    <div>
      <Navbar search={search} setSearch={setSearch} />

      <div className="bg-black py-15">
        <h2 className="text-2xl font-bold text-center text-white mb-15"> Products </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => {
            const isFavourite = wishlist.some((item) => item.id === product.id);

            return (
              <div
                key={product.id}
                className="bg-amber-50 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <div className="relative">
                  <Link to={`/product/${product.id}`}>
                    <img
                      loading="lazy"
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                  </Link>

                  <button
                    onClick={() => {
                      if (isFavourite) {
                        removeFromWishlist(product.id);
                        toast.info(`${product.name} removed from wishlist!`);
                      } else {
                        addToWishlist(product);
                        toast.success(`${product.name} added to wishlist!`);
                      }
                    }}
                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-red-300"
                  >
                    <Heart
                      className={`w-5 h-5 ${isFavourite ? "fill-red-600 text-red-600" : "text-gray-500"}`}
                    />
                  </button>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-lg text-black">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 flex-2">{product.description}</p>

                  <div className="mt-auto flex items-center justify-between">
                    <p className="text-green-600 font-bold">₹{product.price}</p>

                    <button
                      onClick={() => addToCart(product)}
                      className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded hover:bg-green-700 transition-colors"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {products.length === 0 && (
          <p className="text-center text-gray-300 mt-10 text-lg">
            No products found
          </p>
        )}
      </div>
    </div>
  )
}

export default Products
