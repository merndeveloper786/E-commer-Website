/* eslint-disable no-unused-vars */
import React from "react";
import "./Home.css";
import Hero from "../../Components/Hero/Hero";
import ProductList from "../../Components/ProductList/ProductList";
import useSWR from "swr";
import { TailSpin } from "react-loader-spinner";
import Footer from "../../Components/Footer";

function Home() {
  const { data, error } = useSWR(`products/categories`);

  const categoryIcons = {
    electronics: "💻",
    jewelery: "💍",
    "men's clothing": "👔",
    "women's clothing": "👗",
  };

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        Failed to load categories.
      </div>
    );

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin height="80" width="80" color="#2563eb" />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="pb-12">
        <Hero />
      </section>

      {/* Category Filter Nav */}
      <section className="top-0 z-30 bg-gray-100 border-b shadow-sm px-4 sm:px-6 lg:px-8 py-3">
        <nav className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {data.map((category) => (
            <a
              key={category}
              href={`#${category}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full border bg-white text-gray-700 text-sm sm:text-base capitalize shadow transition-all hover:bg-blue-600 hover:text-white"
            >
              <span>{categoryIcons[category] || "🛍️"}</span>
              <span>{category}</span>
            </a>
          ))}
        </nav>
      </section>

      {/* Product Sections */}
      <section className="flex flex-col gap-20 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto py-10">
        {data.map((category) => (
          <div
            key={category}
            id={category}
            className="scroll-mt-24 border-b pb-10"
          >
            <ProductList heading={category} category={category} />
          </div>
        ))}
      </section>
      <Footer />
    </div>
  );
}

export default Home;
