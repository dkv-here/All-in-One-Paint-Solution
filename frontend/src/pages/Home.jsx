import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";
import ServiceBooking from "../components/ServiceBooking";


const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <div>
      {!keyword ? <Header /> : null}
      {isLoading ? (<Loader />) : isError ? (<Message variant='danger'>
        { isError?.data.Message || isError.error}
      </Message>) : (
          <div className="bg-gradient-to-t from-[rgb(255,62,187)] to-white">
            <div className="flex justify-between items-center">
              <h1 className="ml-[20rem] mt-[5rem] text-[3rem] text-black">
                Special Products
              </h1>

              <Link to='/shop' className="bg-[rgb(255,18,172)] font-bold rounded-full py-2 px-10 mr-[18rem] mt-[5rem] text-white">Shop</Link>
            </div>
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-4 mt-[2rem] ml-[8rem] mr-[4rem] pb-20">
                {data.products.map((product) => (
                <div key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
      )}
    </div>
  )
}

export default Home
