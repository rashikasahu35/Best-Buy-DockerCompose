import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import {getUserDetails, updateUserDetails, deleteUserAccount, getAllUsers, getUser, updateUser, deleteUser, createUser} from './UserAPI'
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

    // -------------- ADMIN------------
    getAllUsers : {
        loading : false,
        users : null,
        userCount : null
    },
    createUser : {
        loading : false,
        success : false
    },
    getUser : {
        loading : false,
        user : null
    },
    updateUser : {
        loading : false
    },
    deleteUser : {
        loading : false,
        success : false
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
export const deleteUserAccountAsync = createAsyncThunk('USER/DELETE', async (_, thunkAPI) => {
    try{
        return await deleteUserAccount()
    }
    catch(error){
        return thunkAPI.rejectWithValue(error)
    }
} )


// ------------------------ ADMIN ------------------------------
export const getAllUsersAsync = createAsyncThunk('ADMIN/USER/GET_ALL', async (_, thunkAPI) => {
    try{
        return await getAllUsers()
    }
    catch(error){
        return thunkAPI.rejectWithValue(error)
    }
} )
export const createUserAsync = createAsyncThunk('ADMIN/USER/CREATE', async ({name, email, avatar, role, password}, thunkAPI) => {
    try{
        return await createUser({name, email, avatar, role, password})
    }
    catch(error){
        return thunkAPI.rejectWithValue(error)
    }
} )
export const getUserAsync = createAsyncThunk('ADMIN/USER/GET', async (id, thunkAPI) => {
    try{
        return await getUser(id)
    }
    catch(error){
        return thunkAPI.rejectWithValue(error)
    }
} )
export const updateUserAsync = createAsyncThunk('ADMIN/USER/UPDATE', async ({id, name, email, avatar, role }, thunkAPI) => {
    try{
        return await updateUser({id, name, email, avatar, role })
    }
    catch(error){
        return thunkAPI.rejectWithValue(error)
    }
} )
export const deleteUserAsync = createAsyncThunk('ADMIN/USER/DELETE', async (id, thunkAPI) => {
    try{
        return await deleteUser(id)
    }
    catch(error){
        return thunkAPI.rejectWithValue(error)
    }
} )



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
        .addCase(deleteUserAccountAsync.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteUserAccountAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.user = null;
            state.userAuthenticated = false
            state.message = action.payload.message
        })
        .addCase(deleteUserAccountAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })
        .addCase(getAllUsersAsync.pending, (state) => {                        // ADMIN 
            state.getAllUsers.loading = true;
        })
        .addCase(getAllUsersAsync.fulfilled, (state, action) => {
            state.getAllUsers.loading = false;
            state.getAllUsers.users = action.payload.response;
            state.getAllUsers.userCount = action.payload.userCount;
        })
        .addCase(getAllUsersAsync.rejected, (state, action) => {
            state.getAllUsers.loading = false;
            ShowError(action.payload)
        })
        .addCase(getUserAsync.pending, (state) => {
            state.getUser.loading = true;
        })
        .addCase(getUserAsync.fulfilled, (state, action) => {
            state.getUser.loading = false;
            state.getUser.user = action.payload.response;
        })
        .addCase(getUserAsync.rejected, (state, action) => {
            state.getUser.loading = false;
            ShowError(action.payload)
        })
        .addCase(updateUserAsync.pending, (state) => {
            state.updateUser.loading = true;
        })
        .addCase(updateUserAsync.fulfilled, (state, action) => {
            state.updateUser.loading = false;
            ShowSuccessResponse(action.payload.message)
        })
        .addCase(updateUserAsync.rejected, (state, action) => {
            state.updateUser.loading = false;
            ShowError(action.payload)
        })
        .addCase(deleteUserAsync.pending, (state) => {
            state.deleteUser.loading = true;
        })
        .addCase(deleteUserAsync.fulfilled, (state, action) => {
            state.deleteUser.loading = false;
            state.deleteUser.success = true;
            ShowSuccessResponse(action.payload.message)
        })
        .addCase(deleteUserAsync.rejected, (state, action) => {
            state.deleteUser.loading = false;
            ShowError(action.payload)
        })
        .addCase(createUserAsync.pending, (state) => {
            state.createUser.loading = true;
        })
        .addCase(createUserAsync.fulfilled, (state, action) => {
            state.createUser.loading = false;
            state.createUser.success = true;
            ShowSuccessResponse(action.payload.message)
        })
        .addCase(createUserAsync.rejected, (state, action) => {
            state.createUser.loading = false;
            ShowError(action.payload)
        })
    }
})

export const { SET_USER, CLEAR_USER, CLEAR_USER_CREATE , CLEAR_USER_DELETE, CLEAR_GET_USER_DETAILS_ERROR, CLEAR_USER_MESSAGE, CLEAR_USER_ERROR } = UserSlice.actions
export default UserSlice.reducer
