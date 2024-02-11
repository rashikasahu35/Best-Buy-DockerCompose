import axios from "axios";
import getAuthHeader from '../../utils/AuthHeader'
import { persistor } from '../store'


const setToken = (token) => {
    const expiryTime = new Date().getTime() + (3 * 24 * 60 * 60 * 1000); // 3 days in milliseconds
    localStorage.setItem('token', JSON.stringify({ value: token, expiry: expiryTime }));
}

export const register = async ({ name, email, password, avatar }) => {
    const { data } = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/auth/register`,
        { name, email, password, avatar },
        { withCredentials: true }
    );
    setToken(data?.token)
    return data;
};
export const login = async ({ email, password }) => {
    const { data } = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
    );
    setToken(data?.token)
    return data;
};

export const logout = async () => {
    localStorage.removeItem('token')
    persistor.purge()
    return {message : "Logged Out"}

};


export const resetPassword = async ({ token, password }) => {
    const { data } = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/auth/resetPassword/${token}`,
        { password },
        { withCredentials: true }
    );
    return data;
};

export const forgotPassword = async ({ email }) => {
    const { data } = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/auth/forgotPassword`,
        { email },
        { withCredentials: true }
    );
    return data;
};

export const changePassword = async ({
    currentPassword,
    newPassword,
    confirmPassword,
}) => {
    const headers = getAuthHeader()
    const { data } = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/auth/updatePassword`,
        { currentPassword, newPassword, confirmPassword },
        headers
    );
    setToken(data?.token)
    return data;
};

