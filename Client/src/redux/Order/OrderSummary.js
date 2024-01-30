import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shippingDetails : {
        name : null,
        email : null,
        phoneNumber : null,
        address : null,
        city: null,
        state : null,
        pincode : null,
        country : null
    }, 
    price : {
        itemPrice : null,
        taxPrice : null,
        shippingPrice : null,
        totalPrice : null
    },
    paymentMethod : null
}

const ShippingDetailsSlice = createSlice({
    name : 'orderSummary',
    initialState,
    reducers : {
        SET_SHIPPING_DETAILS : (state, action) => {
            state.shippingDetails = {...action.payload}
        },
        SET_ORDER_PRICE : (state, action) => {
            const subTotal = action.payload
            state.price = {
                itemPrice : subTotal,
                taxPrice : subTotal * 0.1,
                shippingPrice : subTotal >= 500 ? 0:50,
                totalPrice : subTotal + subTotal * 0.1 + (subTotal >= 500? 0: 50)
            }
        },
        SET_PAYMENT_METHOD : (state, action) => {
            state.paymentMethod = action.payload
        },
        CLEAR_SHIPPING_DETIALS : (state) => {
            state.shippingDetails = initialState.shippingDetails
        },
        CLEAR_ORDER_PRICE : (state) => {
            state.price = initialState.price
        }
    }
})


export default ShippingDetailsSlice.reducer
export const {SET_SHIPPING_DETAILS, SET_ORDER_PRICE, SET_PAYMENT_METHOD, CLEAR_SHIPPING_DETIALS, CLEAR_ORDER_PRICE} = ShippingDetailsSlice.actions