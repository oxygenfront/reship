import { configureStore } from '@reduxjs/toolkit'
import items from './slices/itemsSlice'

export const store = configureStore({ reducer: { items } })
