import queryString from "query-string";
import axios from "axios";


export const getProductList = async ({
    page,
    minPrice,
    maxPrice,
    category,
    sortBy,
    order
}) => {

        const query = {};
        if (page) {
            query.page = page;
        }
        if (minPrice & maxPrice) {
            query.minPrice = minPrice;
            query.maxPrice = maxPrice;
        }
        if (category?.length) {
            query.category = category;
        }
        if (sortBy != null && order != null) {
            (query.sortBy = sortBy), (query.order = order);
        }

        let url = `${
            import.meta.env.VITE_APP_SERVER_URL
        }/product/all?${queryString.stringify(query)}`;
        const { data } = await axios.get(url, { withCredentials: true });
        return data;
    
};



export const getProductSearch = async ({query}) => {
    const { data } = await axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/product/search?keyword=${query}`, { withCredentials: true })
    return data
}

export const getProductDetails = async (id) => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/product/${id}`,
        { withCredentials: true }
    );
    return data?.response;
};
