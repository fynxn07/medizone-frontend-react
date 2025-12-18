import React from 'react'

function Navbox() {
   const features = [
    {
      icon: "📦",
      title: "Fast delivery",
      desc: "Often within 24 hours",
    },
    {
      icon: "🧴",
      title: "12,000+ products",
      desc: "Over 100,000 products",
    },
    {
      icon: "💲",
      title: "Customer discounts",
      desc: "From 19Rs or with prescription",
    },
    {
      icon: "📜",
      title: "Certified",
      desc: "Within 1-4 business days",
    },
  ];


  return (
    <div className="w-full bg-black text-xs ">
    <div className="bg-gray-600 py-6 w-full max-w-4xl mx-auto">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
    {features.map((item, index) => (
      <div
        key={index}
        className="flex items-start gap-3 text-white"
      >
        <div className="text-3xl">{item.icon}</div>
        <div>
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-sm text-white">{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
</div>
</div>
  );
}

export default Navbox