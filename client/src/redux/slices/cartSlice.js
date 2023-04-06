import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { calcTotalPrice } from '../../utils/calcTotalPrice'
import { getCartFromLS } from '../../utils/getCartFromLs'

import axios from '../../axios'

const { items } = getCartFromLS()

export const fetchAddCartItem = createAsyncThunk(
  '/fetchAddCartItem',
  async (params) => {
    console.log(params)
    const { data } = axios.post('/addBasket', params)
    console.log(data)
    return data
  }
)
export const fetchDeleteCartItem = createAsyncThunk(
  '/fetchDeleteCartItem',
  async (params) => {
    console.log(params)
    const { data } = axios.post('/deleteBasket', params)
    console.log(data)
    return data
  }
)

const initialState = {
  items,
  // status: 'loading',
  totalPrice: 0,
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({ ...action.payload, count: 1 })
      }
      state.totalPrice = calcTotalPrice(state.items)
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload)
      state.totalPrice = calcTotalPrice(state.items)
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload)
      if (findItem) {
        findItem.count--
      }
      state.totalPrice = calcTotalPrice(state.items)
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddCartItem.pending, (state, action) => {
      state.status = 'loading'
      state.items = []
    })
    builder.addCase(fetchAddCartItem.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchAddCartItem.rejected, (state, action) => {
      state.status = 'error'
      state.items = []
    })
    builder.addCase(fetchDeleteCartItem.pending, (state, action) => {
      state.status = 'loading'
      state.items = []
    })
    builder.addCase(fetchDeleteCartItem.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchDeleteCartItem.rejected, (state, action) => {
      state.status = 'error'
      state.items = []
    })
  },
})

export const selectCart = (state) => state.cart
export const selectCartItemById = (id) => (state) =>
  state.cart.items.find((obj) => obj.id === id)

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer
