import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  return (
    <div className="absolute left-2 top-8">
      {favoriteCount > 0 && (
        <span className="px-1 py-0 text-xs font-semibold text-white bg-pink-500 rounded-full">
          {favoriteCount > 10 ? "10+" : favoriteCount}
        </span>
      )}
    </div>
  );
};

export default FavoritesCount;