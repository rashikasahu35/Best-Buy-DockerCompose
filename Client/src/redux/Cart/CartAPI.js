import axios from "axios";

export const getCartItems= async () => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/cart`,
        {
            withCredentials: true,
        }
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
    const { data } = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/cart/add`,
        {
            product,
            name,
            quantity,
            price,
            image,
        },
        { withCredentials: true }
    );
    return data;
};

export const updateProductQuantity = async({product, quantity}) => {
    const { data } = await axios.patch(`${import.meta.env.VITE_APP_SERVER_URL}/cart`,{product, quantity}, {withCredentials : true})
    return data
}
export const deleteItemFromCart = async ({ product }) => {
    const { data } = await axios.delete(`${import.meta.env.VITE_APP_SERVER_URL}/cart`,{data : {product}, withCredentials : true})
    return data
}


// -------------------------------- ADMIN -----------------------------------

export const getCart= async (id) => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/cart/${id}`,
        {
            withCredentials: true,
        }
    );
    return data;
};
export const getAllCart= async () => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/cart/all`,
        {
            withCredentials: true,
        }
    );
    return data;
};
export const deleteCart= async (id) => {
    const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_SERVER_URL}/cart/${id}`,
        {
            withCredentials: true,
        }
    );
    return data;
};
