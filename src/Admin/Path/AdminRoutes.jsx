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


// import { useEffect, useState } from "react";
// import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import Dashboard from "../Pages/Dashboard";
// import AdminLayout from "../Components/AdminLayout";
// import UserManagement from "../Pages/UserManagement";
// import OrderManagement from "../Pages/OrderManagement";
// import ProductManagement from "../Pages/ProductManagement";
// import axios from "../Services/AxioxInstance"; 

// function AdminRoutes() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     const checkAdmin = async () => {
//       try {
//         await axios.get("/admin_dashboard/dashboard");
//         setIsAdmin(true);
//       } catch {
//         setIsAdmin(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAdmin();
//   }, []);

//   // 🔒 BLOCK EVERYTHING until check finishes
//   if (loading) {
//     return null; // or spinner
//   }

//   // 🔒 NOT ADMIN → EXIT IMMEDIATELY
//   if (!isAdmin) {
//     return <Navigate to="/" replace />;
//   }

//   // ✅ ADMIN ONLY REACHES HERE
//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={
//           <AdminLayout>
//             <Dashboard />
//           </AdminLayout>
//         }
//       />
//       <Route
//         path="/users"
//         element={
//           <AdminLayout>
//             <UserManagement />
//           </AdminLayout>
//         }
//       />
//       <Route
//         path="/products"
//         element={
//           <AdminLayout>
//             <ProductManagement />
//           </AdminLayout>
//         }
//       />
//       <Route
//         path="/orders"
//         element={
//           <AdminLayout>
//             <OrderManagement />
//           </AdminLayout>
//         }
//       />
//     </Routes>
//   );
// }

// export default AdminRoutes;