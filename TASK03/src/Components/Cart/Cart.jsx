/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import useCartStore from "../../Hooks/useCart";
import { removeFromCartService } from "../../Services/cartService";

function Cart({ item }) {
  const { userdata, removeFromCart, updateQuantity } = useCartStore();

  const handleIncrement = (id, currentQuantity) => {
    if (currentQuantity < 10) {
      updateQuantity(id, currentQuantity + 1);
    }
  };

  const handleDecrement = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    }
  };

  const handleChange = (id, e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      updateQuantity(id, value);
    }
  };

  const handleDelete = async (id) => {
    removeFromCart(item.id);
    const response = await removeFromCartService(userdata, updateQuantity);
    console.log(response.data);
  };

  return (
    <div>
      <div key={item.id}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 hover:shadow-md hover:bg-gray-100 p-4 rounded-xl border my-6 transition duration-200">
          {/* Product Image */}
          <img
            src={item.image}
            alt="image"
            className="w-20 h-20 object-contain flex-shrink-0"
          />

          {/* Product Info */}
          <div className="flex flex-col flex-1 min-w-0 md:ml-4 justify-center">
            <h2 className="text-md md:text-lg font-semibold line-clamp-2 mb-1 w-full">
              {item.title}
            </h2>
            {/* Mobile Price */}
            <div className="md:hidden flex items-center justify-between mt-2">
              <span className="text-base font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 hover:text-red-600 ml-4"
                title="Remove"
              >
                <ion-icon name="trash-outline" className="text-xl" />
              </button>
            </div>
          </div>

          {/* Quantity Controls (inline) */}
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <button
              className="w-8 h-8 flex items-center justify-center rounded border hover:bg-gray-200 transition"
              onClick={() => handleDecrement(item.id, item.quantity)}
            >
              <ion-icon name="remove-outline" className="text-xl" />
            </button>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleChange(item.id, e)}
              className="w-12 h-8 text-center border rounded"
            />
            <button
              className="w-8 h-8 flex items-center justify-center rounded border hover:bg-gray-200 transition"
              onClick={() => handleIncrement(item.id, item.quantity)}
            >
              <ion-icon name="add-outline" className="text-xl" />
            </button>
          </div>

          {/* Price Info (desktop) */}
          <div className="hidden md:flex items-center font-medium w-24 justify-center">
            ${item.price.toFixed(2)}
          </div>

          {/* Total Price (desktop) */}
          <div className="hidden md:flex items-center font-semibold w-24 justify-center">
            ${(item.price * item.quantity).toFixed(2)}
          </div>

          {/* Delete Button (desktop) */}
          <div className="hidden md:flex items-center justify-center w-12">
            <button
              onClick={() => handleDelete(item.id)}
              className="text-red-500 hover:text-red-600"
              title="Remove"
            >
              <ion-icon name="trash-outline" className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
