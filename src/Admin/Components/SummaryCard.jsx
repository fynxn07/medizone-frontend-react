import { useEffect, useState } from "react";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import { getDashboardData } from "../Services/AdminApi";

function SummaryCard() {
  const [counts, setCounts] = useState({
    users: 0,
    products: 0,
    orders: 0,
    income: 0,
  });

  useEffect(() => {
    let mounted = true;

    const fetchSummary = async () => {
      try {
        const data = await getDashboardData();

        if (!mounted) return;

        setCounts({
          users: data?.summary?.users ?? 0,
          products: data?.summary?.products ?? 0,
          orders: data?.summary?.orders ?? 0,
          income: data?.summary?.income ?? 0,
        });
      } catch (err) {
        console.error("SummaryCard fetch error:", err);
      }
    };

    fetchSummary();

    return () => {
      mounted = false;
    };
  }, []);

  const cards = [
    { title: "Users", count: counts.users, icon: <Users size={28} />, color: "bg-blue-100 text-blue-600" },
    { title: "Products", count: counts.products, icon: <Package size={28} />, color: "bg-green-100 text-green-600" },
    { title: "Orders", count: counts.orders, icon: <ShoppingCart size={28} />, color: "bg-indigo-100 text-indigo-600" },
    { title: "Income", count: `₹${counts.income}`, icon: <DollarSign size={28} />, color: "bg-yellow-100 text-yellow-600" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, id) => (
        <div
          key={id}
          className="bg-white rounded-lg shadow hover:shadow-lg transition p-5 flex items-center justify-between"
        >
          <div>
            <p className="text-sm text-gray-400">{card.title}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{card.count}</p>
          </div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${card.color}`}>
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SummaryCard;