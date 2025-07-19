/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import Rating from "../../Components/Ratings/Rating";
import useCartStore from "../../Hooks/useCart";
import { TailSpin } from "react-loader-spinner";
import ProductModel from "../../Components/ProductModel/ProductModel";
import axios from "axios";

function ProductDetailsPage() {
  const { userdata, addToCart } = useCartStore();
  const [isDisabled, setIsDisabled] = useState(false);
  const { id } = useParams();
  const { data: initialData, error } = useSWR(
    `https://fakestoreapi.com/products/${id}`
  );
  const [showModel, setShowModel] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (initialData) setData(initialData);
  }, [initialData]);

  const handleClick = async () => {
    addToCart(data);
    setIsDisabled(true);
    const response = await axios.post(`https://fakestoreapi.com/carts`, {
      userId: 1,
      date: new Date().toISOString(),
      products: [{ productId: data.id, quantity: 1 }],
    });
    console.log(response.data);
  };

  useEffect(() => {
    if (data) {
      const isItemInCart = userdata.some((item) => item.id === data.id);
      setIsDisabled(isItemInCart);
    }
  }, [userdata, data]);

  const handleClickOutsideModal = (e) => {
    if (e.target.id === "modal-background") {
      setShowModel(false);
    }
  };

  const handleDetailProduct = () => {
    setShowModel(true);
  };

  const handleSubmit = async (values) => {
    const response = await axios.put(
      `https://fakestoreapi.com/products/${data.id}`,
      values
    );
    const updatedProduct = { ...response.data, rating: data.rating };
    setData(updatedProduct);
    setShowModel(false);
  };

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
        />
      </div>
    );
  }

  return (
    <>
      {showModel && (
        <div
          id="modal-background"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleClickOutsideModal}
        >
          <ProductModel selectedProduct={data} handleSubmit={handleSubmit} />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 transition duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Product Image */}
            <div className="flex justify-center items-center">
              <img
                src={data.image}
                alt="product"
                className="w-[280px] h-[280px] md:w-[350px] md:h-[350px] object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center gap-4">
              {/* Category + Edit Icon */}
              <div className="flex items-center justify-between">
                <p className="uppercase text-sm text-gray-500 tracking-wider font-medium">
                  {data.category}
                </p>
                <button
                  onClick={handleDetailProduct}
                  className="text-blue-500 hover:text-blue-700 transition"
                  title="Edit Product"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                    <path d="m15 5 4 4" />
                  </svg>
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                {data.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <Rating rating={data.rating.rate} /> {data.rating.rate}
              </div>

              {/* Price */}
              <h2 className="text-2xl text-blue-600 font-semibold">
                ${data.price.toFixed(2)}
              </h2>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {data.description}
              </p>

              {/* Add to Cart */}
              <div className="pt-4">
                <button
                  onClick={handleClick}
                  className={`px-5 py-2 rounded-lg text-white font-semibold text-sm sm:text-base transition duration-200 ${
                    isDisabled
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  disabled={isDisabled}
                >
                  {isDisabled ? "Already in Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <ProductList heading={data.category} category={data.category} /> */}
      </div>
    </>
  );
}

export default ProductDetailsPage;
