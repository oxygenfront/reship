import { configureStore } from '@reduxjs/toolkit'
import items from './slices/itemsSlice'
import cart from './slices/cartSlice'
import fullItem from './slices/fullItemSlice'
import auth from './slices/authSlice'

export const store = configureStore({
  reducer: { items, cart, fullItem, auth },
})
