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
