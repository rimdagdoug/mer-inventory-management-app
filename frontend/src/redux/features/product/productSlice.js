import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productServicie';
import { toast } from "react-toastify";

const initialState = {
    product: null,
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};


//create new product
const createProduct = createAsyncThunk(
    "products/create",
    async (FormData, thunkAPI) => {
        try {
            return await productService.createProduct(FormData)
        } catch (error) {
            const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
            console.log(message)
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
        console.log("store value")
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(createProduct.pending,(state) => {
       state.isLoading = true 
    })
    .addCase(createProduct.fulfilled,(state, action) => {
        state.isLoading= false;
        state.isSuccess = true;
        console.log(action.payload)
        state.products.push(action.payload);
        toast.success("Product added successfuly")
    })
    .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
  }
});

export const {CALC_STORE_VALUE} = productSlice.actions

export default productSlice.reducer