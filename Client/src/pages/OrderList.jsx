import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow as ArrowIcon } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { getOrderListAsync } from "../redux/Order/OrderSlice";

const OrderList = () => {
    const dispatch = useDispatch();
    const { loading, orders } = useSelector(
        (state) => state.order.getOrderList
    );

    useEffect(() => {
        dispatch(getOrderListAsync());
    }, []);

    return (
        <>
            {loading && <Spinner />}
            <div className="w-full p-4 mt-[60px] flex flex-col gap-y-4 text-gray-900 ">
                <div className="overflow-x-auto shadow-md rounded-lg flex flex-col gap-y-4">
                    <div className="w-full text-xl sm:text-3xl font-bold">Orders </div>
                    <table className="w-full text:sm sm:text-md text-left">
                        <thead className="text-sm text-white uppercase bg-indigo-600">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Order ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Items Qty
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Amount
                                </th>
                                <th scope="col" className="px-6 py-3">
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
                                    <td className="px-6 py-4">{order._id}</td>
                                    <td className="px-6 py-4 text-indigo-600">
                                        {order.orderStatus}
                                    </td>
                                    <td className="px-6 py-4">
                                        {order.noOfItems}
                                    </td>
                                    <td className="px-6 py-4">
                                        ₹{order.price.totalPrice}
                                    </td>
                                    <td className="px-6 py-4 flex items-center justify-start">
                                        <Link
                                            to={`/order/${order._id}`}
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
        </>
    );
};

export default OrderList;