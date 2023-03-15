import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async ({ choosenCategorie }) => {
    const { data } = await axios.get(
      `/getProducts?category=${choosenCategorie}`
    )

    return data
  }
)

const initialState = {
  items: [],
  status: 'loading', // 'loading', 'success', 'error'
}
const ItemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state, action) => {
      state.status = 'loading'
      state.items = []
    })
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchItems.rejected, (state, action) => {
      console.log(action)
      state.status = 'error'
      state.items = []
    })
  },
})

export const selectItemsData = (state) => state.items

export const {} = ItemsSlice.actions

export default ItemsSlice.reducer
