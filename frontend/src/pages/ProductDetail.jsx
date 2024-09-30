import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';

const ProductDetail = () => {
    const { id } = useParams();
    const { data: product, error, isLoading } = useGetProductDetailsQuery(id);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching product details</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col sm:flex-row">
                <div className="sm:w-1/2">
                    <img src={product.images[0]} alt={product.title} className="w-full h-auto rounded-lg shadow-md" />
                </div>
                <div className="sm:w-1/2 sm:pl-6">
                    <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
                    <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                    <p className="text-lg text-gray-700 mb-4">{product.description}</p>
                    <div className="flex items-center mb-4">
                        <span className="text-xl font-semibold text-gray-900">${product.price.toFixed(2)}</span>
                        <span className="ml-2 text-sm text-gray-500">({product.rating} ★)</span>
                    </div>
                    <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                    <div className="mt-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800">Tags</h2>
                <div className="flex flex-wrap mt-2">
                    {product.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-sm mr-2 mb-2">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
