import React from 'react';

function DeleteModal({ confirmDelete, setShowDeleteModal }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <h2 className="text-lg font-bold mb-4">
          Are you sure you want to delete this product?
        </h2>
        <div className="flex justify-center gap-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={confirmDelete}
          >
            Yes
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={() => setShowDeleteModal(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
