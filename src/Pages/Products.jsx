import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { cartContext } from '../Context/cartContext'
import { Heart } from "lucide-react";
import { wishlistContext } from '../Context/wishlistContext';
import { toast } from "react-toastify";
import Navbar from './Navbar';

function Products() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState()
  const { category } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useContext(cartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(wishlistContext);
  const [Category, setCategory] = useState("All")
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/products/products/")
      .then(res => {
        const allProducts = res.data
        setProducts(allProducts)
      })
      .catch((err) => setError(err.message))
  }, [category])

  const filteredProducts =
    Category === "All" ? products
      : products.filter((p) => p.category === Category);

  const searchedProducts = filteredProducts.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/150";
    if (img.startsWith("http")) return img;
    return `http://127.0.0.1:8000${img}`;
  };

  return (
    <div>
      <Navbar search={search} setSearch={setSearch} />
      <div className="bg-black py-15">
        <h2 className="text-2xl font-bold text-center text-white mb-15"> Products </h2>

        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-15 max-w-4xl mx-auto">
          {["All","Diagnostics","Surgical","Personal Care","Pharmacy","Therapy & Emergency","Equipment / Furniture"]
            .map((selected) => (
              <button
                key={selected}
                onClick={() => setCategory(selected)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition text-center ${
                  Category === selected
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
                {selected}
              </button>
            ))}
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {searchedProducts.map((product) => {
           
            const isFavourite = wishlist.some((item) => item.id === product.id);

            return (
              <div
                key={product.id}
                className="bg-amber-50 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <div className="relative">
                  <Link to={`/product/${product.id}`}>
                    <img
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
                      className={`w-5 h-5 ${
                        isFavourite ? "fill-red-600 text-red-600" : "text-gray-500"
                      }`}
                    />
                  </button>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-lg text-black">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 flex-1">{product.description}</p>

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
      </div>
    </div>
  )
}

export default Products
