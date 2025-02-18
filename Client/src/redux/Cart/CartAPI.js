import axios from "axios";
import getAuthHeader from "../../utils/AuthHeader";

export const getCartItems = async () => {
    const headers = getAuthHeader();
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/cart`,
        headers
    );
    return data;
};
export const addItemInCart = async ({
    product,
    name,
    quantity,
    price,
    image,
}) => {
    const headers = getAuthHeader();
    const { data } = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/cart/add`,
        {
            product,
            name,
            quantity,
            price,
            image,
        },
        headers
    );
    return data;
};

export const updateProductQuantity = async ({ product, quantity }) => {
    const headers = getAuthHeader();
    const { data } = await axios.patch(
        `${import.meta.env.VITE_APP_SERVER_URL}/cart`,
        { product, quantity },
        headers
    );
    return data;
};
export const deleteItemFromCart = async ({ product }) => {
    const headers = getAuthHeader();
    const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_SERVER_URL}/cart`,
        { headers: headers.headers, data: { product }, withCredentials: true }
    );
    return data;
};
