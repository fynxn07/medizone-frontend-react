import React, { useEffect, useState } from 'react'
import { getOrders, updatedOrder } from '../Services/AdminApi'

function OrderManagement() {
  let [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOrders()
        
        setOrders(data)
      }
      catch (err) {
        console.log("Error Fetching Orders:", err)
      }
    }
    fetchData()
  }, [])


  const pendingCount = orders.filter( order => order.status?.toLowerCase() === "pending").length;
  const shippedCount = orders.filter(order => order.status === "Shipped").length;
  const deliveredCount = orders.filter(order => order.status === "Delivered").length;
  const cancelledCount = orders.filter(order => order.status === "Cancelled").length;



  const StatusChange = async (userId, orderId, newStatus) => {
    try {
      await updatedOrder(userId, orderId, newStatus);


      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId && order.userId === userId
            ? { ...order, status: newStatus }
            : order
        )
      );
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };



  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">Order Management</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-yellow-100 border border-yellow-300 p-4 rounded text-center">
          <h3 className="text-sm font-semibold text-yellow-700">Pending</h3>
          <p className="text-xl font-bold text-yellow-800">{pendingCount}</p>
        </div>
        <div className="bg-blue-100 border border-blue-300 p-4 rounded text-center">
          <h3 className="text-sm font-semibold text-blue-700">Shipped</h3>
          <p className="text-xl font-bold text-blue-800">{shippedCount}</p>
        </div>
        <div className="bg-green-100 border border-green-300 p-4 rounded text-center">
          <h3 className="text-sm font-semibold text-green-700">Delivered</h3>
          <p className="text-xl font-bold text-green-800">{deliveredCount}</p>
        </div>
        <div className="bg-red-100 border border-red-300 p-4 rounded text-center">
          <h3 className="text-sm font-semibold text-red-700">Cancelled</h3>
          <p className="text-xl font-bold text-red-800">{cancelledCount}</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-sm">No orders found</p>
      ) : (





        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-3 py-2 text-center">Order ID</th>
                <th className="border px-3 py-2 text-center">Date</th>
                <th className="border px-3 py-2 text-center w-96">Products</th>
                <th className="border px-3 py-2 text-center">Shipping Info</th>
                <th className="border px-3 py-2 text-center">Total</th>
                <th className="border px-3 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.reverse().map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{order.id || index + 1}</td>
                  <td className="border px-3 py-2">{order.orderDate || "N/A"}</td>
                  <td className="border px-3 py-2">
                    {order.items?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between border-b last:border-b-0 py-1"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <span className="truncate max-w-[180px]">{item.name}</span>
                        </div>
                        <span className="ml-4 font-medium">₹{item.price}</span>
                      </div>
                    ))}
                  </td>
                  <td className="border px-3 py-2 text-center align-middle">
                    <div className="flex flex-col items-center text-gray-700 text-sm">

                      <div>{order.shippingInfo?.fullName}</div>
                      <div>{order.shippingInfo?.address}</div>
                      <div>{order.shippingInfo?.pincode}</div>
                    </div>
                  </td>
                  <td className="border px-3 py-2 font-semibold">₹{order.totalAmount}</td>
                  <td className="border px-3 py-2">
                    <select
                      value={order.status || "Pending"}
                      onChange={(e) => StatusChange(order.userId, order.id, e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      disabled={order.status === "Cancelled"}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default OrderManagement