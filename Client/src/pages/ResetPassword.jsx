import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    resetPasswordAsync,
    CLEAR_RESET_PASSWORD,
} from "../redux/Auth/AuthSlice";

const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useParams();
    const { loading, success } = useSelector(
        (state) => state.auth.resetPassword
    );
    const [inputData, setInputData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [passwordError, setPasswordError] = useState();

    const setInputDataHandler = (key, value) => {
        setInputData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const validation = formValidation({inputData, setPasswordError});
        if (!validation) return;
        dispatch(resetPasswordAsync({ token, password : inputData.password }));
    };

    useEffect(() => {
        if (success) {
            dispatch(CLEAR_RESET_PASSWORD());
            setInputData({
              password: "",
              confirmPassword: "",
          })
        }
    }, [success]);

    return (
        <>
            <div className="mt-[50px] flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Reset Password
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
                            {/* <div className="text-red-500 text-xs">{passwordError}</div> */}
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
                        </div>
                        <div className="text-red-500 text-xs">
                            {passwordError}
                        </div>
                        <div>
                            <input
                                type="submit"
                                value={`${loading? 'Processing...':'Submit'}`}
                                className="mt-4 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 cursor-pointer disabled:cursor-not-allowed"
                                onSubmit={(e) => submitHandler(e)}
                                disabled={loading}
                            />
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Want to{" "}
                        <span
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
                            onClick={() => navigate("/login")}
                        >
                            Login ?
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;

const formValidation = ({inputData, setPasswordError }) => {
    if (inputData.password?.length < 8) {
        setPasswordError("Password must contain atleast 8 characters");
        return false;
    } else if (inputData.password !== inputData.confirmPassword) {
        setPasswordError("Passwords do not match");
        return false;
    } else {
        setPasswordError();
        return true;
    }
};
