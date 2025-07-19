import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-12">
      <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
        {/* Column 1 */}
        <div>
          <h3 className="text-white text-xl font-bold mb-4">ShoppingStore</h3>
          <p className="text-sm">
            Discover the best products at unbeatable prices. Your one-stop shop
            for everything you love.
          </p>
          <div className="flex justify-center sm:justify-start gap-3 mt-4">
            <a href="#" className="hover:text-white transition">
              <ion-icon name="logo-facebook"></ion-icon>
            </a>
            <a href="#" className="hover:text-white transition">
              <ion-icon name="logo-instagram"></ion-icon>
            </a>
            <a href="#" className="hover:text-white transition">
              <ion-icon name="logo-twitter"></ion-icon>
            </a>
            <a href="#" className="hover:text-white transition">
              <ion-icon name="logo-youtube"></ion-icon>
            </a>
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/CartPage" className="hover:text-white transition">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/CheckoutPage" className="hover:text-white transition">
                Checkout
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                Shipping Info
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Returns & Refunds
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Help Center
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Join Newsletter
          </h3>
          <form className="flex flex-col gap-2 items-center sm:items-start">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded text-gray-800 text-sm w-full sm:w-auto"
            />
            <button className="bg-blue-600 hover:bg-blue-700 transition text-white py-2 px-4 rounded text-sm">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} ShoppingStore. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
