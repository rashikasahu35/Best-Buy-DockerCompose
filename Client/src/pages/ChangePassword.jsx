import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changePasswordAsync, CLEAR_CHANGE_PASSWORD} from "../redux/Auth/AuthSlice";

const ChangePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, success} = useSelector((state) => state.auth.changePassword);
    const [inputData, setInputData] = useState({
        currentPassword : "",
        newPassword : "",
        confirmPassword : "",
    })
    const [passwordError, setPasswordError] = useState();

    const setInputDataHandler = (key, value) => {
        setInputData((prevState) => ({
            ...prevState,
            [key] : value,
        }))
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        let validation = formValidation({inputData,setPasswordError});
        if (validation) {
            dispatch(
                changePasswordAsync({
                    currentPassword : inputData.currentPassword,
                    newPassword : inputData.newPassword ,
                    confirmPassword : inputData.confirmPassword,
                })
            );
        }
    }
    
    useEffect(() => {
        if (success){
            dispatch(CLEAR_CHANGE_PASSWORD())
            setInputData({
                currentPassword : "",
                newPassword : "",
                confirmPassword : "",
            })
        }
    }, [success]);
    

    return (
        <div className=" bg-gray-100 flex items-center justify-center h-screen px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <div className="flex items-center  space-x-2 mb-6">
                    <h1 className="text-xl font-semibold">Change Password</h1>
                </div>
                <form
                    id="changePasswordForm"
                    className="space-y-6"
                    onSubmit={submitHandler}
                >
                    <div>
                        <label
                            htmlFor="currentPassword"
                            className="text-sm font-medium text-gray-700 block mb-2"
                        >
                            Current Password *
                        </label>
                        <div className="flex">
                            <input
                                type="password"
                                id="currentPassword"
                                value={inputData.currentPassword}
                                onChange={(e) =>
                                    setInputDataHandler('currentPassword',e.target.value)
                                }
                                maxLength={15}
                                className="password-input form-input relative block w-full border border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="newPassword"
                            className="text-sm font-medium text-gray-700 block mb-2"
                        >
                            New Password *
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            value={inputData.newPassword}
                            onChange={(e) => setInputDataHandler('newPassword',e.target.value)}
                            maxLength={15}
                            className="password-input form-input block w-full border border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="text-sm font-medium text-gray-700 block mb-2"
                        >
                            Confirm New Password *
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={inputData.confirmPassword}
                            onChange={(e) => setInputDataHandler('confirmPassword', e.target.value)}
                            maxLength={15}
                            className="password-input form-input block border w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <p className="text-sm text-red-500">{passwordError}</p>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={() => navigate("/me")}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:border-indigo-600 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <input
                            value={`${loading? 'Processing...':'Change'}`}
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-600 cursor-pointer disabled:cursor-not-allowed"
                            disabled={loading}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;


const formValidation = ({inputData,setPasswordError}) => {
    if (inputData.newPassword?.length < 8) {
        setPasswordError("Password must have 8 characters");
        return false;
    } else if (inputData.newPassword !== inputData.confirmPassword) {
        setPasswordError("Passwords do not match");
        return false;
    } else {
        setPasswordError();
        return true;
    }
};