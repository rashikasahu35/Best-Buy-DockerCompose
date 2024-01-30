import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    updateUserDetailsAsync,
    getUserDetailsAsync,
    CLEAR_GET_USER_DETAILS_ERROR,
} from "../redux/User/UserSlice";
import Spinner from "../components/Spinner";
import ShowError from "../utils/ShowError";

const EditProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, user } = useSelector((state) => state.user);
    const { error: getUserDetailsError } = useSelector(
        (state) => state.user.getUserDetails
    );
    const [inputData, setInputData] = useState({
        name: "",
        email: "",
        avatar: "",
    });

    const setInputDataHandler = (key, value) => {
        if (key === "avatar") {
            const file = value;
            const reader = new FileReader();
            reader.onloadend = () => {
                setInputData({ ...inputData, avatar: reader.result });
            };
            reader.readAsDataURL(file);
        } else {
            setInputData({ ...inputData, [key]: value });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(
            updateUserDetailsAsync({
                name: inputData.name,
                email: inputData.email,
                avatar: (!inputData.avatar.url && !inputData.avatar.public._id)? inputData.avatar:null,
            })
        );
    };

    useEffect(() => {
        dispatch(getUserDetailsAsync());
    }, []);

    useEffect(() => {
        if (user) {
            setInputData({
                name: user?.name || "",
                email: user?.email || "",
                avatar: user.avatar || "",
            });
        }

        if (getUserDetailsError) {
            ShowError(getUserDetailsError);
            dispatch(CLEAR_GET_USER_DETAILS_ERROR());
        }
    }, [user, getUserDetailsError]);

    return (
        <>
            {loading && <Spinner />}
            {!loading && (
                <div className=" bg-gray-100 flex items-center justify-center h-screen px-4">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                        <div className="flex items-center space-x-2 mb-6">
                            <h1 className="text-xl font-semibold">
                                Update Profile
                            </h1>
                        </div>
                        <form
                            id="updateProfileForm"
                            className="space-y-6"
                            onSubmit={submitHandler}
                        >
                            <div>
                                <label
                                    htmlFor="name"
                                    className="text-sm font-medium text-gray-700 block mb-2"
                                >
                                    Name
                                </label>
                                <div className="flex">
                                    <input
                                        type="name"
                                        id="name"
                                        value={inputData.name}
                                        onChange={(e) =>
                                            setInputDataHandler(
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        minLength={1}
                                        maxLength={30}
                                        className="form-input relative block w-full border border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="text-sm font-medium text-gray-700 block mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={inputData.email}
                                    onChange={(e) =>
                                        setInputDataHandler(
                                            "email",
                                            e.target.value
                                        )
                                    }
                                    maxLength={40}
                                    className="form-input block w-full border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="avatar"
                                    className="text-sm font-medium text-gray-700 block mb-2"
                                >
                                    Avatar
                                </label>
                                <div className="flex gap-4 items-center">
                                    {inputData.avatar && (
                                        <img
                                            src={
                                                inputData.avatar.url ||
                                                inputData.avatar
                                            }
                                            alt="avatar"
                                            className="h-12 w-14 rounded-full"
                                        />
                                    )}
                                    <input
                                        type="file"
                                        id="avatar"
                                        onChange={(e) =>
                                            setInputDataHandler(
                                                "avatar",
                                                e.target.files[0]
                                            )
                                        }
                                        className=""
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => navigate("/me")}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:border-indigo-600 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <input
                                    type="submit"
                                    value="Update"
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-600 cursor-pointer disabled:cursor-not-allowed"
                                    onSubmit={submitHandler}
                                    onClick={(e) => submitHandler(e)}
                                    disabled={loading}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditProfile;
