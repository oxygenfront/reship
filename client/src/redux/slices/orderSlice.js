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
  async (params) => {
    console.log(params)
    const { data } = await axios.get(
      `/getOrdersByCustomerId?&type=${params.type}&customer_id=${params.customer_id}&price_filter=${params.price}`
    )

    return data
  }
)
export const fetchGetPreviewPrice = createAsyncThunk(
  'order/fetchGetPreviewPrice',
  async (params) => {
    console.log(params)
    const { data } = await axios.get(
      `/getPreviewPriceOrder?&city=${params.city}&weight=${params.weight}&tariff_code=${params.tariff_code}`
    )
    console.log(data)

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
    builder.addCase(fetchGetPreviewPrice.pending, (state, action) => {
      state.status = 'loading'
      state.data = []
    })
    builder.addCase(fetchGetPreviewPrice.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchGetPreviewPrice.rejected, (state, action) => {
      state.status = 'error'
      state.data = []
    })
  },
})

export const selectOrderData = (state) => state.order

export default orderSlice.reducer
