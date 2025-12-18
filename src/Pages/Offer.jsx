import React from 'react'

function Offer() {
    const offers=[
        {
            id:1,
            title:"25% Off Diagnostics",
            desc:"Get flat 20% off on all diagnostic kits this week.",
            color: "bg-yellow-200",
        },
        {
             id:2,
            title:"Buy 1 Get 1 Free",
            desc:"On selected Personal Care products. Limited time!.",
            color: "bg-red-200",
        },
        {
             id:3,
            title:"Flat ₹500 Off",
            desc:"On all Surgical Equipment orders above ₹5000.",
            color: "bg-green-200",
        }
    ]
  return (
     <div className="max-w-6xl bg-black mx-auto px-4 py-25">
      <h2 className="text-2xl font-bold text-white mb-6">🎯 Special Offers</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 py-10 gap-6">

        {offers.map((offer) => (
          <div key={offer.id}
            className={`${offer.color} rounded-xl p-6 shadow-md hover:shadow-xl transition`}
          >
            <h3 className="text-xl font-semibold text-black mb-2">{offer.title}</h3>
            <p className="text-gray-700">{offer.desc}</p>
          </div>
        ))}


      </div>
    </div>
  );
}

 

export default Offer