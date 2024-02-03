import axios from "axios";
import getAuthHeader from '../../utils/AuthHeader'


export const getProductReview = async (id) => {   // id here is product id
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/product/review`,
        {
            params: { productId: id },
            withCredentials: true,
        }
    );
    return data;
};
export const addProductReview = async ({id, rating, comment}) => {
    const headers = getAuthHeader()
    const { data } = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/product/review/new`,
        { productId : id,rating, comment },
        headers
    );
    return data;
};

// ------------------------ ADMIN --------------------------

export const getReview = async(id) => {
    const headers = getAuthHeader()
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/product/review/${id}`,
        headers
    );
    return data;
}
export const updateProductReview = async ({id, rating, comment}) => {
    const headers = getAuthHeader()
    const { data } = await axios.patch(
        `${import.meta.env.VITE_APP_SERVER_URL}/product/review/${id}`,
        { rating, comment },
        headers
    );
    return data;
};
export const deleteProductReview = async (id) => {
    const headers = getAuthHeader()
    const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_SERVER_URL}/product/review/${id}`,
        headers
    );
    return data;
};