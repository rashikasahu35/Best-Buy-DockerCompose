import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetailsAsync, deleteUserAccountAsync,  CLEAR_GET_USER_DETAILS_ERROR } from "../redux/User/UserSlice";
import Spinner from '../components/Spinner'
import {
    logoutAsync,
} from "../redux/Auth/AuthSlice";
import ShowError from "../utils/ShowError";

const UserProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading, user,  userAuthenticated,  } = useSelector((state) => state.user);
    const { error : getUserDetailsError } = useSelector(
        (state) => state.user.getUserDetails
    );

    const logout = async () => {
        dispatch(logoutAsync());
    };
    const deleteUserAccount = async () => {
        dispatch(deleteUserAccountAsync())
    }


    useEffect(() => {
        if(getUserDetailsError){
            ShowError(getUserDetailsError)
            dispatch(CLEAR_GET_USER_DETAILS_ERROR())
        }
    }, [getUserDetailsError])


    return (
        <>
        {loading && <Spinner/>}
        {user && 
        
        <div className="mt-[80px] container mx-auto px-4">
            <h1 className="text-2xl font-bold">My Profile</h1>
            <section className="mt-6 w-full flex flex-col sm:flex-row items-center justify-around ">
                <div className="flex items-center justify-center md:ml-10">
                    <img
                        src={user?.avatar.url}
                        alt="Profile avatar"
                        className="h-28 w-28 sm:h-36 sm:w-36 lg:h-80 lg:w-80 rounded-full object-cover border-2 hover:border-indigo-600"
                    />
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                    <h2 className="text-md md:text-2xl font-bold">
                        Personal Information
                    </h2>
                    <ul className="list-disc my-4 mt-4">
                        <li>
                            <span className="font-semibold lg:text-xl">
                                Name:{" "}
                            </span>{" "}
                            {user?.name}
                        </li>
                        <li>
                            <span className="font-semibold lg:text-xl">
                                Email:{" "}
                            </span>{" "}
                            {user?.email}
                        </li>
                        <li>
                            <span className="font-semibold lg:text-xl">
                                Joined On:{" "}
                            </span>{" "}
                            {parseTimestamp(user?.createdOn)}
                        </li>
                    </ul>
                </div>
            </section>

            <section className="mt-12 flex flex-wrap justify-around text-sm md:text-base">
                <button
                    onClick={() => navigate("/editProfile")}
                    className="inline-block rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-center text-white hover:bg-indigo-700 m-2"
                >
                    Edit Profile
                </button>
                <button
                    onClick={() => navigate("/orders")}
                    className="inline-block rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-center  text-white hover:bg-indigo-700  m-2"
                >
                    My Orders
                </button>
                <button
                    onClick={() => navigate("/changePassword")}
                    className="inline-block rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-center  text-white hover:bg-indigo-700  m-2"
                >
                    Change Password
                </button>
                <button
                    onClick={deleteUserAccount}
                    className="inline-block rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-center  text-white hover:bg-indigo-700  m-2"
                >
                    Delete My Account
                </button>
                <button
                    onClick={logout}
                    className="inline-block rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-center  text-white hover:bg-indigo-700  m-2"
                >
                    Logout
                </button>
            </section>
        </div>}
        </>
    );
};

export default UserProfile;

function parseTimestamp(timestamp) {
    if (timestamp) {
        const date = new Date(timestamp);
        const options = { day: "2-digit", month: "short", year: "numeric" };
        const formattedDate = date.toLocaleDateString("en-GB", options);
        return formattedDate;
    }
}
