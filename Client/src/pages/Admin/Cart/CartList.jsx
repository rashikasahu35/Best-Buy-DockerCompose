import React, { useState, useEffect } from "react";
import SideBar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../../components/Spinner";
import { FaLocationArrow as ArrowIcon } from "react-icons/fa6";
import { getAllCartAsync } from "../../../redux/Cart/CartSlice";

const CartList = () => {
    const dispatch = useDispatch();
    const { loading, carts } = useSelector((state) => state.cart.getAllCart);
    useEffect(() => {
        dispatch(getAllCartAsync());
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
                                    Cart
                                </p>
                            </div>
                            <div className="w-full overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text:sm sm:text-md text-left text-gray-900">
                                    <thead className="text-sm text-white uppercase bg-indigo-600">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Cart ID
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                User ID
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                No of Items
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Price
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
                                        {carts?.map((cart, index) => (
                                            <tr
                                                className="bg-white border-b hover:bg-gray-100"
                                                key={index}
                                            >
                                                <td className="px-6 py-4">
                                                    {cart._id}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {cart.user}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {cart.noOfItems}
                                                </td>
                                                <td className="px-6 py-4">
                                                    ₹{cart.subTotal}
                                                </td>
                                                <td className="px-6 py-4 flex items-center justify-center">
                                                    <Link
                                                        to={`manage/${cart._id}`}
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

export default CartList;
