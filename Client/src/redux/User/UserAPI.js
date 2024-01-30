import axios from "axios";

export const getUserDetails = async () => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/user/me`,
        { withCredentials: true }
    );
    return data?.response;
};

export const updateUserDetails = async ({ name, email, avatar }) => {
    const { data } = await axios.patch(
        `${import.meta.env.VITE_APP_SERVER_URL}/user/update`,
        { name, email, avatar },
        { withCredentials: true }
    );
    return data;
};

export const deleteUserAccount = async () => {
    const { data } = await axios.delete(`${import.meta.env.VITE_APP_SERVER_URL}/user/delete`, {withCredentials : true})
    return data
}


// ------------------------ ADMIN ---------------------------

export const getAllUsers = async() => {
    const { data } = await axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/user/all`, {withCredentials : true})
    return data
}
export const createUser = async({name, email, role, avatar, password}) => {
    const { data } = await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/user/new`,{name, email, role, avatar, password}, {withCredentials : true})
    return data
}
export const getUser = async(id) => {
    const { data } = await axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/user/${id}`, {withCredentials : true})
    return data
}
export const updateUser = async({id, name, email, avatar, role}) => {
    const { data } = await axios.patch(`${import.meta.env.VITE_APP_SERVER_URL}/user/${id}`, {name, email, avatar, role},{withCredentials : true})
    return data
}
export const deleteUser = async(id) => {
    const { data } = await axios.delete(`${import.meta.env.VITE_APP_SERVER_URL}/user/${id}`,{withCredentials : true})
    return data
}