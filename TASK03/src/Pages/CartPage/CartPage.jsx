/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import useCartStore from "../../Hooks/useCart";
import { Link } from "react-router-dom";
import Cart from "../../Components/Cart/Cart";
import { Toaster, toast } from "react-hot-toast";

function EnhancedCartPage() {
  const { userdata, removeFromCart, updateQuantity, updateCheckoutData } =
    useCartStore();
  const [shipping, setShipping] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleIncrement = (id, currentQuantity) => {
    if (currentQuantity < 999) updateQuantity(id, currentQuantity + 1);
  };

  const handleDecrement = (id, currentQuantity) => {
    if (currentQuantity > 0) updateQuantity(id, currentQuantity - 1);
  };

  const handleChange = (id, e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) updateQuantity(id, value);
  };

  const calculateTotalPrice = (items) =>
    items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const totalPrice = calculateTotalPrice(userdata);
  const tax = (totalPrice + shipping) * 0.05;
  const discountAmount = (totalPrice + shipping + tax) * discount;
  const finalTotalPrice = totalPrice + shipping + tax - discountAmount;

  const handleShippingChange = (e) => {
    const selectedShipping = parseInt(e.target.value, 10);
    setShipping(selectedShipping);
  };

  useEffect(() => {
    updateCheckoutData(
      shipping,
      finalTotalPrice,
      tax,
      discount,
      discountAmount
    );
  }, [shipping, finalTotalPrice, tax, discount]);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Toaster />
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
            <span className="text-gray-500">{userdata.length} item(s)</span>
          </div>

          {userdata.length === 0 ? (
            <div className="text-center text-gray-500 py-16">
              <p className="text-lg">Your cart is currently empty.</p>
              <Link
                to="/"
                className="mt-4 inline-block text-blue-600 font-medium hover:underline"
              >
                Continue Shopping →
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {userdata.map((item) => (
                <Cart
                  key={item.id}
                  item={item}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                  onChange={handleChange}
                  onRemove={removeFromCart}
                />
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-lg h-fit sticky top-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
            Order Summary
          </h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Shipping Method
            </label>
            <select
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleShippingChange}
            >
              <option value="0">Standard - $0</option>
              <option value="10">Express - $10</option>
              <option value="15">Fast - $15</option>
            </select>
          </div>

          <div className="text-sm text-gray-700 space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (5%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600 font-medium">
                <span>Discount (10%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold text-lg border-t pt-2">
              <span>Total</span>
              <span>${finalTotalPrice.toFixed(2)}</span>
            </div>
          </div>

          <Link
            to="/CheckoutPage"
            className="block w-full text-center bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EnhancedCartPage;
