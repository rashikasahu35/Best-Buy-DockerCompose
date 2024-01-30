import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {addProductReview, getProductReview, updateProductReview, deleteProductReview, getReview} from './ProductReviewAPI'
import ShowError from "../../utils/ShowError";
import ShowSuccessResponse from "../../utils/ShowSuccessResponse";

const initialState = {
    getProductReview : {
        loading : false,
        reviews : null
    },
    getReview : {                         // get product reviews
        loading : false,
        review : null,
    },
    addReview : {
        loading : false
    },
    updateReview : {
        loading : false
    },
    deleteReview : {
        loading : false,
        success : false
    },
    getAllReviews : {
        loading : false,
        reviews : null,
        reviewCount : null
    }

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
export const getReviewAsync = createAsyncThunk(
    "REVIEW_GET",
    async (reviewId, thunkAPI) => {
        try {
            return await getReview(reviewId);
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
export const updateProductReviewAsync = createAsyncThunk(
    "ADMIN/PRODUCT_REVIEW_UPDATE",
    async ({ id, rating, comment }, thunkAPI) => {
        try {
            return await updateProductReview({ id, rating, comment });
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const deleteProductReviewAsync = createAsyncThunk(
    "ADMIN/PRODUCT_REVIEW_DELETE",
    async (id, thunkAPI) => {
        try {
            return await deleteProductReview(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


const ProductReviewSlice = createSlice({
    name : 'productReview',
    initialState,
    reducers : {
        CLEAR_DELETE_PRODUCT_REVIEW : (state) => {
            state.deleteReview.success = false
        }
    },
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
        .addCase(updateProductReviewAsync.pending, (state) => {
            state.updateReview.loading = true;
        })
        .addCase(updateProductReviewAsync.fulfilled, (state, action) => {
            state.updateReview.loading = false;
            ShowSuccessResponse(action.payload.message);
        })
        .addCase(updateProductReviewAsync.rejected, (state, action) => {
            state.updateReview.loading = false;
            ShowError(action.payload);
        })
        .addCase(deleteProductReviewAsync.pending, (state) => {
            state.deleteReview.loading = true;
        })
        .addCase(deleteProductReviewAsync.fulfilled, (state, action) => {
            state.deleteReview.loading = false;
            state.deleteReview.success = true;
            ShowSuccessResponse(action.payload.message);
        })
        .addCase(deleteProductReviewAsync.rejected, (state, action) => {
            state.deleteReview.loading = false;
            ShowError(action.payload);
        })
        .addCase(getReviewAsync.pending, (state) => {
            state.getReview.loading = true;
        })
        .addCase(getReviewAsync.fulfilled, (state, action) => {
            state.getReview.loading = false;
            state.getReview.review = action.payload.response;
        })
        .addCase(getReviewAsync.rejected, (state, action) => {
            state.getReview.loading = false;
            ShowError(action.payload);
        })
    }
})



export default ProductReviewSlice.reducer
export const {CLEAR_DELETE_PRODUCT_REVIEW} = ProductReviewSlice.actions