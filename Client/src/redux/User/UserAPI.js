import axios from "axios";
import getAuthHeader from '../../utils/AuthHeader'

export const getUserDetails = async () => {
    const headers = getAuthHeader()
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/user/me`,
        headers
    );
    return data?.response;
};

export const updateUserDetails = async ({ name, email, avatar }) => {
    const headers = getAuthHeader()
    const { data } = await axios.patch(
        `${import.meta.env.VITE_APP_SERVER_URL}/user/update`,
        { name, email, avatar },
        headers
    );
    return data;
};
