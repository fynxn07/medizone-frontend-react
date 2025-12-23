import React from 'react'
import { Link } from 'react-router-dom';

function Categories() {
  const categories = [
    {
      name: "Surgical",
      img: "https://i.pinimg.com/1200x/36/b9/b6/36b9b6b9f82b4a9dc290f40c25dccebe.jpg",
      path: "/products/surgical"
    },
    {
      name: "Diagnostics",
      img: "https://i.pinimg.com/1200x/f3/cd/a2/f3cda213e0976ce26116fd75f8636b26.jpg",
      path: "/products/Diagnostics"
    },
    {
      name: "Personal Care",
      img: "https://i.pinimg.com/736x/b2/05/23/b2052333f515539b8a67c178ab39d53b.jpg",
      path: "/products/personalcare"
    },
    {
      name: "Pharmacy",
      img: "https://i.pinimg.com/1200x/0b/b8/a7/0bb8a7c6bd1693e9c4cc572a04688a61.jpg",
      path: "/products/pharmacy"
    },
    {
      name: "Therapy & Emergency",
      img: "https://i.pinimg.com/736x/55/f0/81/55f0815a36f2172a4a3fb50d72af1083.jpg",
      path: "/products/therapy"
    },
    {
      name: "Equipment / Furniture",
      img: "https://i.pinimg.com/736x/31/c3/df/31c3df3a333e2bada5e06aea738e7ab3.jpg",
      path: "/products/equipments"
    }
  ]
  return (
    <div className="bg-black py-20">
      <h2 className="text-2xl font-bold text-center text-white mb-15"> Shop by Categories </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {categories.map((product, index) => (
          <Link
            to={product.path}
            key={index}
            className="bg-amber-50 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-black">{product.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}



export default Categories