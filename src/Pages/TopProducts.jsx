import React, { useContext } from 'react'
import { productContext } from '../Context/productContext'
import { Link } from 'react-router-dom'



function TopProducts() {
  let {product}=useContext(productContext)

  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/150";
    if (img.startsWith("http")) return img;
    return `http://127.0.0.1:8000${img}`;
  };


  return (
     <div className="bg-black py-15">
      <h2 className="text-2xl font-bold text-center text-white mb-15"> Top Products </h2>

       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {product?.slice(0,8)
          .map((product) => (
          <div key={product.id}
            className="bg-amber-50 rounded-2xl shadow-md overflow-hidden hover:scale-105 transition-shadow duration-300">

              <Link to={`/product/${product.id}`}>
            <img
              src={getImageUrl(product.image)}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            </Link>

            <div className="p-4">
              <h3 className="font-semibold text-lg text-black">{product.name}</h3>
              <p className="text-gray-500 text-sm">{product.category}</p>
              <p className="text-green-600 font-bold mt-2">₹{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopProducts