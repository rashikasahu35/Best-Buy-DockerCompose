import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    getProductList,
    getProductDetails,
    getProductSearch,
    createProduct,
    deleteProduct,
    getAllProducts,
    updateProduct
} from "./ProductAPI";
import ShowError from "../../utils/ShowError";
import ShowSuccessResponse from "../../utils/ShowSuccessResponse";

const initialState = {
    productList: {
        loading: false,
        products: null,
        productCount: null,
    },
    productDetails: {
        loading: false,
        product: null,
    },
    productSearch: {
        loading: false,
        products: null,
        productCount: null,
    },
    productAll : {
        loading: false,
        products: null,
        productCount: null,
    },
    productCreate: {
        loading: false,
        success : false
    },
    productUpdate: {
        loading: false,
        product : null
    },
    productDelete : {
        loading : false,
        success : false
    }
};
export const getProductListAsync = createAsyncThunk(
    "PRODUCT_LIST",
    async ({ page, minPrice, maxPrice, category, sortBy, order }, thunkAPI) => {
        try {
            return await getProductList({
                page,
                minPrice,
                maxPrice,
                category,
                sortBy,
                order,
            });
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getProductDetailsAsync = createAsyncThunk(
    "PRODUCT_DETAILS",
    async (id, thunkAPI) => {
        try {
            return await getProductDetails(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const getProductSearchAsync = createAsyncThunk(
    "PRODUCT_SEARCH",
    async ({ query }, thunkAPI) => {
        try {
            return await getProductSearch({ query });
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// ---------------------------------- ADMIN ------------------------------
export const createProductAsync = createAsyncThunk(
    "ADMIN/PRODUCT_CREATE",
    async ({ name, description, noOfStock, price, category, images }, thunkAPI) => {
        try {
            return await createProduct({
                name,
                description,
                noOfStock,
                price,
                category,
                images,
            });
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateProductAsync = createAsyncThunk(
    "ADMIN/PRODUCT_UPDATE",
    async ({ id, name, description, noOfStock, price, category, images }, thunkAPI) => {
        try {
            return await updateProduct({
                id,
                name,
                description,
                noOfStock,
                price,
                category,
                images,
            });
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const deleteProductAsync = createAsyncThunk(
    "ADMIN/PRODUCT_DELETE",
    async (id, thunkAPI ) => {
        try {
            return await deleteProduct(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const getAllProductsAsync = createAsyncThunk(
    "ADMIN/PRODUCT_ALL",
    async (_, thunkAPI) => {
        try {
            return await getAllProducts();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const ProductListSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        CLEAR_PRODUCT_SEARCH: (state) => {
            state.productSearch = {
                loading: false,
                products: null,
                productCount: null,
            };
        },
        CLEAR_PRODUCT_CREATE : (state) => {
            state.productCreate.success = false
        },
        CLEAR_PRODUCT_DELETE : (state) => {
            state.productDelete.success = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductListAsync.pending, (state) => {
                state.productList.loading = true;
            })
            .addCase(getProductListAsync.fulfilled, (state, action) => {
                state.productList = {
                    loading: false,
                    products: action.payload.response,
                    productCount: action.payload.productCount,
                };
            })
            .addCase(getProductListAsync.rejected, (state, action) => {
                state.productList.loading = false;
                ShowError(action.payload);
            })
            .addCase(getProductDetailsAsync.pending, (state) => {
                state.productDetails.loading = true;
            })
            .addCase(getProductDetailsAsync.fulfilled, (state, action) => {
                state.productDetails = {
                    loading: false,
                    product: action.payload,
                };
            })
            .addCase(getProductDetailsAsync.rejected, (state, action) => {
                state.productDetails.loading = false;
                ShowError(action.payload);
            })
            .addCase(getProductSearchAsync.pending, (state) => {
                state.productSearch.loading = true;
            })
            .addCase(getProductSearchAsync.fulfilled, (state, action) => {
                state.productSearch = {
                    loading: false,
                    products: action.payload.response,
                    productCount: action.payload.productCount,
                };
            })
            .addCase(getProductSearchAsync.rejected, (state, action) => {
                state.productSearch.loading = false;
                ShowError(action.payload);
            })
            .addCase(createProductAsync.pending, (state) => {
                state.productCreate.loading = true;
            })
            .addCase(createProductAsync.fulfilled, (state, action) => {
                state.productCreate.loading = false;
                state.productCreate.success = true;
                ShowSuccessResponse(action.payload.message);
            })
            .addCase(createProductAsync.rejected, (state, action) => {
                state.productCreate.loading = false;
                ShowError(action.payload);
            })
            .addCase(updateProductAsync.pending, (state) => {
                state.productUpdate.loading = true;
            })
            .addCase(updateProductAsync.fulfilled, (state, action) => {
                state.productUpdate.loading = false;
                ShowSuccessResponse(action.payload.message);
            })
            .addCase(updateProductAsync.rejected, (state, action) => {
                state.productUpdate.loading = false;
                ShowError(action.payload);
            })
            .addCase(deleteProductAsync.pending, (state) => {
                state.productDelete.loading = true;
            })
            .addCase(deleteProductAsync.fulfilled, (state, action) => {
                state.productDelete.loading = false;
                state.productDelete.success = true
                ShowSuccessResponse(action.payload.message);
            })
            .addCase(deleteProductAsync.rejected, (state, action) => {
                state.productDelete.loading = false;
                ShowError(action.payload);
            })
            .addCase(getAllProductsAsync.pending, (state) => {
                state.productAll.loading = true;
            })
            .addCase(getAllProductsAsync.fulfilled, (state, action) => {
                state.productAll = {
                    loading: false,
                    products: action.payload.response,
                    productCount: action.payload.productCount,
                };
            })
            .addCase(getAllProductsAsync.rejected, (state, action) => {
                state.productAll.loading = false;
                ShowError(action.payload);
            })
    },
});

export default ProductListSlice.reducer;
export const { CLEAR_PRODUCT_SEARCH , CLEAR_PRODUCT_CREATE, CLEAR_PRODUCT_DELETE} = ProductListSlice.actions;
