/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import useCartStore from "../../Hooks/useCart";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import OrderForm from "../../Components/OrderForm/OrderForm";

function CheckoutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    userdata,
    shippingCost,
    finalTotalPrice,
    tax,
    discount,
    discountAmount,
    removeAllCartItems,
  } = useCartStore();

  const initialValues = {
    name: "",
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    cardNumber: Yup.string()
      .required("Card number is required")
      .matches(/^[0-9]{16}$/, "Card number must be 16 digits"),
    expiryDate: Yup.string()
      .required("Expiry date is required")
      .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Use MM/YY format"),
    cvv: Yup.string()
      .required("CVV is required")
      .matches(/^[0-9]{3}$/, "CVV must be 3 digits"),
    nameOnCard: Yup.string().required("Name on card is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    postalCode: Yup.string()
      .required("Postal code is required")
      .matches(/^[A-Za-z0-9\s-]{4,10}$/, "Postal code must be 4-10 characters"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{11}$/, "Phone number must be 11 digits"),
  });

  const handleSubmit = (values) => {
    console.log("Form Submitted:", values);
    setIsModalOpen(true);
  };

  const handleClickOutsideModal = (e) => {
    if (e.target.id === "modal-background") {
      setIsModalOpen(false);
      removeAllCartItems();
    }
  };

  const handleComtinueShopping = () => {
    setIsModalOpen(false);
    removeAllCartItems();
  };

  const calculateTotalPrice = (items) =>
    items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const totalPrice = calculateTotalPrice(userdata);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {userdata.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen text-center gap-4">
          <p className="text-lg font-semibold text-gray-600">
            Your cart is empty.
          </p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-700 transition"
          >
            <ion-icon name="arrow-back-outline"></ion-icon> Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 max-w-6xl mx-auto my-8">
          {/* Checkout Form */}
          <div className="col-span-2 bg-white shadow-lg rounded-lg p-6">
            <div className="border-b pb-4 mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <OrderForm />
            </Formik>
          </div>

          {/* Order Summary */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="border-b pb-4 mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Order Summary
              </h2>
            </div>
            {/* Cart Items List */}
            <div className="mb-4">
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {userdata.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 border-b pb-2 last:border-b-0"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-contain rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-800 truncate">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </div>
                    </div>
                    <div className="font-semibold text-gray-700 text-sm">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              By placing your order, you agree to our Privacy Policy and Terms
              of Service.
            </p>
            <div className="space-y-3 text-gray-700 text-sm">
              <div className="flex justify-between">
                <span>Items ({userdata.length})</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shippingCost}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>
                  {discount * 100}% (${discountAmount.toFixed(2)})
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between font-bold text-base">
                <span>Total</span>
                <span>${finalTotalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Success Modal */}
          {isModalOpen && (
            <div
              id="modal-background"
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={handleClickOutsideModal}
            >
              <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm text-center">
                <h2 className="text-xl font-semibold mb-2 text-green-600">
                  Order Confirmed!
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  Thank you for your purchase. A confirmation email has been
                  sent.
                </p>
                <Link
                  to="/"
                  onClick={handleComtinueShopping}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                >
                  <ion-icon name="arrow-back-outline"></ion-icon>
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
