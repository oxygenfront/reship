import { createSlice } from '@reduxjs/toolkit'
import { getFavoritesFromLs } from '../../utils/getFavoritesFromLs'

const { favorites } = getFavoritesFromLs()

const initialState = {
  favorites,
  status: 'loading', // 'loading', 'success', 'error'
}

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action) {
      state.favorites.push(action.payload)
    },

    removeFavorite(state, action) {
      state.favorites = state.favorites.filter(
        (obj) => obj.id !== action.payload
      )
    },
    clearFavorite(state) {
      state.items = []
    },
  },
})

export const selectFavorites = (state) => state.favorites

export const { addFavorite, removeFavorite, clearFavorite } =
  favoriteSlice.actions

export default favoriteSlice.reducer
