/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import Rating from "../Ratings/Rating";
import { Link } from "react-router-dom";
import useCartStore from "../../Hooks/useCart";
import ProductModel from "../ProductModel/ProductModel";
import axios from "axios";
import { addToCartService } from "../../Services/cartService";

const fallbackImage = "path/to/fallback/image.jpg"; // fallback image

const Card = ({
  data,
  handleDelete,
  handleProductUpdate,
  handleupdateProduct,
}) => {
  const { userdata, addToCart } = useCartStore();
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const isItemInCart = userdata.some((item) => item.id === data.id);
    setIsDisabled(isItemInCart);
  }, [userdata, data.id]);

  const handleClick = async () => {
    addToCart(data);
    setIsDisabled(true);
    const response = await addToCartService(data);
    console.log(response.data);
  };

  const handleCardProduct = () => {
    handleProductUpdate(true, data);
    handleupdateProduct(false);
  };

  return (
    <div className="relative group flex flex-col items-center overflow-hidden">
      <Link to={`/ProductDetailsPage/${data.id}`}>
        <div className="border border-gray-200 bg-white rounded-2xl overflow-hidden w-64 h-[400px] m-4 p-5 flex flex-col items-center justify-start relative transition-all duration-300 transform hover:scale-105">
          {/* Image */}
          <div className="flex items-center justify-center w-full h-[180px] rounded-xl p-2">
            <img
              src={`${data.image}`}
              alt="product"
              className="w-full max-h-[180px] object-contain transition-transform duration-200 hover:scale-110"
              onError={(e) => (e.target.src = fallbackImage)}
            />
          </div>

          {/* Bottom section */}
          <div className="absolute bottom-0 p-4 flex flex-col gap-2 w-full">
            <Link to={`/ProductDetailsPage/${data.id}`}>
              <div className="flex flex-col gap-1">
                <h3 className="text-md font-medium text-gray-700 w-56 line-clamp-2">
                  {data.title}
                </h3>
                <p className="text-lg font-semibold text-gray-800">{`$${data.price}`}</p>

                <div className="flex gap-5 items-center mt-1">
                  <Rating rating={data.rating.rate} /> {data.rating.rate}
                </div>
              </div>
            </Link>

            {/* Add to Cart Button */}
            <Link to={isDisabled ? "/CartPage" : ""}>
              <div
                className={`flex items-center justify-center text-white gap-2 h-9 px-4 mt-2 rounded-md transition-all duration-200 ${
                  isDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                onClick={handleClick}
                style={{ pointerEvents: isDisabled ? "none" : "auto" }}
              >
                {isDisabled ? (
                  <ion-icon name="arrow-forward-outline"></ion-icon>
                ) : (
                  <>
                    <ion-icon name="add-outline"></ion-icon>
                    <p>Add to Cart</p>
                  </>
                )}
              </div>
            </Link>
          </div>
        </div>
      </Link>

      {/* Edit & Delete Icons */}
      <div className=" z-10 absolute top-4 -right-8 sm:top-8 sm:-right-8 group-hover:right-4 sm:group-hover:right-8 transition-all duration-300 flex flex-col gap-4">
        <Link
          className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-lg"
          onClick={() => handleCardProduct()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-pencil stroke-white p-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-lg"
          >
            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
            <path d="m15 5 4 4"></path>
          </svg>
        </Link>
        <button
          className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-lg"
          onClick={() => handleDelete(data.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-trash   stroke-white p-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-lg"
          >
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Card;
