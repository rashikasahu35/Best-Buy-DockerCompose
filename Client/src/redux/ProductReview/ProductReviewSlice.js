import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {addProductReview, getProductReview, } from './ProductReviewAPI'
import ShowError from "../../utils/ShowError";
import ShowSuccessResponse from "../../utils/ShowSuccessResponse";

const initialState = {
    getProductReview : {
        loading : false,
        reviews : null
    },
    addReview : {
        loading : false
    },
}
export const getProductReviewAsync = createAsyncThunk(
    "PRODUCT_REVIEW_GET",
    async (productId, thunkAPI) => {
        try {
            return await getProductReview(productId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const addProductReviewAsync = createAsyncThunk(
    "PRODUCT_REVIEW_ADD",
    async ({ id, rating, comment }, thunkAPI) => {
        try {
            return await addProductReview({ id, rating, comment });
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


const ProductReviewSlice = createSlice({
    name : 'productReview',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(getProductReviewAsync.pending, (state) => {
            state.getProductReview.loading = true;
        })
        .addCase(getProductReviewAsync.fulfilled, (state, action) => {
            state.getProductReview.loading = false;
            state.getProductReview.reviews = action.payload.response;
        })
        .addCase(getProductReviewAsync.rejected, (state, action) => {
            state.getProductReview.loading = false;
            ShowError(action.payload);
        })
        .addCase(addProductReviewAsync.pending, (state) => {
            state.addReview.loading = true;
        })
        .addCase(addProductReviewAsync.fulfilled, (state, action) => {
            state.addReview.loading = false;
            ShowSuccessResponse(action.payload.message);
        })
        .addCase(addProductReviewAsync.rejected, (state, action) => {
            state.addReview.loading = false;
            ShowError(action.payload);
        })
    }
})



export default ProductReviewSlice.reducer