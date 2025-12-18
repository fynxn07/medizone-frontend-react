import React from 'react'
import SummaryCard from '../Components/SummaryCard'
import ProductSalesChart from '../Components/ProductChart'
import OrderStatus from '../Components/OrderStatus'

function Dashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <SummaryCard />
     <div className="mt-8">
        <ProductSalesChart />
        <OrderStatus />
    </div>
    </div>
  )
}

export default Dashboard