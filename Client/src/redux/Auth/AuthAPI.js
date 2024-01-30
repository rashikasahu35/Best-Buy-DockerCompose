import axios from "axios";

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
    const { data } = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/auth/updatePassword`,
        { currentPassword, newPassword, confirmPassword },
        { withCredentials: true }
    );
    return data;
};
export const register = async ({ name, email, password, avatar }) => {
    const { data } = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/auth/register`,
        { name, email, password, avatar },
        { withCredentials: true }
    );
    return data;
};
export const login = async ({ email, password }) => {
    const { data } = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
    );
    return data;
};

export const logout = async () => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/auth/logout`,
        { withCredentials: true }
    );
    return data;
};
