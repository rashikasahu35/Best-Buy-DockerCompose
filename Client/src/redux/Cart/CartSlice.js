import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCartItems, addItemInCart, deleteItemFromCart, updateProductQuantity } from "./CartAPI";
import ShowError from "../../utils/ShowError";
import ShowSuccessResponse from "../../utils/ShowSuccessResponse";

const initialState = {
    loading : false,
    cart: null,
    noOfItems : null,

    getCartItems : {
        error : null
    },
};

export const getCartItemsAsync = createAsyncThunk(
    "CART/GET_ITEMS",
    async (_,thunkAPI) => {
        try {
            return await getCartItems();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const addItemInCartAsync = createAsyncThunk(
    "CART/ADD_ITEM",
    async ({ product, name, quantity, price, image }, thunkAPI) => {
        try {
            return await addItemInCart({ product, name, quantity, price, image });
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const updateProductQuantityAsync = createAsyncThunk(
    "CART/UPDATE_QUANTITY",
    async ({ product, quantity }, thunkAPI) => {
        try {
            return await updateProductQuantity({ product, quantity });
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const deleteItemFromCartAsync = createAsyncThunk(
    "CART/DELETE_ITEM",
    async ({ product }, thunkAPI) => {
        try {
            return await deleteItemFromCart({ product })
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        CLEAR_GET_CART_ITEMS_ERROR :(state) => {
            state.getCartItems.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCartItemsAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCartItemsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload.response
                state.noOfItems = action.payload.response?.noOfItems || 0
            })
            .addCase(getCartItemsAsync.rejected, (state, action) => {
                state.loading = false;
                state.getCartItems.error = action.payload
            })
            .addCase(addItemInCartAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(addItemInCartAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload.response;
                state.noOfItems = action.payload.response?.noOfItems || 0
                ShowSuccessResponse(action.payload.message)
            })
            .addCase(addItemInCartAsync.rejected, (state, action) => {
                state.loading = false;
                ShowError(action.payload)
            })
            .addCase(updateProductQuantityAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProductQuantityAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload.response;
                state.noOfItems = action.payload.response?.noOfItems || 0
                ShowSuccessResponse(action.payload.message)
            })
            .addCase(updateProductQuantityAsync.rejected, (state, action) => {
                state.loading = false;
                ShowError(action.payload)
            })
            .addCase(deleteItemFromCartAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload.response
                state.noOfItems = action.payload.response?.noOfItems || 0
                ShowSuccessResponse(action.payload.message)
            })
            .addCase(deleteItemFromCartAsync.rejected, (state, action) => {
                state.loading = false;
                ShowError(action.payload)
            })
    },
});

export default CartSlice.reducer;
export const { CLEAR_GET_CART_ITEMS_ERROR } = CartSlice.actions;
