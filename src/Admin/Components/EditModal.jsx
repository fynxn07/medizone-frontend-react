import React, { useState } from 'react';
import { updateProduct } from '../Services/AdminApi';
import { toast } from 'react-toastify';

function EditModal({ productEdit, setShowEditModal, products, setProducts }) {
    const [editData, setEditData] = useState({
        name: productEdit.name,
        category: productEdit.category,
        price: productEdit.price,
        stock: productEdit.stock,
        description: productEdit.description,
        image: productEdit.image,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    const Save = async () => {
        try {
            await updateProduct(productEdit.id, editData);

            const updatedProducts = products.map(p =>
                p.id === productEdit.id ? { ...p, ...editData } : p
            );
            setProducts(updatedProducts);

            toast.success("Product updated successfully 🎉");
            setShowEditModal(false);
        } catch (err) {
            toast.error("Failed to update product ❌");
            console.error(err);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <div className="bg-white p-6 rounded-2xl shadow-2xl w-[450px] max-h-[90vh] overflow-y-auto">
                
                
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h2 className="text-xl font-semibold text-gray-800">Edit Product</h2>
                    <button
                        onClick={() => setShowEditModal(false)}
                        className="text-gray-500 hover:text-red-500 text-xl font-bold"
                    >
                        ×
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    <label className="text-sm font-medium text-gray-700">
                        Name
                        <input
                            type="text"
                            name="name"
                            value={editData.name}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-lg w-full mt-1 focus:ring focus:ring-blue-300"
                        />
                    </label>

                    <label className="text-sm font-medium text-gray-700">
                        Category
                        <input
                            type="text"
                            name="category"
                            value={editData.category}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-lg w-full mt-1 focus:ring focus:ring-blue-300"
                        />
                    </label>

                    <div className="grid grid-cols-2 gap-4">
                        <label className="text-sm font-medium text-gray-700">
                            Price
                            <input
                                type="number"
                                name="price"
                                value={editData.price}
                                onChange={handleChange}
                                className="border border-gray-300 p-2 rounded-lg w-full mt-1 focus:ring focus:ring-blue-300"
                            />
                        </label>

                        <label className="text-sm font-medium text-gray-700">
                            Stock
                            <input
                                type="number"
                                name="stock"
                                value={editData.stock}
                                onChange={handleChange}
                                className="border border-gray-300 p-2 rounded-lg w-full mt-1 focus:ring focus:ring-blue-300"
                            />
                        </label>
                    </div>

                    <label className="text-sm font-medium text-gray-700">
                        Description
                        <textarea
                            name="description"
                            value={editData.description}
                            onChange={handleChange}
                            rows={3}
                            className="border border-gray-300 p-2 rounded-lg w-full mt-1 resize-none focus:ring focus:ring-blue-300"
                        />
                    </label>

                    <label className="text-sm font-medium text-gray-700">
                        Image URL
                        <input
                            type="text"
                            name="image"
                            value={editData.image}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-lg w-full mt-1 focus:ring focus:ring-blue-300"
                        />
                    </label>

                    {editData.image && (
                        <div className="mt-2 flex justify-center">
                            <img
                                src={editData.image}
                                alt="Preview"
                                className="w-40 h-40 object-cover rounded-lg border shadow"
                            />
                        </div>
                    )}
                </div>

              
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={() => setShowEditModal(false)}
                        className="px-4 py-2 rounded-lg border border-gray-400 text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 shadow-md"
                        onClick={Save}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditModal;
