import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerAsync } from "../redux/Auth/AuthSlice";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth.register);
    const { userAuthenticated } = useSelector((state) => state.user);
    const [inputData, setInputData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [inputDataError, setInputDataError] = useState({
        name: null,
        email: null,
        password: null,
        confirmPassword: null,
    });
    
    const setInputDataHandler = (key, value) => {
            setInputData((prevState) => ({
                ...prevState,
                [key]: value,
            }));
        
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        let validation = formValidation({ inputData, setInputDataError});
        if (!validation) return;
        dispatch(registerAsync({ name : inputData.name, email : inputData.email, password : inputData.password,}));
    };

    useEffect(() => {
        if (userAuthenticated) {
            navigate("/");
        }
    }, [userAuthenticated]);

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-8 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create New Account
                    </h2>
                </div>

                <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        className="space-y-2"
                        onSubmit={submitHandler}
                        method="POST"
                        encType="multipart/form-data"
                    >
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="name"
                                required
                                value={inputData.name}
                                onChange={(e) => setInputDataHandler('name', e.target.value)}
                                maxLength={30}
                                placeholder="Rashika Sahu"
                                className="pl-2 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <div className="text-red-500 text-xs">
                                {inputDataError.name}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={inputData.email}
                                onChange={(e) => setInputDataHandler('email',e.target.value)}
                                maxLength={40}
                                placeholder="rashika@gmail.com"
                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <div className="text-red-500 text-xs">
                                {inputDataError.email}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={inputData.password}
                                onChange={(e) => setInputDataHandler('password', e.target.value)}
                                maxLength={15}
                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <div className="text-red-500 text-xs">
                                {inputDataError.password}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={inputData.confirmPassword}
                                onChange={(e) =>
                                    setInputDataHandler('confirmPassword', e.target.value)
                                }
                                maxLength={15}
                                className="pl-2 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <div className="text-red-500 text-xs">
                                {inputDataError.confirmPassword}
                            </div>
                        </div>
                        
                        <div>
                            <input
                                type="submit"
                                value={`${
                                    loading ? "Processing..." : "Sign Up"
                                }`}
                                className="mt-4 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 cursor-pointer disabled:cursor-not-allowed"
                                onSubmit={(e) => submitHandler(e)}
                                disabled={loading}
                            />
                        </div>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Already have an account account?{" "}
                        <Link
                            to="/login"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;



const formValidation = ({ inputData, setInputDataError }) => {
    let validation = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const setError = (key, condition, errorMessage) => {
        if (condition) {
            setInputDataError((prevState) => ({
                ...prevState,
                [key]: errorMessage,
            }));
            validation = false;
        } else {
            setInputDataError((prevState) => ({
                ...prevState,
                [key]: null,
            }));
        }
    };

    setError('email', !emailRegex.test(inputData.email), 'Please enter a valid email');
    setError('name', !isNaN(inputData.name), 'Name must contain only alphabets');
    setError('password', inputData.password?.length < 8, 'Password must contain 8 characters');
    setError('confirmPassword', inputData.password !== inputData.confirmPassword, 'Passwords do not match');

    return validation;
};

