import React, { useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Handle search input change
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`); // Redirect with search query
    }
  };

  return (
    <nav className="bg-white shadow-md z-50 sticky top-0">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to={'/'} className="text-2xl font-bold text-blue-600">Undual</Link>

        <form onSubmit={handleSearchSubmit} className="flex flex-1 mx-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type='submit' className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <FiSearch className="text-gray-500" />
            </button>
          </div>
        </form>

        <div className="flex items-center space-x-4">
          <button className="flex items-center text-gray-700 hover:text-blue-600">
            <FaUser className="text-xl" />
            <span className="ml-1 hidden sm:inline">Sign In</span>
          </button>

          <button className="flex items-center text-gray-700 hover:text-blue-600">
            <FaShoppingCart className="text-xl" />
            <span className="ml-1 hidden sm:inline">Cart</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
