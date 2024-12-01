import React from 'react'
import { useState } from "react";
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart } from 'react-icons/ai'
import { FaHome, FaStore, FaHeart, FaPaintRoller, FaShoppingCart, FaPalette } from "react-icons/fa";
import { 
  MdOutlineColorLens 
} from 'react-icons/md';
import { MdBrush } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {

  const { userInfo } = useSelector(state => state.auth)
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false) //Tracks whether the dropdown menu is open or closed
  const [showSidebar, setShowSidebar] = useState(false) //Tracks the visibility of the sidebar 

  const toggleDropdown = () => { 
    setDropdownOpen(!dropdownOpen)
  }

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const toggleSidebar = () => { 
    setShowSidebar(!showSidebar)
  }

  const closeSidebar = () => { 
    setShowSidebar(false)
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation();


  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      setDropdownOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return <div style={{ zIndex: 999 }} className={`${showSidebar ? "hidden" : "flex"} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[rgb(79,0,105)] w-[4%] hover:w-[15%] h-[100vh] fixed`} id="navigation-container">

    <div className='flex flex-col justify-center space-y-2'>
      
      <Link to='/' className='flex items-center transition-transform transform hover:translate-x-2.5'>
        <FaHome className='mr-2 mt-[3rem]' />
        <span className="hidden nav-item-name mt-[3rem]">HOME</span>
      </Link>

      <Link to='/shop' className='flex items-center transition-transform transform hover:translate-x-2.5'>
        <FaStore className='mr-2 mt-[3rem] text-sm' />
        <span className="hidden nav-item-name mt-[3rem]">SHOP</span>
      </Link>

      <Link to='/cart' className='flex items-center transition-transform transform hover:translate-x-2.5'>
        <FaShoppingCart className='mr-2 mt-[3rem]' />
        <span className="hidden nav-item-name mt-[3rem]">CART</span>

        <div className="absolute left-2 top-8">
            {cartItems.length > 0 && (
              <span>
                <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              </span>
            )}
          </div>
      </Link>

      <Link to='/favorite' className='flex items-center transition-transform transform hover:translate-x-2.5'>
        <FaHeart className='mr-2 mt-[3rem]' />
        <span className="hidden nav-item-name mt-[3rem]">FAVORITE</span>
        <FavoritesCount/>
      </Link>

      <Link to='/service' className='flex items-center transition-transform transform hover:translate-x-2.5'>
        <FaPaintRoller className='mr-2 mt-[3rem] text-sm' />
        <span className="hidden nav-item-name mt-[3rem]">SERVICE</span>
      </Link>

      <Link
        to='/customize'
        className='flex items-center transition-transform transform hover:translate-x-2.5'
      >
        <FaPalette className='mr-2 mt-[3rem] text-sm' />
        <span className="hidden nav-item-name mt-[3rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-indigo-300 via-blue-400 via-green-300 via-yellow-400 via-orange-300 to-red-400 hover:text-transparent">
          CUSTOMIZE
        </span>
      </Link>
    </div>

    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-800 focus:outline-none"
      >
        {userInfo ? (
        <span className="text-white hidden nav-item-name mt-[1rem]">{userInfo.username}</span>
        ) : (
        <></>
        )}
          
        {userInfo && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ml-1 ${
              dropdownOpen ? "transform rotate-180" : ""
            } mt-[19px]`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={dropdownOpen ? "M5 15l7-7 7 7" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        )}
      </button>

      {dropdownOpen && userInfo && (
          <ul
            className={`absolute bottom-full right-0 mt-2 mr-14 space-y-2 bg-[rgb(220,124,255)] text-black ${
              !userInfo.isAdmin ? "-top-30" : "-top-90"
            } rounded-md`}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 onClick={closeDropdown}"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={closeDropdown}
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={closeDropdown}
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={closeDropdown}
                  >
                    Orders
                  </Link>
              </li>
              <li>
                  <Link
                    to="/admin/servicelist"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={closeDropdown}
                  >
                    Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={closeDropdown}
                  >
                    Users
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100" onClick={closeDropdown}>
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
      )}

      {!userInfo && (
          <ul>
            <li>
              <Link
                to="/login"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineLogin className="mt-[4px]" size={20} />
                <span className="hidden nav-item-name"> Login</span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineUserAdd size={20} />
                <span className="hidden nav-item-name"> Register</span>
              </Link>
            </li>
          </ul>
      )}
    </div>

  </div>
};

export default Navigation
