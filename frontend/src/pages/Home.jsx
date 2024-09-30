import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { setFilter, setSearch } from "../slices/filterSlice";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { pageNumber } = useParams();

  const query = new URLSearchParams(location.search);
  const categoryFromQuery = query.get("category") || "all";
  const searchFromQuery = query.get("search") || "";

  const categories = [
    "all", "beauty", "fragrances", "furniture", "groceries", "home-decoration", "kitchen-accessories",
    "laptops", "mens-shirts", "mens-shoes", "mens-watches", "mobile-accessories", "motorcycle",
    "skin-care", "smartphones", "sports-accessories", "sunglasses", "tablets", "tops", "vehicle",
    "womens-bags", "womens-dresses", "womens-jewellery", "womens-shoes", "womens-watches",
  ];

  const filter = useSelector((state) => state.filter.filter);
  const { data, isLoading, error } = useGetProductsQuery({
    filter: categoryFromQuery === "all" ? "" : categoryFromQuery,
    search: searchFromQuery,
    pageNumber,
  });

  let pages = data?.pages;
  let pageArr = Array.from({ length: pages }, (_, i) => i + 1);

  useEffect(() => {
    dispatch(setFilter(categoryFromQuery));
    dispatch(setSearch(searchFromQuery));
  }, [categoryFromQuery, searchFromQuery, dispatch]);

  const handleCategorySelect = (category) => {
    const newCategory = category === "all" ? "" : category;
    const params = new URLSearchParams(location.search);
    params.set("category", newCategory);
    params.delete("page");
    navigate({ search: params.toString() });
    dispatch(setFilter(category));
    setIsSidebarOpen(false); // Close the sidebar after selection
  };

  if (isLoading) return <div className="text-center">Loading products...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4 relative">
       <div className="hidden lg:block flex flex-wrap justify-center mb-4">
        {categories.map((category, i) => (
          <button
            key={i}
            onClick={() => handleCategorySelect(category)}
            className={`m-2 p-2 rounded-md border border-gray-300 transition-colors duration-200 ${
              filter === category
                ? "bg-blue-500 text-white"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      {/* Sidebar Toggle Button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        className="lg:hidden mb-4 p-2 bg-blue-500 text-white rounded-md"
      >
        Categories
      </button>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-md z-50">
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-red-500">
            Close
          </button>
          <div className="flex flex-col p-4">
            {categories.map((category, i) => (
              <button
                key={i}
                onClick={() => handleCategorySelect(category)}
                className={`my-2 p-2 rounded-md transition-colors duration-200 ${
                  filter === category
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Products */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.products.length === 0 ? (
          <h3 className="text-red-400 text-semibold">No match found</h3>
        ) : (
          data.products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap gap-2 my-4">
        {pageArr.map((page) => (
          <Link
            key={page}
            to={`/${page}?category=${categoryFromQuery}&search=${searchFromQuery}`}
            className="flex justify-center items-center p-1 w-[30px] border"
          >
            {page}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
