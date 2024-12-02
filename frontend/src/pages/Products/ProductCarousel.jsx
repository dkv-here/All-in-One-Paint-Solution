import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaComment,
  FaComments,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 lg:block xl:block md:block mr-5 bg-gradient-to-t from-[rgb(120,50,150)] to-[rgba(109,0,145,0.52)] p-8 rounded-md">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[38rem]  lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id} className="flex flex-row">

                <div className="flex">
                  <img
                    src={image}
                    alt={name}
                    className="rounded-lg object-cover h-[25rem]"
                  />

                  <div className="one flex flex-col gap-5 pl-5 mt-3 text-white">
                    <h1 className="flex items-center mb-6">
                      <FaStore className="mr-2 text-white" />
                      <span>
                        <span className="font-semibold">Brand : </span>
                        {brand}
                      </span>
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaClock className="mr-2 text-white" />
                      <span>
                        <span className="font-semibold">Added : {" "}</span>
                        {moment(createdAt).fromNow()}
                      </span>
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaComments className="mr-2 text-white" />
                      <span>
                        <span className="font-semibold">Reviews : </span>
                        {numReviews}
                      </span>
                    </h1>

                    <h1 className="flex items-center mb-6">
                      <FaStar className="mr-2 text-white" /> 
                      <span>
                        <span className="font-semibold">Ratings : {" "}</span>
                        {Math.round(rating)}
                      </span>
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaShoppingCart className="mr-2 text-white" />
                      <span>
                        <span className="font-semibold">Quantity : {" "}</span>
                        {quantity}
                      </span>
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaBox className="mr-2 text-white" /> 
                      <span>
                        <span className="font-semibold">In Stock : {" "}</span>
                        {countInStock}
                      </span>
                    </h1>
                  </div>
                </div>

                <div className="mt-4 flex text-white">
                  <div className="pl-1">
                    <h2 className="text-lg font-semibold">{name}</h2>
                    <p className="text-2xl font-bold mb-2"> ₹ {price}</p>
                    <p className="w-full font-2xs text-gray-300">
                      {description.substring(0, 220)} ...
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;  
