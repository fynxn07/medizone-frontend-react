import React, { useState } from "react";
import { toast } from "react-toastify";
import { addProduct } from "../Services/AdminApi";

function AddModal({ setProducts, setShowAddModal }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const Save = async () => {
    try {
      if (!formData.image) return toast.error("Please select an image");

      const data = new FormData();
      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("description", formData.description);
      data.append("image", formData.image); 

      const savedProduct = await addProduct(data);

      setProducts((prev) => [...prev, savedProduct]);

      toast.success("Product added successfully 🎉");
      setShowAddModal(false);
    } catch (error) {
      console.error(error.response?.data || error);
      toast.error("Failed to add product ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-3xl shadow-2xl w-[420px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h2 className="text-2xl font-bold text-gray-800">Add Product</h2>
          <button
            onClick={() => setShowAddModal(false)}
            className="text-gray-400 hover:text-red-500 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-sm font-semibold text-gray-700">
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-xl w-full mt-1"
            />
          </label>

          <label className="text-sm font-semibold text-gray-700">
            Category
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-xl w-full mt-1"
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="text-sm font-semibold text-gray-700">
              Price
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-xl w-full mt-1"
              />
            </label>

            <label className="text-sm font-semibold text-gray-700">
              Stock
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-xl w-full mt-1"
              />
            </label>
          </div>

          <label className="text-sm font-semibold text-gray-700">
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="border border-gray-300 p-3 rounded-xl w-full mt-1 resize-none"
            />
          </label>

          <label className="text-sm font-semibold text-gray-700">
            Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="border border-gray-300 p-3 rounded-xl w-full mt-1"
            />
          </label>

          {preview && (
            <div className="mt-4 flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-36 h-36 object-cover rounded-xl border shadow-lg"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => setShowAddModal(false)}
            className="px-5 py-2 rounded-xl border border-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={Save}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
