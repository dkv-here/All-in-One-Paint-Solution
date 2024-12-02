import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    console.log("Add to Cart clicked", product, qty);
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: "top-right",
      autoClose: 2000,
  });
  };

  return (
    <div className="text-white shadow-lg shadow-[rgba(0,0,0,0.51)] w-[250px] h-full relative bg-[#1A1A1A] rounded-lg shaodw dark:bg-gray-800 dark:border-gray-700 mx-2 ">
      <section className="relative">
        <Link to={`/product/${p._id}`}>
          <span className="absolute bottom-3 right-3 bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-[rgb(93,0,124)] dark:text-purple-300">
            {p?.brand}
          </span>
          <img
            className="cursor-pointer w-full rounded-t-lg"
            src={p.image}
            alt={p.name}
            style={{ width: "250px", height: "250px", objectFit: "cover" }}
          />
        </Link>
        <HeartIcon product={p} />
      </section>

      <div className="p-5">
        <div className="flex justify-between">
          <h5 className="mb-2 text-md text-whiet dark:text-white">{p?.name}</h5>

          <p className="text-black font-semibold text-yellow-500">
            {p?.price?.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </p>
        </div>

        <p className="mb-3 font-normal text-xs text-[#CFCFCF]">
          {p?.description?.substring(0, 50)} ...
        </p>

        <section className="flex justify-between items-center">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center px-2 py-1 text-xs font-medium text-center text-white bg-gradient-to-r from-pink-700 to-pink-500 rounded-md hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
          >
            Read More
            <svg
              className="w-3 h-3 ml-2"
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

          <button
            className="p-2 rounded-full"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={24} />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;