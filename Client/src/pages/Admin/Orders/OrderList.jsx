import React, { useEffect } from "react";
import SideBar from "../components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrdersAsync } from "../../../redux/Order/OrderSlice";
import Spinner from "../../../components/Spinner";
import { Link } from "react-router-dom";
import { FaLocationArrow as ArrowIcon } from "react-icons/fa6";

const ProductList = () => {
    const dispatch = useDispatch();
    const { loading, orders } = useSelector(
        (state) => state.order.getAllOrders
    );
    useEffect(() => {
        dispatch(getAllOrdersAsync());
    }, []);
    return (
        <>
            {loading && <Spinner />}
            {!loading && (
                <div className="h-fit bg-white">
                    <div className="mt-[60px] text-gray-900 flex flex-wrap gap-x-1">
                        <SideBar />
                        <div className="w-full p-4 sm:ml-60 mt-10 sm:mt-0 flex flex-col gap-y-5">
                        <div className="w-full h-fit flex gap-x-2">
                                <p className="md:text-2xl text-lg font-bold">
                                    Orders
                                </p>
                            </div>
                            <div className="overflow-x-auto shadow-md rounded-lg">
                                <table className="w-full text:sm sm:text-md text-left text-gray-900">
                                    <thead className="text-sm text-white uppercase bg-indigo-600">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Order ID
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                User
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Amount
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Manage
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders?.map((order, index) => (
                                            <tr
                                                className="bg-white border-b hover:bg-gray-100"
                                                key={index}
                                            >
                                                <td className="px-6 py-4">
                                                    {order._id}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {order.user?.email}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {order.orderStatus}
                                                </td>
                                                <td className="px-6 py-4">
                                                    ₹{order.price.totalPrice}
                                                </td>
                                                <td className="px-6 py-4 flex items-center justify-center">
                                                    <Link
                                                        to={`manage/${order._id}`}
                                                        className="font-lg text-indigo-600"
                                                    >
                                                        <ArrowIcon />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductList;