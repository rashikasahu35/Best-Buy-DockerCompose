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

export const deleteUserAccount = async () => {
    const headers = getAuthHeader()
    const { data } = await axios.delete(`${import.meta.env.VITE_APP_SERVER_URL}/user/delete`, headers)
    localStorage.removeItem('token')
    return data
}


// ------------------------ ADMIN ---------------------------

export const getAllUsers = async() => {
    const headers = getAuthHeader()
    const { data } = await axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/user/all`, headers)
    return data
}
export const createUser = async({name, email, role, avatar, password}) => {
    const headers = getAuthHeader()
    const { data } = await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/user/new`,{name, email, role, avatar, password}, headers)
    return data
}
export const getUser = async(id) => {
    const headers = getAuthHeader()
    const { data } = await axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/user/${id}`, headers)
    return data
}
export const updateUser = async({id, name, email, avatar, role}) => {
    const headers = getAuthHeader()
    const { data } = await axios.patch(`${import.meta.env.VITE_APP_SERVER_URL}/user/${id}`, {name, email, avatar, role}, headers)
    return data
}
export const deleteUser = async(id) => {
    const headers = getAuthHeader()
    const { data } = await axios.delete(`${import.meta.env.VITE_APP_SERVER_URL}/user/${id}`, headers)
    return data
}