import React from "react";
import useCartStore from "../Hooks/useCart";
import { Link } from "react-router-dom";

function Navbar() {
  const { userdata } = useCartStore();
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="flex justify-between items-center p-4 sm:px-8 max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition"
        >
          ShoppingStore
        </Link>

        {/* Hamburger Button (Mobile Only) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-3xl text-gray-700 focus:outline-none"
        >
          <ion-icon
            name={menuOpen ? "close-outline" : "menu-outline"}
          ></ion-icon>
        </button>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center space-x-6">
          {/* Cart */}
          <Link
            to="/CartPage"
            className="relative text-2xl hover:text-blue-600 transition"
            title="Cart"
          >
            <ion-icon name="cart-outline"></ion-icon>
            {userdata.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {userdata.length}
              </span>
            )}
          </Link>

          {/* Sign In */}
          <Link
            to="/signIn"
            className="text-2xl hover:text-blue-600 transition"
            title="Sign In"
          >
            <ion-icon name="log-in-outline"></ion-icon>
          </Link>

          {/* Sign Out */}
          <Link
            className="text-2xl hover:text-red-600 transition"
            title="Sign Out"
          >
            <ion-icon name="log-out-outline"></ion-icon>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden flex flex-col px-6 pb-4 space-y-4">
          <Link to="/CartPage" className="flex items-center text-lg">
            <ion-icon name="cart-outline" class="mr-2 text-2xl"></ion-icon>
            Cart
            {userdata.length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {userdata.length}
              </span>
            )}
          </Link>
          <Link to="/signin" className="flex items-center text-lg">
            <ion-icon name="log-in-outline" class="mr-2 text-2xl"></ion-icon>
            Sign In
          </Link>
          <Link to="/signout" className="flex items-center text-lg">
            <ion-icon name="log-out-outline" class="mr-2 text-2xl"></ion-icon>
            Sign Out
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
