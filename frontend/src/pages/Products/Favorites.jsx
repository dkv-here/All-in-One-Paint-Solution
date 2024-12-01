import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="p-[4rem] bg-gradient-to-t from-[rgb(255,62,187)] to-white ">
      <h1 className="text-2xl font-bold ml-[8rem] mt-[3rem]">
        FAVORITE PRODUCTS
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-4 mt-[2rem] ml-[8rem] mr-[4rem] pb-20">
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;