import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchNewItem = createAsyncThunk(
  'auth/fetchNewItem',
  async (params) => {
    const { data } = await axios.post('/createProduct', params)
    return data
  }
)
export const fetchChangeItem = createAsyncThunk(
  'auth/fetchChangeItem',
  async (params) => {
    const { data } = await axios.post('/changeProduct', params)
    return data
  }
)
export const fetchDeleteItem = createAsyncThunk(
  'auth/fetchDeleteItem',
  async (id) => {
    console.log(id)
    const { data } = await axios.post('/deleteProduct', id)
    return data
  }
)
export const fetchGetPayments = createAsyncThunk(
  'auth/fetchGetPayments',
  async (token) => {
    console.log(token)
    const { data } = await axios.post('/getPayments', token)
    return data
  }
)
export const fetchAcceptPayment = createAsyncThunk(
  'auth/fetchAcceptPayment',
  async (params) => {
    console.log(params)
    const { data } = await axios.post('/acceptPayment', params)
    console.log(data)
    return data
  }
)
export const fetchAllOrders = createAsyncThunk(
  'auth/fetchAllOrders',
  async (token) => {
    console.log(token)
    const { data } = await axios.post('/getOrdersAll', token)
    console.log(data)
    return data
  }
)
export const fetchAllPromocodes = createAsyncThunk(
  'auth/fetchAllPromocodes',
  async (token) => {
    console.log(token)
    const { data } = await axios.post('/getAllPromocodes', token)
    console.log(data)
    return data
  }
)
export const fetchAddPromocode = createAsyncThunk(
  'auth/fetchAddPromocode',
  async (params) => {
    console.log(params)
    const { data } = await axios.post('/addPromocode', params)
    console.log(data)
    return data
  }
)

const initialState = {
  data: null,
  orders: null,
  promocodes: null,
  ordersStatus: 'loading',
  status: 'loading',
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchNewItem.pending, (state, action) => {
      state.status = 'loading'
      state.data = null
    })
    builder.addCase(fetchNewItem.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchNewItem.rejected, (state, action) => {
      state.status = 'error'
      state.data = null
    })
    builder.addCase(fetchChangeItem.pending, (state, action) => {
      state.status = 'loading'
      state.data = null
    })
    builder.addCase(fetchChangeItem.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchChangeItem.rejected, (state, action) => {
      state.status = 'error'
      state.data = null
    })
    builder.addCase(fetchDeleteItem.pending, (state, action) => {
      state.status = 'loading'
      state.data = null
    })
    builder.addCase(fetchDeleteItem.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchDeleteItem.rejected, (state, action) => {
      state.status = 'error'
      state.data = null
    })
    builder.addCase(fetchGetPayments.pending, (state, action) => {
      state.status = 'loading'
      state.data = null
    })
    builder.addCase(fetchGetPayments.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchGetPayments.rejected, (state, action) => {
      state.status = 'error'
      state.data = null
    })
    builder.addCase(fetchAllOrders.pending, (state, action) => {
      state.ordersStatus = 'loading'
      state.orders = null
    })
    builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
      state.orders = action.payload
      state.ordersStatus = 'success'
    })
    builder.addCase(fetchAllOrders.rejected, (state, action) => {
      state.ordersStatus = 'error'
      state.orders = null
    })
    builder.addCase(fetchAllPromocodes.pending, (state, action) => {
      state.status = 'loading'
      state.promocodes = null
    })
    builder.addCase(fetchAllPromocodes.fulfilled, (state, action) => {
      state.promocodes = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchAllPromocodes.rejected, (state, action) => {
      state.status = 'error'
      state.promocodes = null
    })
  },
})

export const selectAdminData = (state) => state.admin

export default adminSlice.reducer
