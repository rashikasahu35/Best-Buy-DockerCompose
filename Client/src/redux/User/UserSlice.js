import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import {getUserDetails, updateUserDetails, } from './UserAPI'
import ShowError from '../../utils/ShowError'
import ShowSuccessResponse from "../../utils/ShowSuccessResponse";


const initialState = {
    loading : false,
    user: null,
    userAuthenticated : false,
    message : null,
    error : null,
    getUserDetails:{
        error : null
    },
}

export const getUserDetailsAsync = createAsyncThunk('USER/GET', async (_, thunkAPI) => {
    try{
        return await getUserDetails()
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})
export const updateUserDetailsAsync = createAsyncThunk('USER/UPDATE', async ({name, email, avatar}, thunkAPI) => {
    try{
        return await updateUserDetails({ name, email, avatar })
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const UserSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        SET_USER: (state, action) => {
            state.user = action.payload
            state.userAuthenticated = true
        },
        CLEAR_USER : (state) => {
            state.user = null
            state.userAuthenticated = false
        },
        CLEAR_USER_MESSAGE: (state) => {
            state.message = null
        },
        CLEAR_USER_ERROR: (state) => {
            state.error = null
        },
        CLEAR_GET_USER_DETAILS_ERROR : (state) => {
            state.getUserDetails.error = null
        },
        
        CLEAR_USER_CREATE : (state) => {
            state.createUser.success = false
        },
        CLEAR_USER_DELETE :(state) => {
            state.deleteUser.success = false
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(getUserDetailsAsync.pending, (state) => {
            state.loading = true;
        })
        .addCase(getUserDetailsAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.userAuthenticated = true
        })
        .addCase(getUserDetailsAsync.rejected, (state, action) => {
            state.loading = false;
            console.log(action.payload)
            state.getUserDetails.error = action.payload
        })
        .addCase(updateUserDetailsAsync.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateUserDetailsAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.userAuthenticated = true
            state.user = action.payload.response;
            state.message = action.payload.message
        })
        .addCase(updateUserDetailsAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })
    }
})

export const { SET_USER, CLEAR_USER, CLEAR_USER_CREATE , CLEAR_USER_DELETE, CLEAR_GET_USER_DETAILS_ERROR, CLEAR_USER_MESSAGE, CLEAR_USER_ERROR } = UserSlice.actions
export default UserSlice.reducer
