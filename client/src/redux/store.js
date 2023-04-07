import { configureStore } from '@reduxjs/toolkit'
import items from './slices/itemsSlice'
import cart from './slices/cartSlice'
import fullItem from './slices/fullItemSlice'
import auth from './slices/authSlice'
import filter from './slices/fiterSlice'
import admin from './slices/adminSlice'
import favorite from './slices/favoriteSlice'
import change from './slices/changeSlice'
import order from './slices/orderSlice'

export const store = configureStore({
  reducer: {
    items,
    cart,
    fullItem,
    auth,
    filter,
    admin,
    favorite,
    change,
    order,
  },
})
