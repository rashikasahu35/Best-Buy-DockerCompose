import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { forgotPasswordAsync, CLEAR_FORGOT_PASSWORD } from "../redux/Auth/AuthSlice";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, message } = useSelector((state) => state.auth.forgotPassword);
    const [email, setEmail] = useState("");
    const [successResponse, setSucessResponse] = useState();

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(forgotPasswordAsync({ email }));
    };
    useEffect(() => {
        if (message) {
            setSucessResponse(message);
            dispatch(CLEAR_FORGOT_PASSWORD())
            setEmail("")
        }
    }, [message]);

    return (
        <>
            <div className="mt-[50px] flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Forgot Password
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        className="space-y-3"
                        onSubmit={submitHandler}
                        method="POST"
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    maxLength={40}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <input
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 cursor-pointer disabled:cursor-not-allowed"
                                value={loading? 'Processing...':'Submit'}
                                onSubmit={(e) => submitHandler(e)}
                                disabled={loading}
                            />
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Don't have an account?{" "}
                        <span
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
                            onClick={() => navigate("/register")}
                        >
                            Sign Up
                        </span>
                    </p>
                    <p className="mt-4 text-center text-xl text-indigo-600">
                        {successResponse}
                    </p>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
