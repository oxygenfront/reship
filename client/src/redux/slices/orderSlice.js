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
    const { data } = await axios.post(
      `/getOrdersByCustomerId?&type=${id.type}`,
      id
    )

    return data
  }
)

const initialState = {
  data: null,
  status: 'loading',
  orders: [],
  ordersStatus: 'loading',
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
    builder.addCase(fetchGetOrdersById.pending, (state, action) => {
      state.ordersStatus = 'loading'
      state.orders = []
    })
    builder.addCase(fetchGetOrdersById.fulfilled, (state, action) => {
      state.orders = action.payload
      state.ordersStatus = 'success'
    })
    builder.addCase(fetchGetOrdersById.rejected, (state, action) => {
      state.ordersStatus = 'error'
      state.orders = []
    })
  },
})

export const selectOrderData = (state) => state.order

export default orderSlice.reducer
