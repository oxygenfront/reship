import { createSlice } from '@reduxjs/toolkit'
import { calcTotalPrice } from '../../utils/calcTotalPrice'
import { getCartFromLS } from '../../utils/getCartFromLs'

const { items, totalPrice } = getCartFromLS()

const initialState = {
  items,
  totalPrice,
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
})

export const selectCart = (state) => state.cart
export const selectCartItemById = (id) => (state) =>
  state.cart.items.find((obj) => obj.id === id)

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer
