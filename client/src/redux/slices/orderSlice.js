import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchCreateOrder = createAsyncThunk(
  'order/fetchCreateOrder',
  async (params) => {
    console.log(params)
    const { data } = await axios.post('/createOrder', params)
    console.log(data)
    return data
  }
)
export const fetchGetOrdersById = createAsyncThunk(
  'order/fetchGetOrderById',
  async (id) => {
    console.log(id)
    const { data } = await axios.get('/getOrdersByCustomerId', id)
    console.log(data)
    return data
  }
)

const initialState = {
  data: null,
  status: 'loading',
}

const orderSlice = createSlice({
  name: 'order',
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchCreateOrder.pending, (state, action) => {
      state.status = 'loading'
      state.data = null
    })
    builder.addCase(fetchCreateOrder.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchCreateOrder.rejected, (state, action) => {
      state.status = 'error'
      state.data = null
    })
  },
})

export default orderSlice.reducer
