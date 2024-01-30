import React, { useEffect, useState } from "react";
import SideBar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
    createUserAsync,
    CLEAR_USER_CREATE,
} from "../../../redux/User/UserSlice";

const UserCreate = () => {
    const dispatch = useDispatch();
    const { loading, success } = useSelector((state) => state.user.createUser);
    const [inputData, setInputData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user",
        avatar: "",
    });
    const [inputDataError, setInputDataError] = useState({
        name: null,
        email: null,
        password: null,
        confirmPassword: null,
        role: null,
        avatar: null,
    });

    const setInputDataHandler = (key, value) => {
        if (key === "avatar") {
            const file = value;
            const reader = new FileReader();
            reader.onloadend = () => {
                setInputData((prevState) => ({
                    ...prevState,
                    avatar: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        } else {
            setInputData((prevState) => ({
                ...prevState,
                [key]: value,
            }));
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const validation = formValidation({ inputData, setInputDataError });
        if (!validation) return;
        dispatch(
            createUserAsync({
                name: inputData.name,
                email: inputData.email,
                password: inputData.password,
                role: inputData.role,
                avatar: inputData.avatar,
            })
        );
    };

    useEffect(() => {
        if (success) {
            setInputData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                role: "user",
                avatar: "",
            });
            dispatch(CLEAR_USER_CREATE());
        }
    }, [success]);

    return (
        <>
            <div className="min-h-screen bg-gray-100 overflow-x-scroll">
                <div className="mt-[60px] text-gray-900 flex flex-wrap gap-x-1">
                    <SideBar />
                    <div className="w-full p-4 sm:ml-60 mt-2 sm:mt-0 flex items-center justify-center">
                        <div className="w-full md:w-4/5 lg:w-3/5 flex flex-col gap-y-2 bg-white rounded shadow-lg p-4 md:px-8">
                            <div className="font-bold w-full text-lg sm:text-xl md:text-2xl text-center">
                                Create User
                            </div>

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
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="name"
                                        required
                                        value={inputData.name}
                                        onChange={(e) =>
                                            setInputDataHandler(
                                                "name",
                                                e.target.value
                                            )
                                        }
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
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        value={inputData.email}
                                        onChange={(e) =>
                                            setInputDataHandler(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                        rows={3}
                                        maxLength={250}
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
                                        onChange={(e) =>
                                            setInputDataHandler(
                                                "password",
                                                e.target.value
                                            )
                                        }
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
                                            setInputDataHandler(
                                                "confirmPassword",
                                                e.target.value
                                            )
                                        }
                                        maxLength={15}
                                        className="pl-2 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    <div className="text-red-500 text-xs">
                                        {inputDataError.confirmPassword}
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="role"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Role
                                    </label>
                                    <div className="h-10 flex rounded items-center mt-1 w-full">
                                        <select
                                            id="role"
                                            name="role"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            value={inputData.role}
                                            onChange={(e) =>
                                                setInputDataHandler(
                                                    "role",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>

                                    <div className="text-red-500 text-xs">
                                        {inputDataError.role}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-y-1">
                                    <label
                                        htmlFor="avatar"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Avatar
                                    </label>

                                    <div className="flex gap-2 items-center">
                                        {inputData.avatar && (
                                            <img
                                                src={inputData.avatar}
                                                className="h-14 w-14 rounded-full"
                                            />
                                        )}
                                        <input
                                            id="avatar"
                                            name="avatar"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                setInputDataHandler(
                                                    "avatar",
                                                    e.target.files[0]
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="text-red-500 text-xs">
                                        {inputDataError.avatar}
                                    </div>
                                </div>

                                <div>
                                    <input
                                        type="submit"
                                        value={`${
                                            loading ? "Creating..." : "Create"
                                        }`}
                                        className="mt-4 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 cursor-pointer disabled:cursor-not-allowed"
                                        onSubmit={submitHandler}
                                        disabled={loading}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserCreate;

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

    setError(
        "email",
        !emailRegex.test(inputData.email),
        "Please enter a valid email"
    );
    setError(
        "name",
        !isNaN(inputData.name),
        "Name must contain only alphabets"
    );
    setError(
        "password",
        inputData.password?.length < 8,
        "Password must contain 8 characters"
    );
    setError(
        "confirmPassword",
        inputData.password !== inputData.confirmPassword,
        "Passwords do not match"
    );

    return validation;
};
