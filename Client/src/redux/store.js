import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import UserSlice from './User/UserSlice'
import AuthSlice from './Auth/AuthSlice'
import CartSlice from './Cart/CartSlice'
import OrderSlice from './Order/OrderSlice'
import OrderSummary from './Order/OrderSummary'
import ProductSlice from './Product/ProductSlice'
import ProductReviewSlice from './ProductReview/ProductReviewSlice'

const rootReducer = combineReducers({
    auth : AuthSlice,
    user : UserSlice,
    product : ProductSlice,
    productReview : ProductReviewSlice,
    cart : CartSlice,
    orderSummary : OrderSummary,
    order : OrderSlice
    
})
export const store = configureStore({
    reducer : rootReducer
})