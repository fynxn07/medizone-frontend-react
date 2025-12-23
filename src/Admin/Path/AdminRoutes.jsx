import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from '../Pages/Dashboard'
import AdminLayout from '../Components/AdminLayout'
import UserManagement from '../Pages/UserManagement'
import OrderManagement from '../Pages/OrderManagement'
import ProductManagement from '../Pages/ProductManagement'



function AdminRoutes() {
let admin = localStorage.getItem('admin')
// console.log(id)

if(admin){
return (
    <>
    <Routes>
        <Route path="/" element={<AdminLayout> <Dashboard/> </AdminLayout>}/>
        <Route path="/users" element={<AdminLayout> <UserManagement/> </AdminLayout>}/>
        <Route path="/products" element={<AdminLayout> <ProductManagement/> </AdminLayout>}/>
        <Route path="/orders" element={<AdminLayout> <OrderManagement/> </AdminLayout>}/>

    </Routes>
    
    </>
  )
}
else{
return <Navigate to={'/'} />
}
  
}

export default AdminRoutes


