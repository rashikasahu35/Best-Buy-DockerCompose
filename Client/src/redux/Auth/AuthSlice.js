import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    login,
    register,
    changePassword,
    resetPassword,
    forgotPassword,
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
    changePassword : {
        loading : false,
        success : false
    },
    resetPassword : {
        loading : false,
        success : null
    },
    forgotPassword : {
        loading : false,
        message : null,
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
export const changePasswordAsync = createAsyncThunk(
    "PASSWORD/CHANGE",
    async ({ currentPassword, newPassword, confirmPassword }, thunkAPI) => {
        try {
            return await changePassword({
                currentPassword,
                newPassword,
                confirmPassword,
            });
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const resetPasswordAsync = createAsyncThunk(
    "PASSWORD/RESET",
    async ({ token, password }, thunkAPI) => {
        try {
            return await resetPassword({ token, password });
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const forgotPasswordAsync = createAsyncThunk(
    "PASSWORD/FORGOT",
    async ({ email }, thunkAPI) => {
        try {
            return await forgotPassword({ email });
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
    reducers: {
        CLEAR_FORGOT_PASSWORD : (state) => {
            state.forgotPassword.message = null
        },
        CLEAR_CHANGE_PASSWORD : (state) => {
            state.changePassword.success = false
        },
        CLEAR_RESET_PASSWORD : (state) => {
            state.resetPassword.success = false
        }
    },
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
            .addCase(changePasswordAsync.pending, (state) => {
                state.changePassword.loading = true;
            })
            .addCase(changePasswordAsync.fulfilled, (state, action) => {
                state.changePassword.loading = false;
                state.changePassword.success = true
                ShowSuccessResponse(action.payload.message)
            })
            .addCase(changePasswordAsync.rejected, (state, action) => {
                state.changePassword.loading = false;
                ShowError(action.payload);
            })
            .addCase(forgotPasswordAsync.pending, (state) => {
                state.forgotPassword.loading = true;
            })
            .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
                state.forgotPassword.loading = false;
                state.forgotPassword.message = action.payload.message
            })
            .addCase(forgotPasswordAsync.rejected, (state, action) => {
                state.forgotPassword.loading = false;
                ShowError(action.payload);
            })
            .addCase(resetPasswordAsync.pending, (state) => {
                state.resetPassword.loading = true;
            })
            .addCase(resetPasswordAsync.fulfilled, (state, action) => {
                state.resetPassword.loading = false;
                state.resetPassword.success = true
                ShowSuccessResponse(action.payload.message)
            })
            .addCase(resetPasswordAsync.rejected, (state, action) => {
                state.resetPassword.loading = false;
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
export const {  CLEAR_CHANGE_PASSWORD, CLEAR_FORGOT_PASSWORD, CLEAR_RESET_PASSWORD } = AuthSlice.actions;
