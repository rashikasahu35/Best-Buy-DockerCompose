import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    login,
    register,
    logout
} from "./AuthAPI";
import { SET_USER, CLEAR_USER } from "../User/UserSlice";
import ShowError from "../../utils/ShowError";
import ShowSuccessResponse from "../../utils/ShowSuccessResponse";

const initialState = {
    register : {
        loading : false
    },
    login : {
        loading : false
    },
    logout : {
        loading : false

    }
}

export const registerAsync = createAsyncThunk(
    "REGISTER",
    async ({ name, email, password, avatar }, thunkAPI) => {
        try {
            const response = await register({ name, email, password, avatar});
            thunkAPI.dispatch(SET_USER(response?.response));
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const loginAsync = createAsyncThunk(
    "LOGIN",
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await login({ email, password });
            thunkAPI.dispatch(SET_USER(response?.response));
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const logoutAsync = createAsyncThunk(
    "LOGOUT",
    async (_,thunkAPI) => {
        try {
            const response = await logout()
            thunkAPI.dispatch(CLEAR_USER())
            return response

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerAsync.pending, (state) => {
                state.register.loading = true;
            })
            .addCase(registerAsync.fulfilled, (state, action) => {
                state.register.loading = false;
                ShowSuccessResponse(action.payload.message)
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.register.loading = false;
                ShowError(action.payload);
            })
            .addCase(loginAsync.pending, (state) => {
                state.login.loading = true;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.login.loading = false;
                ShowSuccessResponse(action.payload.message)
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.login.loading = false;
                ShowError(action.payload);
            })
            .addCase(logoutAsync.pending, (state) => {
                state.logout.loading = true;
            })
            .addCase(logoutAsync.fulfilled, (state, action) => {
                state.logout.loading = false;
                ShowSuccessResponse(action.payload.message)
            })
            .addCase(logoutAsync.rejected, (state, action) => {
                state.logout.loading = false;
                ShowError(action.payload);
            });
    },
});

export default AuthSlice.reducer;
//export const {  CLEAR_CHANGE_PASSWORD, CLEAR_FORGOT_PASSWORD, CLEAR_RESET_PASSWORD } = AuthSlice.actions;
