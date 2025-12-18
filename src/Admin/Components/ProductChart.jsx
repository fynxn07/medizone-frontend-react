import React, { useEffect, useState } from "react";
import { getDashboardData } from "../Services/AdminApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function ProductSalesChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { orders } = await getDashboardData();

        const salesMap = {};

        orders.forEach((order) => {
          order.items?.forEach((item) => {
            const productName = item.name || `Product ${item.productId}`;
            const Income = (item.price || 0) * (item.quantity || 0);

            if (!salesMap[productName]) {
              salesMap[productName] = { name: productName, Income: 0, Profit: 0 };
            }

            salesMap[productName].Income += Income;
            salesMap[productName].Profit += Income * 0.5; 
          });
        });

        let salesData = Object.values(salesMap);

        
        salesData = salesData.sort((a, b) => b.Income - a.Income).slice(0, 4);

        setData(salesData);
      } catch (err) {
        console.error("Error fetching product sales:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow w-full">
      <h2 className="font-bold text-lg mb-4">Top Products Sales</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          barCategoryGap="25%"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          
          <YAxis
            tickFormatter={(value) => `₹${value.toLocaleString("en-IN")}`}
          />
          
          <Tooltip
            formatter={(value, name) => [
              `₹${value.toLocaleString("en-IN")}`,
              name,
            ]}
          />
          <Legend />

         
          <Bar dataKey="Profit" fill="#8884d8" name="Profit" />

          <Bar dataKey="Income" fill="#82ca9d" name="Income" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProductSalesChart;
