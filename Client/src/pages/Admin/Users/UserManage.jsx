import React, { useEffect, useState } from "react";
import SideBar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
    getUserAsync,
    updateUserAsync,
    deleteUserAsync,
    CLEAR_USER_DELETE,
} from "../../../redux/User/UserSlice";
import Spinner from "../../../components/Spinner";

const UserCreate = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { loading: getUserLoading, user } = useSelector(
        (state) => state.user.getUser
    );
    const { loading: updateUserLoading } = useSelector(
        (state) => state.user.updateUser
    );
    const { loading: deleteUserLoading, success: deleteUserSuccess } =
        useSelector((state) => state.user.deleteUser);

    const [inputData, setInputData] = useState({
        name: "",
        email: "",
        role: "",
        avatar: "",
    });
    const [inputDataError, setInputDataError] = useState({
        name: null,
        email: null,
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

    const updateHandler = async (e) => {
        e.preventDefault();
        const validation = formValidation({ inputData, setInputDataError });
        if (!validation) return;
        dispatch(
            updateUserAsync({
                id,
                name: inputData.name,
                email: inputData.email,
                role: inputData.role,
                avatar: inputData.avatar,
            })
        );
    };
    const deleteHandler = async (e) => {
        e.preventDefault();
        dispatch(deleteUserAsync(id));
    };

    useEffect(() => {
        dispatch(getUserAsync(id));
    }, []);

    useEffect(() => {
        if(user){
            setInputData({
                name: user?.name || "",
                email: user?.email || "",
                role: user?.role || "",
                avatar: user?.avatar || "",
            });
        }
        if (deleteUserSuccess) {
            dispatch(CLEAR_USER_DELETE())
            setInputData({
                name: "",
                email: "",
                role: "",
                avatar: "",
            })
            navigate("/admin/users");
          }
    }, [user, deleteUserSuccess]);
    

    return (
        <>
            {getUserLoading && <Spinner />}
            {!getUserLoading && (
                <div className="min-h-screen bg-gray-100 overflow-x-scroll">
                    <div className="mt-[60px] text-gray-900 flex flex-wrap gap-x-1">
                        <SideBar />
                        <div className="w-full min-h-screen  p-4 sm:ml-60 mt-2 sm:mt-0 flex justify-center">
                            <div className="w-full h-fit md:w-4/5 lg:w-3/5 flex flex-col gap-y-2 bg-white rounded shadow-lg p-4 md:px-8">
                                <div className="font-bold w-full text-lg sm:text-xl md:text-2xl text-center">
                                    Manage User
                                </div>

                                <form
                                    className="space-y-2"
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
                                                <option value="user">
                                                    User
                                                </option>
                                                <option value="admin">
                                                    Admin
                                                </option>
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
                                                    src={
                                                        inputData.avatar?.url ||
                                                        inputData.avatar ||
                                                        ""
                                                    }
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
                                            />
                                        </div>
                                        <div className="text-red-500 text-xs">
                                            {inputDataError.avatar}
                                        </div>
                                    </div>
                                    <div className="flex justify-around gap-x-2">
                                        <input
                                            type="submit"
                                            value={`${
                                                updateUserLoading
                                                    ? "Updating..."
                                                    : "Update"
                                            }`}
                                            className="mt-4 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 cursor-pointer disabled:cursor-not-allowed"
                                            onClick={(e) => updateHandler(e)}
                                            disabled={updateUserLoading}
                                        />
                                        <input
                                            type="submit"
                                            value={`${
                                                deleteUserLoading
                                                    ? "Deleting..."
                                                    : "Delete"
                                            }`}
                                            className="mt-4 flex w-full justify-center rounded-md bg-gray-200 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-400 cursor-pointer disabled:cursor-not-allowed"
                                            onClick={(e) => deleteHandler(e)}
                                            disabled={deleteUserLoading}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
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

    return validation;
};
