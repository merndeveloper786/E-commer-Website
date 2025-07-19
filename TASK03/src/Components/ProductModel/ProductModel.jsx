/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

function ProductModel({ selectedProduct, handleSubmit, addNewProduct }) {
  const [imageInputType, setImageInputType] = useState("url");
  const [filePreview, setFilePreview] = useState("");

  const initialValues = {
    title: "",
    price: "",
    description: "",
    image: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Product Title is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
    description: Yup.string().required("Description is required"),
    image: imageInputType === "url"
      ? Yup.string().required("Image URL is required")
      : Yup.string().required("Image file is required"),
  });

  return (
    <div className="max-w-xl w-full p-4">
      <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-100">
        <Formik
          initialValues={addNewProduct ? initialValues : selectedProduct}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {addNewProduct ? "Add New Product" : "Update Product"}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {addNewProduct
                    ? "Fill in the details to create a new product."
                    : "Edit product details below."}
                </p>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Title
                </label>
                <Field
                  name="title"
                  type="text"
                  placeholder="Enter product title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Price */}
              <div className="space-y-1">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price ($)
                </label>
                <Field
                  name="price"
                  type="number"
                  placeholder="Enter price"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <Field
                  name="description"
                  as="textarea"
                  rows={3}
                  placeholder="Enter product description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Image Input Type Selection */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image Source
                </label>
                <div className="flex gap-4 mb-2">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="imageInputType"
                      value="url"
                      checked={imageInputType === "url"}
                      onChange={() => setImageInputType("url")}
                    />
                    Image URL
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="imageInputType"
                      value="file"
                      checked={imageInputType === "file"}
                      onChange={() => setImageInputType("file")}
                    />
                    Upload Image
                  </label>
                </div>
              </div>

              {/* Image Field (URL or File) */}
              {imageInputType === "url" ? (
                <div className="space-y-1">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image URL
                  </label>
                  <Field
                    name="image"
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  {values.image && (
                    <img src={values.image} alt="Preview" className="mt-2 w-32 h-32 object-contain border rounded" />
                  )}
                </div>
              ) : (
                <div className="space-y-1">
                  <label
                    htmlFor="imageFile"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Upload Image
                  </label>
                  <input
                    id="imageFile"
                    name="imageFile"
                    type="file"
                    accept="image/*"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFilePreview(reader.result);
                          setFieldValue("image", reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  {filePreview && (
                    <img src={filePreview} alt="Preview" className="mt-2 w-32 h-32 object-contain border rounded" />
                  )}
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-lg font-semibold transition duration-300"
                >
                  {addNewProduct ? "Add Product" : "Update Product"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ProductModel;
