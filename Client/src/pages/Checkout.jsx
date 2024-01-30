import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    SET_SHIPPING_DETAILS,
    SET_PAYMENT_METHOD,
} from "../redux/Order/OrderSummary";
import { useNavigate } from "react-router-dom";
import { createOrderAsync, CLEAR_ORDER_CREATE } from "../redux/Order/OrderSlice";

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cart } = useSelector((state) => state.cart);
    const { price } = useSelector(
        (state) => state.orderSummary
    );
    const { success, loading: createOrderLoading } = useSelector(
        (state) => state.order.createOrder
    );
    const [inputData, setInputData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        city: "",
        state: "Uttar Pradesh",
        country: "India",
        pincode: "",
        paymentMethod: "Card",
    });
    const [inputError, setInputError] = useState({
        name: null,
        email: null,
        phoneNumber: null,
        address: null,
        city: null,
        pincode: null,
    });

    const setInputDataHandler = (key, value) => {
        setInputData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault(); //
        const validation = formValidation({ inputData, setInputError });
        if (!validation) return;
        dispatch(
            SET_SHIPPING_DETAILS({
                name: inputData.name,
                email: inputData.email,
                phoneNumber: inputData.phoneNumber,
                address: inputData.address,
                city: inputData.city,
                state: inputData.state,
                country: inputData.country,
                pincode: inputData.pincode,
            })
        );
        dispatch(SET_PAYMENT_METHOD(inputData.paymentMethod));

        if (inputData.paymentMethod === "COD") {
            const paymentInfo = {
                id: "none",
                status: "Due",
                paymentMethod: "COD",
            };
            dispatch(
                createOrderAsync({
                    shippingDetails: {
                        name: inputData.name,
                        email: inputData.email,
                        phoneNumber: inputData.phoneNumber,
                        address: inputData.address,
                        city: inputData.city,
                        state: inputData.state,
                        country: inputData.country,
                        pincode: inputData.pincode,
                    },
                    paymentInfo,
                })
            );
            
        } else {
            navigate("/payment");
        }
    };

    useEffect(() => {
        if (!cart || !price) {
            navigate("/cart");
        }
    }, [cart]);

    useEffect(() => {
        if(success){
            navigate("/order/success");
            dispatch(CLEAR_ORDER_CREATE())
        }
    }, [success])

    return (
        <>
            {cart && (
                <div className="min-h-screen p-2 bg-gray-100 flex justify-center align-middle items-center">
                    <div className="mt-[60px] container w-full flex flex-col gap-y-4 md:flex-row md:gap-y-0 md:py-4 ">
                        <div className=" w-full h-fit bg-white rounded shadow-lg p-4 md:p-6 ">
                            <div className="">
                                <p className="text-xl md:text-3xl my-2 font-bold  text-gray-00">
                                    Checkout
                                </p>
                                <p>Please fill out all the fields.</p>
                            </div>

                            <div className="lg:col-span-2 mt-2">
                                <form
                                    className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"
                                    onSubmit={submitHandler}
                                >
                                    <div className="md:col-span-5">
                                        <label
                                            htmlFor="name"
                                            className="font-bold"
                                        >
                                            Full Name
                                        </label>
                                        <input
                                            type="name"
                                            name="name"
                                            id="name"
                                            maxLength={30}
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={inputData.name}
                                            onChange={(e) =>
                                                setInputDataHandler(
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Rashika Sahu"
                                            required
                                        />
                                        <p className="text-sm text-red-600">
                                            {inputError.name}
                                        </p>
                                    </div>
                                    <div className="md:col-span-5">
                                        <label
                                            htmlFor="email"
                                            className="font-bold"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            maxLength={40}
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={inputData.email}
                                            onChange={(e) =>
                                                setInputDataHandler(
                                                    "email",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="rashika@gmail.com"
                                            autoComplete="email"
                                            required
                                        />
                                        <p className="text-sm text-red-600">
                                            {inputError.email}
                                        </p>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label
                                            htmlFor="phoneNumber"
                                            className="font-bold"
                                        >
                                            Phone Number
                                        </label>
                                        <input
                                            type="number"
                                            name="phoneNumber"
                                            id="phoneNumber"
                                            maxLength={10}
                                            minLength={10}
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={inputData.phoneNumber}
                                            onChange={(e) =>
                                                setInputDataHandler(
                                                    "phoneNumber",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="0123456789"
                                            required
                                        />
                                        <p className="text-sm text-red-600">
                                            {inputError.phoneNumber}
                                        </p>
                                    </div>
                                    <div className="md:col-span-5">
                                        <label
                                            htmlFor="address"
                                            className="font-bold"
                                        >
                                            Address / Street
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            id="address"
                                            maxLength={50}
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={inputData.address}
                                            onChange={(e) =>
                                                setInputDataHandler(
                                                    "address",
                                                    e.target.value
                                                )
                                            }
                                            placeholder=""
                                            required
                                        />
                                        <p className="text-sm text-red-600">
                                            {inputError.address}
                                        </p>
                                    </div>

                                    <div className="md:col-span-4">
                                        <label
                                            htmlFor="city"
                                            className="font-bold"
                                        >
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            id="city"
                                            maxLength={20}
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={inputData.city}
                                            onChange={(e) =>
                                                setInputDataHandler(
                                                    "city",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Agra"
                                            required
                                        />
                                        <p className="text-sm text-red-600">
                                            {inputError.city}
                                        </p>
                                    </div>

                                    
                                    <div className="md:col-span-3">
                                        <label
                                            htmlFor="state"
                                            className="font-bold"
                                        >
                                            State
                                        </label>
                                        <div className="h-10 bg-gray-50 flex border rounded items-center mt-1 w-full">
                                            <select
                                                id="state"
                                                name="state"
                                                autoComplete="state-name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                onChange={(e) =>
                                                    setInputDataHandler(
                                                        "state",
                                                        e.target.value
                                                    )
                                                }
                                                value={inputData.state}
                                            >
                                                <option>Andhra Pradesh</option>
                                                <option>
                                                    Arunachal Pradesh
                                                </option>
                                                <option>Assam</option>
                                                <option>Bihar</option>
                                                <option>Chhattisgarh</option>
                                                <option>Goa</option>
                                                <option>Gujarat</option>
                                                <option>Haryana</option>
                                                <option>
                                                    Himachal Pradesh
                                                </option>
                                                <option>Jharkhand</option>
                                                <option>Karnataka</option>
                                                <option>Kerala</option>
                                                <option>Madhya Pradesh</option>
                                                <option>Maharashtra</option>
                                                <option>Manipur</option>
                                                <option>Meghalaya</option>
                                                <option>Mizoram</option>
                                                <option>Nagaland</option>
                                                <option>Odisha</option>
                                                <option>Punjab</option>
                                                <option>Rajasthan</option>
                                                <option>Sikkim</option>
                                                <option>Tamil Nadu</option>
                                                <option>Telangana</option>
                                                <option>Tripura</option>
                                                <option>Uttarakhand</option>
                                                <option>Uttar Pradesh</option>
                                                <option>West Bengal</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label
                                            htmlFor="country"
                                            className="font-bold"
                                        >
                                            Country
                                        </label>
                                        <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1 w-full">
                                            <select
                                                id="country"
                                                name="country"
                                                autoComplete="country-name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                value={inputData.country}
                                                onChange={(e) =>
                                                    setInputDataHandler(
                                                        "country",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option>India</option>
                                            </select>
                                        </div>
                                    </div>


                                    <div className="md:col-span-3">
                                        <label
                                            htmlFor="pincode"
                                            className="font-bold"
                                        >
                                            Pincode
                                        </label>
                                        <input
                                            type="number"
                                            name="pincode"
                                            id="pincode"
                                            maxLength={6}
                                            minLength={6}
                                            className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder="123456"
                                            value={inputData.pincode}
                                            onChange={(e) =>
                                                setInputDataHandler(
                                                    "pincode",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                        <p className="text-sm text-red-600">
                                            {inputError.pincode}
                                        </p>
                                    </div>

                                    <div className="md:col-span-3">
                                        <label
                                            htmlFor="paymentMethod"
                                            className="font-bold"
                                        >
                                            Payment Method
                                        </label>
                                        <select
                                            id="paymentMethod"
                                            name="paymentMethod"
                                            className="block w-full rounded-md border-0  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            onChange={(e) =>
                                                setInputDataHandler(
                                                    "paymentMethod",
                                                    e.target.value
                                                )
                                            }
                                            value={inputData.paymentMethod}
                                        >
                                            <option value="COD">
                                                Cash on Delivery (COD)
                                            </option>
                                            <option>Card</option>
                                        </select>
                                    </div>

                                    <div className="md:col-span-6 text-right mt-4">
                                        <div className="inline-flex items-end rounded text-center">
                                            <input
                                                type="submit"
                                                onSubmit={(e) =>
                                                    submitHandler(e)
                                                }
                                                disabled={createOrderLoading}
                                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-8 rounded cursor-pointer w-fit text-center disabled:cursor-not-allowed"
                                                value={`${createOrderLoading? "Processing...":"Order Now"}`}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="md:w-3/5 lg:w-2/5 w-full h-fit rounded shadow-lg p-4 md:p-6 text-gray-900 bg-white md:ml-6 ">
                            <div className=" ">
                                <h1 className="text-xl md:text-3xl my-2 font-bold">
                                    Order Summary
                                </h1>
                                <div className="w-full">
                                    {cart?.products?.map((product, index) => (
                                        <div
                                            key={index}
                                            className="flex py-2 border-b border-gray-300"
                                        >
                                            <div className="w-full p-2 flex justify-between ">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className=" h-16 w-16 md:h-24 md:w-24 rounded object-cover "
                                                />
                                                <div className="font-semibold h-full flex flex-col items-center">
                                                    <p>₹{product.price}</p>
                                                    <p>
                                                        Qty : {product.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {price && (
                                <div className="p-2 py-4 sm:px-2 flex flex-col gap-y-1  text-base font-medium ">
                                    <div className="flex justify-between">
                                        <p>Items Price</p>
                                        <p>₹{price?.itemPrice}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Tax </p>
                                        <p>₹{price?.taxPrice}</p>
                                    </div>
                                    <div className="flex justify-between pb-1">
                                        <p>Shipping Charges</p>
                                        <p>₹{price?.shippingPrice}</p>
                                    </div>
                                    <div className="pt-1 border-t border-gray-300 flex justify-between font-bold">
                                        <p>Total Amount</p>
                                        <p>₹{price?.totalPrice}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Checkout;

const formValidation = ({ inputData, setInputError }) => {
    let validation = true;
    if (inputData.phoneNumber.length !== 10) {
        setInputError((prevInputError) => ({
            ...prevInputError,
            phoneNumber: "Phone Number must have 10 digits",
        }));
        validation = false;
    } else {
        setInputError((prevInputError) => ({
            ...prevInputError,
            phoneNumber: null,
        }));
    }
    if (inputData.pincode.length !== 6) {
        setInputError((prevInputError) => ({
            ...prevInputError,
            pincode: "Pincode must have 6 digits",
        }));
        validation = false;
    } else {
        setInputError((prevInputError) => ({
            ...prevInputError,
            pincode: null,
        }));
    }
    return validation;
};
