import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 m-2 shadow-md transition-transform transform hover:scale-105">
      <img
        src={product.images[0] || product.images[1]}
        alt={product.title}
        className="w-full h-48 object-cover rounded-md"
        loading="lazy"
      />
      <Link
        to={`/products/${product._id}`}
        className="text-lg font-semibold mt-2"
      >
        {product.title}
      </Link>
      <p className="text-gray-500">{product.category}</p>
      <p className="text-lg font-bold mt-1">${product.price.toFixed(2)}</p>

      <p className="text-yellow-500 mt-2 font-bold text-lg">
        Rating: {product.rating}
      </p>
      <button className="my-1 rounded bg-blue-500 text-white px-4 py-2 transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-yellow-300">
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;
