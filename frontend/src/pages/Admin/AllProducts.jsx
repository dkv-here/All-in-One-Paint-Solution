
import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <>
      <div className="ml-[9rem] flex-wrap flex-grow overflow-x-hidden">
        <div className="flex flex-col md:flex-row ">
          <div className="flex-grow ">
            <div className="ml-[2rem] text-xl font-bold h-12 ">
              All Products ({products.length})
            </div>
            <div className="flex flex-wrap justify-around items-center gap-4">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/admin/product/update/${product._id}`}
                  className="w-full sm:w-[calc(50%-1rem)] mb-4 py-5 px-4 overflow-hidden bg-[rgb(237,237,237)] rounded-xl shadow-md shadow-[rgba(0, 0, 0, 0.48)] flex flex-col"
                >
                  <div className="flex flex-col md:flex-row">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-[10rem] h-[10rem] object-cover rounded-md mb-4 md:mb-0"
                    />
                    <div className="p-4 flex flex-col justify-between flex-grow md:w-[calc(100%-12rem)]">
                      <div className="flex justify-between">
                        <h5 className="text-xl font-semibold mb-2">
                          {product?.name}
                        </h5>

                        <p className="text-gray-400 text-xs">
                          {moment(product.createdAt).format("MMMM Do YYYY")}
                        </p>
                      </div>

                      <p className="text-gray-400 text-sm mb-4 truncate w-full overflow-hidden">
                        {product?.description?.substring(0, 160)}...
                      </p>

                      <div className="flex justify-between items-center">
                        <Link
                          to={`/admin/product/update/${product._id}`}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[rgb(93,0,124)] rounded-lg hover:bg-[rgb(69, 0, 92)] focus:ring-4 focus:outline-none focus:ring-[rgb(37, 0, 50)] dark:bg-[rgb(93,0,124)] dark:hover:bg-[rgb(69, 0, 92)] dark:focus:ring-[rgb(37, 0, 50)]"
                        >
                          Update Product
                          <svg
                            className="w-3.5 h-3.5 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </Link>
                        <p className="font-bold">₹ {product?.price}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="md:w-1/4 p-3 mt-2">
            <AdminMenu />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
