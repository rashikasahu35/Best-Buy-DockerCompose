import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createOrderAsync, CLEAR_ORDER_CREATE } from "../redux/Order/OrderSlice";
import axios from "axios";
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_API_KEY);

const PaymentForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const elements = useElements();
    const stripe = useStripe();
    const [paymentLoading, setPaymentLoading] = useState(false);
    const { user } = useSelector((state) => state.user);
    const {loading : createOrderLoading, success} = useSelector((state) => state.order.createOrder)
    const { shippingDetails, price, paymentMethod } = useSelector(
        (state) => state.orderSummary
    );
    const { cart } = useSelector((state) => state.cart);
    const paymentElementOptions = {
        layout: "tabs",
    };

    useEffect(() => {
        if (!cart || !price) {
            toast.error("Please add items in cart to proceed");
            navigate("/cart");
        } else if (!shippingDetails) {
            toast.error("Please fill the shipping details to proceed");
            navigate("/shippingDetails");
        }
        if (!user) {
            toast.error("User details not present");
            navigate("/");
        }
    }, [cart, shippingDetails, user]);

    useEffect(() => {
        if(success){
            setPaymentLoading(false);
            navigate("/order/success");
            dispatch(CLEAR_ORDER_CREATE())
        }
    }, [success])

    const submitHandler = async (e) => {
        try {
            e.preventDefault();
            if (!stripe || !elements) {
                console.log("stripe or element not initialzed");
                return;
            }
            setPaymentLoading(true)

            const { paymentIntent, error } = await stripe.confirmPayment({
                elements,
                confirmParams: { return_url: window.location.origin },
                redirect: "if_required",
            });
            
            if (error) {
                setPaymentLoading(false)
                return toast.error(error.message || "Something Went Wrong");
            } else if (paymentIntent.status === "succeeded") {
                toast.success("Payment success, creating you order...")
                const paymentInfo = {
                    id: paymentIntent.id,
                    status: paymentIntent.status,
                    paymentMethod : paymentMethod
                };
                dispatch(createOrderAsync({ shippingDetails, paymentInfo }));
                
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message);
        }
    };
    return (
        <>
            <div className="mt-[70px] flex items-center justify-center flex-col  min-h-full flex-1 px-8 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Payment
                    </h2>
                </div>

                <form
                    className="flex flex-col gap-y-4 border-[1px] border-slate-200 p-6 rounded shadow-lg mt-6 sm:mx-auto sm:w-full sm:max-w-sm"
                    onSubmit={submitHandler}
                >
                    <PaymentElement
                        id="payment-element"
                        options={paymentElementOptions}
                    />
                    <button
                        disabled={paymentLoading}
                        id="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 rounded text-white p-2 cursor-pointer disabled:cursor-not-allowed"
                    >
                        {paymentLoading
                            ? "Processing..."
                            : `Pay ₹${price?.totalPrice}`}{" "}
                    </button>
                </form>
            </div>
        </>
    );
};

const Payment = () => {
    const [clientSecret, setClientSecret] = useState(null);
    const { price, shippingDetails } = useSelector((state) => state.orderSummary);

    const getPaymentIntent = async () => {
        try {
            if (!price) return;
            const paymentData = {
                amount: price.totalPrice,
                shippingDetails
            };
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            };
            const { data } = await axios.post(
                `${import.meta.env.VITE_APP_SERVER_URL}/payment`,
                paymentData,
                config
            );
            const client_secret = data.client_secret;
            setClientSecret(client_secret);
        } catch (error) {
            toast.error(error.response?.data?.message || error.essage);
            console.log(error);
        }
    };

    useEffect(() => {
        getPaymentIntent();
    }, []);
    return (
        <>
            {clientSecret && (
                <Elements
                    options={{
                        clientSecret,
                    }}
                    stripe={stripePromise}
                >
                    <PaymentForm />
                </Elements>
            )}
        </>
    );
};

export default Payment;
