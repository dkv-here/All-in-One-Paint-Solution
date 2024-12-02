import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";
import { CreditCardIcon, UsersIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      tooltip: {
        theme: "dark",
      },
      colors: ["#8b00a4"],
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical", // Can be 'vertical' or 'horizontal'
          shadeIntensity: 1,
          gradientToColors: ["#650086"], // Secondary gradient color
          inverseColors: true,
          opacityFrom: 6,
          opacityTo: 0.6,
          stops: [0, 90, 100],
        },
      },
      dataLabels: {
        enabled: true,
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#929292",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales ( ₹ )",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const sortedSalesDetail = [...salesDetail].sort((a, b) => new Date(a._id) - new Date(b._id));

      const formattedSalesDate = sortedSalesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },

        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <>
      <AdminMenu />

      <section className="xl:ml-[4rem] md:ml-[0rem]">
        <div className="w-[100%] flex justify-around flex-wrap text-white">
          <div className="rounded-lg bg-gradient-to-r from-[rgb(93,0,124)] to-green-500 p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-white text-black text-center p-3">
              <CreditCardIcon />
            </div>

            <p className="mt-5">Sales</p>
            <h1 className="text-xl font-bold">
              $ {isLoading ? <Loader /> : sales.totalSales.toFixed(2)}
            </h1>
          </div>
          <div className="rounded-lg bg-gradient-to-r from-[rgb(93,0,124)] to-pink-500 p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-white text-black text-center p-3">
              <UsersIcon />
            </div>

            <p className="mt-5">Customers</p>
            <h1 className="text-xl font-bold">
              {isLoading ? <Loader /> : customers?.length}
            </h1>
          </div>
          <div className="rounded-lg bg-gradient-to-r from-[rgb(93,0,124)] to-yellow-500 p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-white text-black text-center p-3">
              <ShoppingBagIcon />
            </div>

            <p className="mt-5">All Orders</p>
            <h1 className="text-xl font-bold">
              {isLoading ? <Loader /> : orders?.totalOrders}
            </h1>
          </div>
        </div>

        <div className="ml-[10rem] mt-[4rem]">
          <Chart
            options={state.options}
            series={state.series}
            type="line"
            width="80%"
          />
        </div>

        <div className="mt-[4rem]">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;