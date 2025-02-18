import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import UserSlice from "./User/UserSlice";
import AuthSlice from "./Auth/AuthSlice";
import CartSlice from "./Cart/CartSlice";
import ProductSlice from "./Product/ProductSlice";
import ProductReviewSlice from "./ProductReview/ProductReviewSlice";
import storage from "redux-persist/lib/storage";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "userAuthenticated"], // Specify the keys to persist (persist only user & userAuth)
};

const rootReducer = combineReducers({
    auth: AuthSlice,
    user: persistReducer(persistConfig, UserSlice),
    product: ProductSlice,
    productReview: ProductReviewSlice,
    cart: CartSlice,
});
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);
