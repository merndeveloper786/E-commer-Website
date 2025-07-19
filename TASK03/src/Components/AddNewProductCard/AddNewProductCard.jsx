/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

function AddNewProductCard({ handleAddNewProduct }) {
  return (
    <div
      onClick={() => handleAddNewProduct(true)}
      className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl shadow-sm w-64 h-[400px] m-4 p-6 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 hover:shadow-xl hover:border-blue-400 transition-all duration-300"
    >
      <div className="bg-blue-100 text-blue-600 rounded-full p-6 flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110">
        <ion-icon name="add-outline" size="large"></ion-icon>
      </div>
      <p className="text-lg font-semibold text-gray-600 group-hover:text-blue-600 text-center">
        Add New Product
      </p>
    </div>
  );
}

export default AddNewProductCard;
