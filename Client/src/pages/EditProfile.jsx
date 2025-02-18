import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    updateUserDetailsAsync,
    CLEAR_GET_USER_DETAILS_ERROR,
    CLEAR_USER_ERROR, 
    CLEAR_USER_MESSAGE
} from "../redux/User/UserSlice";
import Spinner from "../components/Spinner";
import ShowError from "../utils/ShowError";
import ShowSuccessResponse from "../utils/ShowSuccessResponse";



const EditProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, user, message, error } = useSelector((state) => state.user);
    const { error: getUserDetailsError } = useSelector(
        (state) => state.user.getUserDetails
    );
    const [inputData, setInputData] = useState({
        name: "",
        email: "",
    });

    const setInputDataHandler = (key, value) => {
        setInputData({ ...inputData, [key]: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(
            updateUserDetailsAsync({
                name: inputData.name,
                email: inputData.email,
            })
        );
    };


    useEffect(() => {
        if (user) {
            setInputData({
                name: user?.name || "",
                email: user?.email || "",
            });
        }

        if (getUserDetailsError) {
            ShowError(getUserDetailsError);
            dispatch(CLEAR_GET_USER_DETAILS_ERROR());
        }
        if(message){
            ShowSuccessResponse(message)
            dispatch(CLEAR_USER_MESSAGE())
        }
        if(error){
            ShowError(error)
            dispatch(CLEAR_USER_ERROR())
        }
    }, [user, getUserDetailsError, message, error]);

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
