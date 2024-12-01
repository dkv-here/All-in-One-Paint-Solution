import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

  };


  return (
    <>
      <button
        className={`${
          isMenuOpen ? "top-2 right-2" : "top-5 right-7"
        } bg-[#ffffff] p-2 fixed rounded-lg`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="black" />
        ) : (
          <>
            <div className="w-5 h-0.5 bg-[#000000] my-1"></div>
            <div className="w-5 h-0.5 bg-[#000000] my-1"></div>
            <div className="w-5 h-0.5 bg-[#000000] my-1"></div>
          </>
        )}
      </button>

      {isMenuOpen && (
        <section className="bg-[rgb(220,124,255)] p-2 fixed right-7 top-5 rounded-lg">
          <ul className="list-none mt-2">
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[rgba(225,225,225,0.41)] rounded-sm"
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? "white" : "black",
                })}
              >
                Admin Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[rgba(225,225,225,0.41)] rounded-sm"
                to="/admin/categorylist"
                style={({ isActive }) => ({
                  color: isActive ? "white" : "black",
                })}
              >
                Create Category
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[rgba(225,225,225,0.41)] hover:text-[rgb(220,124,255)] rounded-sm"
                to="/admin/productlist"
                style={({ isActive }) => ({
                  color: isActive ? "white" : "black",
                })}
              >
                Create Product
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[rgba(225,225,225,0.41)] rounded-sm"
                to="/admin/allproductslist"
                style={({ isActive }) => ({
                  color: isActive ? "white" : "black",
                })}
              >
                All Products
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[rgba(225,225,225,0.41)] rounded-sm"
                to="/admin/userlist"
                style={({ isActive }) => ({
                  color: isActive ? "white" : "black",
                })}
              >
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[rgba(225,225,225,0.41)] rounded-sm"
                to="/admin/orderlist"
                style={({ isActive }) => ({
                  color: isActive ? "white" : "black",
                })}
              >
                Manage Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[rgba(225,225,225,0.41)] rounded-sm"
                to="/admin/servicelist"
                style={({ isActive }) => ({
                  color: isActive ? "white" : "black",
                })}
              >
                Manage Services
              </NavLink>
            </li>
          </ul>
        </section>
      )}

    </>
  )
} 
export default AdminMenu
