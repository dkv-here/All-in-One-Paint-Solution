import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css";
import { Route, RouterProvider, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

// Private Route
import PrivateRoute from "./components/PrivateRoute";

//Auth
import Login from "./pages/Auth/Login";
import Register from './pages/Auth/Register.jsx';

import Profile from "./pages/User/Profile";

import AdminRoute from "./pages/Admin/AdminRoute";
import UserList from "./pages/Admin/UserList";

import CategoryList from "./pages/Admin/CategoryList";
import ProductList from "./pages/Admin/ProductList";
import ProductUpdate from "./pages/Admin/ProductUpdate";
import AllProducts from "./pages/Admin/AllProducts";
import Home from './pages/Home.jsx';

import Favorites from './pages/Products/Favorites.jsx';
import ProductDetails from './pages/Products/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';
import Shop from './pages/Shop.jsx';

import Shipping from "./pages/Orders/Shipping.jsx";
import PlaceOrder from './pages/Orders/PlaceOrder.jsx';

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Order from './pages/Orders/Order.jsx';
import UserOrder from './pages/User/UserOrder.jsx';
import OrderList from './pages/Admin/OrderList.jsx';
import AdminServices from './pages/Admin/AdminServices.jsx';
import Customize from './pages/designs/customize.jsx';
import ServiceList from './pages/Admin/ServiceList.jsx';
import Service from './pages/Services/Service.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>

      <Route path="/login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route index={true} path="/" element={<Home />} />
      <Route path='/favorite' element={<Favorites />} />
      <Route path='/customize' element={<Customize />} />
      <Route path='/product/:id' element={<ProductDetails />}/>
      <Route path='/cart' element={<Cart />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/service' element={<Service />} />
      <Route path='/user-orders' element={<UserOrder />} />
      
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path="productlist/:pageNumber" element={<ProductList />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="allproductslist" element={<AllProducts />} />
        <Route path="orderlist" element={<OrderList />} />
        <Route path="servicelist" element={<ServiceList />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);
