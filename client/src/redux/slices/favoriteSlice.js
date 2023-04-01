import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchAddFavorite = createAsyncThunk(
  'items/fetchAddFavorite',
  async (params) => {
    console.log(params)
    const { data } = await axios.post(`/addFavorites`, params)

    return data
  }
)
export const fetchDeleteFavorite = createAsyncThunk(
  'items/fetchDeleteFavorite',
  async (params) => {
    console.log(params)
    const { data } = await axios.post(`/deleteFavorites`, params)

    return data
  }
)

const initialState = {
  items: [],
  status: 'loading', // 'loading', 'success', 'error'
}
const favoriteSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
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

export const {} = favoriteSlice.actions

export default favoriteSlice.reducer
