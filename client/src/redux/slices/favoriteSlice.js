import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'
import { getFavoritesFromLs } from '../../utils/getFavoritesFromLs'

export const fetchAddFavorite = createAsyncThunk(
  'items/fetchAddFavorite',
  async (params) => {
    const { data } = await axios.post(`/addFavorites`, params)

    return data
  }
)
export const fetchDeleteFavorite = createAsyncThunk(
  'items/fetchDeleteFavorite',
  async (params) => {
    const { data } = await axios.post(`/deleteFavorites`, params)

    return data
  }
)
// const { favorites } = localStorage.getItem('favorites')

const initialState = {
  items: [],
  status: 'loading', // 'loading', 'success', 'error'
}

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action) {
      state.items.push(action.payload)
    },

    removeFavorite(state, action) {
      console.log(action.payload)
      state.items = state.items.filter(
        (obj) => obj.product_id !== action.payload
      )
    },
    clearFavorite(state) {
      state.items = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddFavorite.pending, (state, action) => {
      state.status = 'loading'
      state.items = []
    })
    builder.addCase(fetchAddFavorite.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchAddFavorite.rejected, (state, action) => {
      console.log(action)
      state.status = 'error'
      state.items = []
    })
  },
})

export const selectFavoritesData = (state) => state.items

export const { addFavorite, removeFavorite, clearFavorite } =
  favoriteSlice.actions

export default favoriteSlice.reducer
