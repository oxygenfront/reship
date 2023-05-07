import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { calcTotalPrice } from '../../utils/calcTotalPrice'
import { getCartFromLS } from '../../utils/getCartFromLs'
import axios from '../../axios'

const { cartItems } = getCartFromLS()
export const fetchCheckPromocode = createAsyncThunk(
  'auth/fetchCheckPromocode',
  async (params) => {
    console.log(params)
    const { data } = await axios.post('/checkPromocode', params)
    return data
  }
)

const initialState = {
  cartItems,
  status: 'loading',
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.cartItems.find(
        (obj) => obj.id === action.payload.id
      )
      if (findItem) {
        findItem.count++
      } else {
        state.cartItems.push({ ...action.payload, count: 1 })
      }
      state.totalPrice = calcTotalPrice(state.cartItems)
    },
    removeItem(state, action) {
      state.cartItems = state.cartItems.filter(
        (obj) => obj.id !== action.payload
      )
      state.totalPrice = calcTotalPrice(state.cartItems)
    },
    minusItem(state, action) {
      const findItem = state.cartItems.find((obj) => obj.id === action.payload)
      if (findItem) {
        findItem.count--
      }
      state.totalPrice = calcTotalPrice(state.cartItems)
    },
    clearItems(state) {
      state.cartItems = []
      state.totalPrice = 0
    },
  },
})

export const selectCart = (state) => state.cart
export const selectCartItemById = (id) => (state) =>
  state.cart.cartItems.find((obj) => obj.id === id)

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer
