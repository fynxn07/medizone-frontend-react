import React, { useEffect, useState } from 'react'
import { deleteProduct, getProducts } from '../Services/AdminApi'
import DeleteModal from '../Components/DeleteModal';
import EditModal from '../Components/EditModal';
import AddModal from '../Components/AddModal';
import { updateProduct } from '../Services/AdminApi';

function ProductManagement() {
  const [products, setProducts] = useState([])
  const [productDelete, productSetDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false)
  const [productEdit, setProductEdit] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts()
        console.log("Fetched products:", data);
        setProducts(data)
      }
      catch (err) {
        console.error("Error fetching products:", err);
      }
    }
    fetchData()
  }, [])

  const Delete = (id) => {
    productSetDelete(id);
    setShowDeleteModal(true);
  };

  const Edit = (id) => {
    const product = products.find((p) => p.id === id)
    setProductEdit(product)
    setShowEditModal(true)
  }

  const confirmDelete = async () => {
    try {
      await deleteProduct(productDelete);
      setProducts((prev) => prev.filter((p) => p.id !== productDelete));
      setShowDeleteModal(false);
      productSetDelete(null);
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product Listing</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ Add Product
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/3 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <table className="min-w-full border border-gray-300 bg-white">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products
            .filter((p) =>
              p.name.toLowerCase().includes(search.toLowerCase()) ||
              p.category.toLowerCase().includes(search.toLowerCase())
            )
          .map((p) => (
              <tr key={p.id} className="text-center">
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">{p.category}</td>
                <td className="border p-2">₹{p.price}</td>
                <td className="border p-2">{p.stock}</td>
                <td className="border p-2 flex justify-center gap-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => Edit(p.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => Delete(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {showAddModal && (
        <AddModal
          setShowAddModal={setShowAddModal}
          products={products}
          setProducts={setProducts}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          confirmDelete={confirmDelete}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}

      {showEditModal && productEdit && (
        <EditModal
          productEdit={productEdit}
          setShowEditModal={setShowEditModal}
          products={products}
          setProducts={setProducts}
          updateProduct={updateProduct}
        />
      )}
    </div>
  );
}

export default ProductManagement;
