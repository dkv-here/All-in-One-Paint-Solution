import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        // Filter products based on both checked categories, price filter, and search query
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            // Check if the product price includes the entered price filter value
            return (
              (product.price <= parseFloat(priceFilter) || priceFilter === "") &&
              (product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                product.brand.toLowerCase().includes(searchQuery.toLowerCase())) // Search filter
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter, searchQuery]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="container mx-auto pl-[4rem]">
        <div className="flex md:flex-row">
          <div className="p-3 mt-2 mb-2">
            <h2 className="h4 text-center text-white py-2 bg-gradient-to-r from-[rgb(93,0,124)] to-pink-500 rounded-full mb-2">
              Filter by Categories
            </h2>
            <div className="p-5 w-[15rem]">
              {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex ietms-center mr-4">
                    <input
                      type="checkbox"
                      id="red-checkbox"
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-700 dark:focus:ring-purple-700 dark:ring-offset-gray-800 focus:ring-2 dark:bg-purpl-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="purple-checkbox"
                      className="ml-2 text-sm font-medium text-black dark:text-gray-700"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center text-white py-2 bg-gradient-to-r from-[rgb(93,0,124)] to-green-500 rounded-full mb-2">
              Filter by Brands
            </h2>
            <div className="p-5">
              {uniqueBrands?.map((brand) => (
                <div className="flex items-enter mr-4 mb-5" key={brand}>
                  <input
                    type="radio"
                    id={brand}
                    name="brand"
                    onChange={() => handleBrandClick(brand)}
                    className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-green-700"
                  />
                  <label
                    htmlFor="pink-radio"
                    className="ml-2 text-sm font-medium text-black dark:text-gray-700"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center text-white py-2 bg-gradient-to-r from-[rgb(93,0,124)] to-yellow-500 rounded-full mb-2">
              Filer by Price
            </h2>
            <div className="p-5 w-[15rem]">
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 placeholder-gray-500 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-purple-700 dark:focus:ring-purple-600"
              />
            </div>

            <div className="p-5 pt-0">
              <button
                className="w-full border rounded-md my-4 bg-gray-600 text-white"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="p-3">
            
            <div className="flex flex-wrap">
              {/* Search Bar */}
              <div className="w-full mb-4">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="bg-gray-100 w-[95%] px-3 py-2 ml-5 border border-gray-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div className="w-full">
                <h2 className="h4 text-center mb-2">{products?.length} Products</h2>
              </div>

              {products.length === 0 ? (
                <Loader />
              ) : (
                products?.map((p) => (
                  <div className="p-3" key={p._id}>
                    <ProductCard p={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
