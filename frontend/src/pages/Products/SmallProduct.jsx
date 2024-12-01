import { Link } from "react-router-dom";
import HeartIcon from './HeartIcon'

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[15rem] ml-[2rem] mb-[1rem] p-4 bg-[rgb(232,232,232)] rounded-md overflow-hidden shadow-sm shadow-[rgba(0,0,0,0.55)]">
      <div className="relative w-full h-[155px]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full aspect-video object-cover rounded"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-2">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center text-lg font-semibold">
            <div>{product.name}</div>
            <span className="bg-[rgb(93,0,124)] text-[rgb(240,197,255)] text-sm font-medium mr-2 px-2.5 py-0.5 rounded-md dark:bg-[rgb(93,0,124)] dark:text-[rgb(240,197,255)]">
            ₹ {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  )
}
export default SmallProduct;