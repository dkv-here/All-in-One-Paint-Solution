import { Link } from "react-router-dom";
import HeartIcon from './HeartIcon'

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[13rem] h-full mr-1 p-4 bg-[rgb(232,232,232)] rounded-md overflow-hidden shadow-sm shadow-[rgba(0,0,0,0.55)]">
      <div className="relative w-full h-[10rem]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full aspect-video object-cover rounded"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-2">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center font-semibold">
            <div className="w-[60%] text-md">{product.name}</div>
            <span className="w-[40%] bg-[rgb(93,0,124)] text-[rgb(240,197,255)] text-[15px] font-medium mr-2 px-1.5 py-0.5 rounded-md dark:bg-[rgb(93,0,124)] dark:text-[rgb(240,197,255)]">
              ₹ {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  )
}
export default SmallProduct;