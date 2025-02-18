import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    getProductList,
    getProductDetails,
    getProductSearch,
} from "./ProductAPI";
import ShowError from "../../utils/ShowError";
import ShowSuccessResponse from "../../utils/ShowSuccessResponse";

const initialState = {
    productList: {
        loading: false,
        products: null,
        productCount: null,
    },
    productDetails: {
        loading: false,
        product: null,
    },
    productSearch: {
        loading: false,
        products: null,
        productCount: null,
    },
};
export const getProductListAsync = createAsyncThunk(
    "PRODUCT_LIST",
    async ({ page, minPrice, maxPrice, category, sortBy, order }, thunkAPI) => {
        try {
            return await getProductList({
                page,
                minPrice,
                maxPrice,
                category,
                sortBy,
                order,
            });
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getProductDetailsAsync = createAsyncThunk(
    "PRODUCT_DETAILS",
    async (id, thunkAPI) => {
        try {
            return await getProductDetails(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const getProductSearchAsync = createAsyncThunk(
    "PRODUCT_SEARCH",
    async ({ query }, thunkAPI) => {
        try {
            return await getProductSearch({ query });
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const ProductListSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        CLEAR_PRODUCT_SEARCH: (state) => {
            state.productSearch = {
                loading: false,
                products: null,
                productCount: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductListAsync.pending, (state) => {
                state.productList.loading = true;
            })
            .addCase(getProductListAsync.fulfilled, (state, action) => {
                state.productList = {
                    loading: false,
                    products: action.payload.response,
                    productCount: action.payload.productCount,
                };
            })
            .addCase(getProductListAsync.rejected, (state, action) => {
                state.productList.loading = false;
                ShowError(action.payload);
            })
            .addCase(getProductDetailsAsync.pending, (state) => {
                state.productDetails.loading = true;
            })
            .addCase(getProductDetailsAsync.fulfilled, (state, action) => {
                state.productDetails = {
                    loading: false,
                    product: action.payload,
                };
            })
            .addCase(getProductDetailsAsync.rejected, (state, action) => {
                state.productDetails.loading = false;
                ShowError(action.payload);
            })
            .addCase(getProductSearchAsync.pending, (state) => {
                state.productSearch.loading = true;
            })
            .addCase(getProductSearchAsync.fulfilled, (state, action) => {
                state.productSearch = {
                    loading: false,
                    products: action.payload.response,
                    productCount: action.payload.productCount,
                };
            })
            .addCase(getProductSearchAsync.rejected, (state, action) => {
                state.productSearch.loading = false;
                ShowError(action.payload);
            })
        },
});

export default ProductListSlice.reducer;
export const { CLEAR_PRODUCT_SEARCH } = ProductListSlice.actions;