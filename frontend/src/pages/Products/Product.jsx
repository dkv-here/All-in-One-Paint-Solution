import React from 'react'
import { Link } from 'react-router-dom'
import HeartIcon from './HeartIcon'

const Product = ({product}) => {
  return (
    <div className='shadow-lg shadow-[rgba(0,0,0,0.55)] rounded-xl mx-4 my-2'>
      <div className="relative">
        <img src={product.image} alt={product.name} className='w-full h-[450px] object-cover rounded-xl' />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4 rounded-xl">
          <Link to={`/product/${product._id}`}>
            <h2 className="flex justify-between items-center text-white">
              <div className="text-lg">{product.name}</div>
              
              <span className='bg-pink-100 text-pink-800 text-sm font-medium ml-9 px-2.5 py-0.5 rounded-full dark:bg-pink-600 dark:text-pink-200'>₹ { product.price}</span>
            </h2>
          </Link>
        </div>

        <HeartIcon
          product={product}
          favoriteColor="pink-700" 
          defaultColor="pink-700"
        />
      </div>

    </div>
  )
}

export default Product
