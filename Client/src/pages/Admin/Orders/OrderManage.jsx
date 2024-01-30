import React, { useEffect, useState } from "react";
import SideBar from "../components/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    getOrderAsync,
    deleteOrderAsync,
    CLEAR_ORDER_DELETE,
    updateOrderStatusAsync,
} from "../../../redux/Order/OrderSlice";
import Spinner from "../../../components/Spinner";
import { Link } from "react-router-dom";
import { FaLocationArrow as ArrowIcon } from "react-icons/fa6";

const ProductList = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, order } = useSelector((state) => state.order.getOrder);
    const { loading: updateOrderStatusLoading } = useSelector(
        (state) => state.order.updateOrderStatus
    );
    const { loading: deleteOrderLoading, success: deleteOrderSuccess } =
        useSelector((state) => state.order.deleteOrder);
    const [orderStatus, setOrderStatus] = useState("");

    useEffect(() => {
        dispatch(getOrderAsync(id));
    }, []);
    useEffect(() => {
        if (order) {
            setOrderStatus(() => {
                if (order.orderStatus === "Processing") return "Shipped";
                else return "Delivered";
            });
        }
        if (deleteOrderSuccess) {
            dispatch(CLEAR_ORDER_DELETE());
            navigate("/admin/orders");
        }
    }, [order, deleteOrderSuccess]);

    const updateOrderStatusHandler = async () => {
        dispatch(updateOrderStatusAsync({ id, orderStatus }));
    };
    const deleteOrderHandler = async () => {
        dispatch(deleteOrderAsync(id));
    };

    return (
        <>
            {loading && <Spinner />}
            {order && (
                <div className="min-h-screen bg-white">
                    <div className="mt-[60px] text-gray-900 flex flex-wrap gap-x-1">
                        <SideBar />
                        <div className="w-full p-2 sm:ml-60 mt-10 sm:mt-0 ">
                            <div className="w-full">

                                {/* form */}
                                <div className="w-full flex items-center justify-center">
                                    <div className="w-full flex flex-col  items-center justify-center align-middle gap-y-2 h-fit bg-gray-100 shadow-lg rounded p-4">
                                        <div className="font-bold w-full text-lg sm:text-xl md:text-2xl text-center">
                                            Manage Order
                                        </div>
                                        <div>
                                            <form
                                                className="space-y-2"
                                                method="POST"
                                            >
                                                <div>
                                                    <label
                                                        htmlFor="orderStatus"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        Order Status
                                                    </label>
                                                    <div className="h-10 flex rounded items-center mt-1 w-full">
                                                        <select
                                                            id="orderStatus"
                                                            name="orderStatus"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                            value={orderStatus}
                                                            onChange={(e) =>
                                                                setOrderStatus(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            {order.orderStatus ===
                                                                "Processing" && (
                                                                <option>
                                                                    Shipped
                                                                </option>
                                                            )}
                                                            {order.orderStatus ===
                                                                "Shipped" && (
                                                                <option>
                                                                    Delivered
                                                                </option>
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="flex justify-around gap-x-2">
                                                    <input
                                                        type="submit"
                                                        value={`${
                                                            updateOrderStatusLoading
                                                                ? "Updating..."
                                                                : "Update Status"
                                                        }`}
                                                        className="mt-4 flex w-full justify-center rounded-md bg-indigo-600 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 cursor-pointer disabled:cursor-not-allowed"
                                                        onClick={(e) =>
                                                            updateOrderStatusHandler(
                                                                e
                                                            )
                                                        }
                                                        disabled={
                                                            updateOrderStatusLoading ||
                                                            order?.orderStatus ===
                                                                "Delivered"
                                                        }
                                                    />
                                                    <input
                                                        type="submit"
                                                        value={`${
                                                            deleteOrderLoading
                                                                ? "Deleting..."
                                                                : "Delete Order"
                                                        }`}
                                                        className="mt-4 flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed"
                                                        onClick={(e) =>
                                                            deleteOrderHandler(
                                                                e
                                                            )
                                                        }
                                                        disabled={
                                                            deleteOrderLoading
                                                        }
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                {/* order details */}
                                <div className="w-full md:p-4 text-gray-800">
                                    {/* title */}
                                    <div className="flex justify-start item-start space-y-2 flex-col ">
                                        <h1 className="text-xl md:text-2xl font-semibold ">
                                            Order ID {order._id}
                                        </h1>
                                        <h1 className="text-xl md:text-xl font-semibold ">
                                            User : {order.user?.name}, {order.user?.email}
                                        </h1>
                                        <p className="text-base">
                                            Order Placed at{" "}
                                            {parseTimestamp(order.createdOn)}
                                        </p>
                                        {order.orderStatus === "Delivered" && <p className="text-base">
                                            Order Delivered at{" "}
                                            {parseTimestamp(order.deliveredAt)}
                                        </p>}
                                    </div>

                                    {/* order status */}
                                    <div className="my-8 w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                        <div
                                            className="bg-indigo-600 text-xs md:text-base p-0.5 font-medium text-white text-center  leading-none rounded-full"
                                            style={{
                                                width: `${
                                                    order.orderStatus ===
                                                    "Delivered"
                                                        ? "100%"
                                                        : order.orderStatus ===
                                                          "Shipped"
                                                        ? "60%"
                                                        : "30%"
                                                }`,
                                            }}
                                        >
                                            {" "}
                                            {order.orderStatus}
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-start items-start w-full space-y-3 mt-4 rounded">
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
                                                        Name
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
                                                {order.orderedItems.map(
                                                    (product, index) => (
                                                        <tr
                                                            className="bg-white border-b-[2px] border-slate-300 text-gray-600  hover:bg-slate-100 font-medium whitespace-nowrap"
                                                            key={index}
                                                        >
                                                            <td className="px-1 sm:px-6 py-4">
                                                                <img
                                                                    src={
                                                                        product.image
                                                                    }
                                                                    className="h-20 w-20 object-cover rounded"
                                                                />
                                                            </td>
                                                            <td className="px-2 sm:px-6 py-4">
                                                                {product.name}
                                                            </td>
                                                            <td className="px-2 sm:px-6 py-4">
                                                                {
                                                                    product.quantity
                                                                }
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

                                        {/* Payment Method */}
                                        <div className="flex items-center justify-center w-full rounded p-3 md:p-6 bg-slate-200">
                                            <div className="w-full flex flex-col gap-y-3 text-base sm:text-lg md:text-xl font-bold text-center md:text-left text-gray-800">
                                                <div className="w-full flex justify-between gap-x-2 ">
                                                    <p>Payment Method</p>
                                                    <p>
                                                        {
                                                            order.paymentInfo
                                                                ?.paymentMethod
                                                        }
                                                    </p>
                                                </div>
                                                <div className="w-full flex justify-between gap-x-2 ">
                                                    <p>Status </p>
                                                    <p>
                                                        {
                                                            order.paymentInfo
                                                                ?.status
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Price Summary */}
                                        <div className="w-full bg-slate-200 flex flex-col items-center justify-center  p-2 md:p-4 rounded">
                                            <h3 className="text-center text-base sm:text-xl font-bold leading-5 text-gray-800 ">
                                                Summary
                                            </h3>
                                            <div className="flex justify-center items-center gap-1 w-full  flex-col border-b text-gray-800 text-xs sm:text-base">
                                                <div className="flex justify-between w-full">
                                                    <p className="">
                                                        Item Price
                                                    </p>
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
                                                    <p className="">
                                                        Shipping Charge
                                                    </p>
                                                    <p className="">
                                                        {
                                                            order.price
                                                                .shippingPrice
                                                        }
                                                    </p>
                                                </div>

                                                <div className=" border-t-[2px] border-slate-300 flex justify-between items-center w-full text-sm sm:text-lg font-bold text-gray-800">
                                                    <p className="">Total</p>
                                                    <p className="">
                                                        ₹
                                                        {order.price.totalPrice}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Shipping Info */}
                                        <div className="flex flex-col p-4 md:p-6 xl:p-8 w-full bg-slate-200 rounded">
                                            <p className="text-base sm:text-xl font-bold text-center md:text-left text-gray-800 pb-2">
                                                Shipping Details
                                            </p>
                                            <p className="w-full flex justify-between flex-wrap text-xs sm:text-base">
                                                <span className="font-semibold ">
                                                    Name :{" "}
                                                </span>
                                                {order.shippingDetails.name}
                                            </p>
                                            <p className="w-full flex justify-between flex-wrap text-xs sm:text-base">
                                                <span className="font-semibold ">
                                                    Email :{" "}
                                                </span>
                                                {order.shippingDetails.email}
                                            </p>
                                            <p className="w-full flex justify-between flex-wrap text-xs sm:text-base">
                                                <span className="font-semibold ">
                                                    Phone No :{" "}
                                                </span>
                                                {
                                                    order.shippingDetails
                                                        .phoneNumber
                                                }
                                            </p>
                                            <p className="w-full flex justify-between flex-wrap text-xs sm:text-base">
                                                <span className="font-semibold ">
                                                    Address :{" "}
                                                </span>
                                                {order.shippingDetails.address}
                                            </p>
                                            <p className="w-full flex justify-between flex-wrap text-xs sm:text-base">
                                                <span className="font-semibold ">
                                                    City :{" "}
                                                </span>
                                                {order.shippingDetails.city}
                                            </p>
                                            <p className="w-full flex justify-between flex-wrap text-xs sm:text-base">
                                                <span className="font-semibold ">
                                                    State :{" "}
                                                </span>
                                                {order.shippingDetails.state}
                                            </p>
                                            <p className="w-full flex justify-between flex-wrap text-xs sm:text-base">
                                                <span className="font-semibold ">
                                                    Country :{" "}
                                                </span>
                                                {order.shippingDetails.country}
                                            </p>
                                            <p className="w-full flex justify-between flex-wrap text-xs sm:text-base">
                                                <span className="font-semibold ">
                                                    PinCode :{" "}
                                                </span>
                                                {order.shippingDetails.pincode}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductList;

function parseTimestamp(timestamp) {
    if (timestamp) {
        const date = new Date(timestamp);
        const options = { day: "2-digit", month: "short", year: "numeric" };
        const formattedDate = date.toLocaleDateString("en-GB", options);
        return formattedDate;
    }
}

// w-full flex flex-row gap-y-2 md:gap-y-0 md:flex-col md:gap-x-2 bg-red-100
