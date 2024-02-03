import axios from "axios";
import getAuthHeader from '../../utils/AuthHeader'


export const createOrder = async ({ shippingDetails, paymentInfo }) => {
    const headers = getAuthHeader()
    const { data } = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/order/new`,
        { shippingDetails, paymentInfo },
        headers
    );
    return data;
};

export const getOrderList = async () => {
    const headers = getAuthHeader()
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/order/myOrders`,
        headers
    );
    return data?.response;
};
export const getOrderDetails = async (id) => {
    const headers = getAuthHeader()
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/order/details/${id}`,
        headers
    );
    return data?.response;
};



// ------------------------------ ADMIN -----------------------------

export const getAllOrders = async() => {
    const headers = getAuthHeader()
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/order/all`,
        headers
    );
    return data;
}
export const getOrder = async(id) => {
    const headers = getAuthHeader()
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/order/${id}`,
        headers
    );
    return data;
}
export const deleteOrder = async(id) => {
    const headers = getAuthHeader()
    const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_SERVER_URL}/order/${id}`,
        headers
    );
    return data;
}
export const updateOrderStatus = async({id, orderStatus}) => {
    const headers = getAuthHeader()
    const { data } = await axios.patch(
        `${import.meta.env.VITE_APP_SERVER_URL}/order/status/${id}`,
        {orderStatus},
        headers
    );
    return data;
}
