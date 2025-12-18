
import axios from "./AxioxInstance";


export const getUsers = async () => {
    const res = await axios.get("/admin_Usermanage/admin_user");
    return res.data; 
};


export const blockUser = async (id, isBlock) => {
  const res = await axios.patch( `/admin_Usermanage/admin_user/${id}/block`, 
    { isBlock }
  );
  return res.data;
};






export const getOrders = async () => {
  try {
    const res = await axios.get('/admin_orders/admin_orders')
    return res.data

  } catch (err) {
    console.log(("getOrders error:", err))
    throw err
  }
}


export const updatedOrder = async (userId, orderId, newStatus) => {
  try {
    const res = await axios.patch(`/admin_orders/admin_order_update/${userId}/${orderId}/`,{status:newStatus})
    return res.data

  }catch (err) {
    console.log("UpdatedOrder  error",err)
    throw err
  }
}




export const getProducts = async () => {
  const res = await axios.get("/admin_products/admin_products/");
  return res.data;
};

export const addProduct = async (data) => {
  const res = await axios.post(
    "/admin_products/admin_products/",
    data,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await axios.patch(
    `/admin_products/admin_products/${id}/`,
    data,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`/admin_products/admin_products/${id}/`);
};


export const getDashboardData = async () => {
  const res = await axios.get("/admin_dashboard/dashboard");
  return res.data;
};