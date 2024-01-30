import axios from "axios";

export const createOrder = async ({ shippingDetails, paymentInfo }) => {
    const { data } = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/order/new`,
        { shippingDetails, paymentInfo },
        { withCredentials: true }
    );
    return data;
};

export const getOrderList = async () => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/order/myOrders`,
        { withCredentials: true }
    );
    return data?.response;
};
export const getOrderDetails = async (id) => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/order/details/${id}`,
        { withCredentials: true }
    );
    return data?.response;
};



// ------------------------------ ADMIN -----------------------------
export const getAllOrders = async() => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/order/all`,
        { withCredentials: true }
    );
    return data;
}
export const getOrder = async(id) => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/order/${id}`,
        { withCredentials: true }
    );
    return data;
}
export const deleteOrder = async(id) => {
    const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_SERVER_URL}/order/${id}`,
        { withCredentials: true }
    );
    return data;
}
export const updateOrderStatus = async({id, orderStatus}) => {
    const { data } = await axios.patch(
        `${import.meta.env.VITE_APP_SERVER_URL}/order/status/${id}`,
        {orderStatus},
        { withCredentials: true }
    );
    return data;
}
