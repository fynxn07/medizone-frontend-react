import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getDashboardData } from "../Services/AdminApi";

const COLORS = ["#82ca9d", "#8884d8", "#ff7300", "#ff4d4f"];

function OrderStatus() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { orders } = await getDashboardData();


        const statusCount = {
          Delivered: 0,
          Pending: 0,
          Cancelled: 0,
          Shipped: 0,
        };

        orders.forEach((order) => {
          const status = order.status || "Pending"; // fallback
          if (statusCount[status] !== undefined) {
            statusCount[status] += 1;
          }
        });

        const chartData = Object.keys(statusCount).map((key) => ({
          name: key,
          value: statusCount[key],
        }));

        setData(chartData);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow w-full">
      <h2 className="font-bold text-lg mb-4">Order Status Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}`}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(val) => `${val} orders`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OrderStatus;
