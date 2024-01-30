import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrderDetails, getOrderList, createOrder, getAllOrders, getOrder , deleteOrder, updateOrderStatus} from "./OrderAPI";
import ShowError from "../../utils/ShowError";
import ShowSuccessResponse from '../../utils/ShowSuccessResponse'
import {getCartItemsAsync} from '../Cart/CartSlice'

const initialState = { 
    createOrder : {
        loading : false,
        success : false,
    },
    getOrderList : {
        loading : false,
        orders : null,
        orderCount : null
    },
    getOrderDetails : {
        loading : null,
        success : false
    },


    updateOrderStatus : {
        loading : false,
    },
    deleteOrder : {
        loading : false,
        success : false
    },
    getOrder : {
        loading : null,
        order : null
    },
    getAllOrders : {
        loading : false,
        orders : null,
        totalAmount : null,
        orderCount : null
    },
};

export const createOrderAsync = createAsyncThunk("CREATE_ORDER", async ({shippingDetails, paymentInfo}, thunkAPI) => {
    try {
        const response = await createOrder({shippingDetails, paymentInfo});
        thunkAPI.dispatch(getCartItemsAsync())
        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const getOrderListAsync = createAsyncThunk("ORDER_LIST", async (_, thunkAPI) => {
    try {
        return await getOrderList();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const getOrderDetailsAsync = createAsyncThunk(
    "ORDER_DETAILS",
    async (id, thunkAPI) => {
        try {
            return await getOrderDetails(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


// ------------------------------ ADMIN -----------------------------

export const getAllOrdersAsync = createAsyncThunk(
    "ADMIN/ORDER_ALL",
    async (id, thunkAPI) => {
        try {
            return await getAllOrders();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const getOrderAsync = createAsyncThunk(
    "ADMIN/ORDER_GET",
    async (id, thunkAPI) => {
        try {
            return await getOrder(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const deleteOrderAsync = createAsyncThunk(
    "ADMIN/ORDER_DELETE",
    async (id, thunkAPI) => {
        try {
            return await deleteOrder(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const updateOrderStatusAsync = createAsyncThunk(
    "ADMIN/ORDER_STATUS_UPDATE",
    async ({id, orderStatus}, thunkAPI) => {
        try {
            return await updateOrderStatus({id, orderStatus});
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);




const OrderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        CLEAR_ORDER_DELETE : (state) => {
            state.deleteOrder.success = false
        }, 
        CLEAR_ORDER_CREATE : (state) => {
            state.createOrder.success = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrderAsync.pending, (state) => {
                state.createOrder.loading = true;
            })
            .addCase(createOrderAsync.fulfilled, (state, action) => {
                state.createOrder.loading = false;
                state.createOrder.success = true;
                ShowSuccessResponse(action.payload.message)
            })
            .addCase(createOrderAsync.rejected, (state, action) => {
                state.createOrder.loading = false;
                ShowError(action.payload);
            })
            .addCase(getOrderListAsync.pending, (state) => {
                state.getOrderList.loading = true;
            })
            .addCase(getOrderListAsync.fulfilled, (state, action) => {
                state.getOrderList.loading = false;
                state.getOrderList.orders = action.payload;
            })
            .addCase(getOrderListAsync.rejected, (state, action) => {
                state.getOrderList.loading = false;
                ShowError(action.payload);
            })
            .addCase(getOrderDetailsAsync.pending, (state) => {
                state.getOrderDetails.loading = true;
            })
            .addCase(getOrderDetailsAsync.fulfilled, (state, action) => {
                state.getOrderDetails.loading = false;
                state.getOrderDetails.order = action.payload;
            })
            .addCase(getOrderDetailsAsync.rejected, (state, action) => {
                state.getOrderDetails.loading = false;
                ShowError(action.payload);
            })
            .addCase(getAllOrdersAsync.pending, (state) => {
                state.getAllOrders.loading = true;
            })
            .addCase(getAllOrdersAsync.fulfilled, (state, action) => {
                state.getAllOrders.loading = false;
                state.getAllOrders.orders = action.payload.response;
                state.getAllOrders.totalAmount = action.payload.totalAmount;
                state.getAllOrders.orderCount = action.payload.orderCount
            })
            .addCase(getAllOrdersAsync.rejected, (state, action) => {
                state.getAllOrders.loading = false;
                ShowError(action.payload);
            })
            .addCase(getOrderAsync.pending, (state) => {
                state.getOrder.loading = true;
            })
            .addCase(getOrderAsync.fulfilled, (state, action) => {
                state.getOrder.loading = false;
                state.getOrder.order = action.payload.response;
            })
            .addCase(getOrderAsync.rejected, (state, action) => {
                state.getOrder.loading = false;
                ShowError(action.payload);
            })
            .addCase(deleteOrderAsync.pending, (state) => {
                state.deleteOrder.loading = true;
            })
            .addCase(deleteOrderAsync.fulfilled, (state, action) => {
                state.deleteOrder.loading = false;
                state.deleteOrder.success = true
                ShowSuccessResponse(action.payload.message)
            })
            .addCase(deleteOrderAsync.rejected, (state, action) => {
                state.deleteOrder.loading = false;
                ShowError(action.payload);
            })
            .addCase(updateOrderStatusAsync.pending, (state) => {
                state.updateOrderStatus.loading = true;
            })
            .addCase(updateOrderStatusAsync.fulfilled, (state, action) => {
                state.updateOrderStatus.loading = false;
                ShowSuccessResponse(action.payload.message)
            })
            .addCase(updateOrderStatusAsync.rejected, (state, action) => {
                state.updateOrderStatus.loading = false;
                ShowError(action.payload);
            })
    },
});

export default OrderSlice.reducer;
export const { CLEAR_ORDER_DELETE, CLEAR_ORDER_CREATE } = OrderSlice.actions;
