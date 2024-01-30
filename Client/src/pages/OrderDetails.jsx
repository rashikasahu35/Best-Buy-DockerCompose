import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaLocationArrow as ArrowIcon } from "react-icons/fa6";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetailsAsync } from "../redux/Order/OrderSlice";
import ParseTimestamp from "../utils/ParseTimestamp";

const OrderDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { loading, order } = useSelector(
        (state) => state.order.getOrderDetails
    );

    useEffect(() => {
        dispatch(getOrderDetailsAsync(id));
    }, []);

    return (
        <>
            {loading && <Spinner />}
            {order && (
                <div className="mt-[90px] px-2 md:px-6 text-gray-800">
                    <div className="flex justify-start item-start space-y-2 flex-col">
                        <h1 className="text-xl md:text-2xl font-semibold ">
                            Order ID {order._id}
                        </h1>
                        <p className="text-base">
                            Order Placed at {ParseTimestamp(order.createdOn)}
                        </p>

                        {order.orderStatus === "Delivered" && (
                            <p className="text-base">
                                Order Delivered at{" "}
                                {ParseTimestamp(order.deliveredAt)}
                            </p>
                        )}
                    </div>

                    <div className="my-8 w-full bg-gray-200 rounded-full dark:bg-gray-700">
                        <div
                            className="bg-indigo-600 text-xs md:text-base p-0.5 font-medium text-white text-center  leading-none rounded-full"
                            style={{
                                width: `${
                                    order.orderStatus === "Delivered"
                                        ? "100%"
                                        : order.orderStatus === "Shipped"
                                        ? "60%"
                                        : "30%"
                                }`,
                            }}
                        >
                            {" "}
                            {order.orderStatus}
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col xl:flex-row jusitfy-center items-stretch w-full space-y-4 sm:space-x-2 md:space-x-0 md:space-y-3 lg:space-x-3 lg:space-y-1  rounded overflow-x-scroll">
                        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-4">
                            {/* Products */}
                            <table className="w-full text-[10px] sm:text-xs md:text-base text-left rtl:text-right rounded">
                                <thead className=" text-white bg-indigo-600 rounded">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-2 sm:px-6 py-3"
                                        >
                                            Product
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 sm:px-6 py-3"
                                        >
                                            Items Qty
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 sm:px-6 py-3"
                                        >
                                            Price
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 sm:px-6 py-3"
                                        >
                                            View Product
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.orderedItems?.map(
                                        (product, index) => (
                                            <tr
                                                className="bg-white border-b-[2px] border-slate-300 text-gray-600  hover:bg-slate-100 font-medium whitespace-nowrap"
                                                key={index}
                                            >
                                                <td className="px-2 sm:px-6 py-4 flex gap-2 items-center">
                                                    <img
                                                        src={product.image}
                                                        className="h-20 w-20 object-cover rounded"
                                                    />
                                                    {product.name}
                                                </td>
                                                <td className="px-2 sm:px-6 py-4">
                                                    {product.quantity}
                                                </td>
                                                <td className="px-2 sm:px-6 py-4">
                                                    {product.price}
                                                </td>
                                                <td className="px-2 sm:px-6 py-4 text-center">
                                                    <Link
                                                        to={`/product/${product.product}`}
                                                        className="text-base sm:text-lg md:text-xl text-indigo-600 hover:text-indigo-700 hover:underline"
                                                    >
                                                        <ArrowIcon />
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>

                            {/* Pyament Info */}
                            <div className="flex items-center justify-center w-full rounded p-3 md:p-6 bg-slate-200">
                                <div className="w-full flex flex-col gap-y-3 text-base sm:text-xl font-bold text-center md:text-left text-gray-800">
                                    <div className="w-full flex justify-between gap-x-2 ">
                                        <p>Payment Method</p>
                                        <p>
                                            {order.paymentInfo?.paymentMethod}
                                        </p>
                                    </div>
                                    <div className="w-full flex justify-between gap-x-2 ">
                                        <p>Status </p>
                                        <p>{order.paymentInfo?.status}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Details */}
                            <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 rounded">
                                <div className="flex flex-col p-4 md:p-6 xl:p-8 w-full bg-slate-200 rounded">
                                    <p className="text-base sm:text-xl font-bold text-center md:text-left text-gray-800 pb-2">
                                        Shipping Details
                                    </p>
                                    <p className="w-full flex justify-between flex-wrap text-xs sm:text-base">
                                        <span className="font-semibold ">
                                            Name :{" "}
                                        </span>
                                        {order.shippingDetails?.name}
                                    </p>
                                    <p className="w-full flex justify-between flex-wrap text-xs sm:text-base">
                                        <span className="font-semibold ">
                                            Email :{" "}
                                        </span>
                                        {order.shippingDetails?.email}
                                    </p>
                                    <p className="w-full flex justify-between flex-wrap text-xs sm:text-base">
                                        <span className="font-semibold ">
                                            Phone No :{" "}
                                        </span>
                                        {order.shippingDetails?.phoneNumber}
                                    </p>
                                    <p className="w-full flex justify-between flex-wrap text-xs sm:text-base">
                                        <span className="font-semibold ">
                                            Address :{" "}
                                        </span>
                                        {order.shippingDetails?.address}
                                    </p>
                                    <p className="w-full flex justify-between flex-wrap text-xs sm:text-base">
                                        <span className="font-semibold ">
                                            City :{" "}
                                        </span>
                                        {order.shippingDetails?.city}
                                    </p>
                                    <p className="w-full flex justify-between flex-wrap text-xs sm:text-base">
                                        <span className="font-semibold ">
                                            State :{" "}
                                        </span>
                                        {order.shippingDetails?.state}
                                    </p>
                                    <p className="w-full flex justify-between flex-wrap text-xs sm:text-base">
                                        <span className="font-semibold ">
                                            Country :{" "}
                                        </span>
                                        {order.shippingDetails?.country}
                                    </p>
                                    <p className="w-full flex justify-between flex-wrap text-xs sm:text-base">
                                        <span className="font-semibold ">
                                            PinCode :{" "}
                                        </span>
                                        {order.shippingDetails?.pincode}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Price Summary */}
                        <div className=" bg-slate-200 text-red w-full xl:w-96 flex justify-between items-center md:items-start  p-2 sm:p-6   flex-col rounded h-fit">
                            <div className="w-full">
                                <h3 className="text-center text-base sm:text-xl font-bold leading-5 text-gray-800 ">
                                    Summary
                                </h3>
                                <div className="flex justify-center items-center gap-1 w-full  flex-col border-b pb-4 text-gray-800 text-xs sm:text-base">
                                    <div className="flex justify-between w-full">
                                        <p className="">Item Price</p>
                                        <p className="">
                                            {order.price.itemPrice}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center w-full">
                                        <p className="">Tax</p>
                                        <p className="">
                                            {order.price.taxPrice}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center w-full">
                                        <p className="">Shipping Charge</p>
                                        <p className="">
                                            {order.price.shippingPrice}
                                        </p>
                                    </div>
                                </div>
                                <div className=" border-t-[2px] border-slate-300 flex justify-between items-center w-full text-sm sm:text-lg font-bold text-gray-800">
                                    <p className="">Total</p>
                                    <p className="">
                                        ₹{order.price.totalPrice}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default OrderDetails;
