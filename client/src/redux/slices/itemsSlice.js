import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async ({
    choosenCategorie,
    searchValue,
    choosenPrice,
    choosenBrand,
    choosenType,
    catalogSort,
  }) => {
    const { data } = await axios.get(
      `/getProducts?&categories=${choosenCategorie}&search=${searchValue}&price_start=${
        choosenPrice !== '' ? choosenPrice[0] : ''
      }&price_end=${
        choosenPrice !== '' ? choosenPrice[1] : ''
      }&brand=${choosenBrand}&types=${choosenType}&sort=${catalogSort}&popularity=${
        typeof catalogSort === Number ? catalogSort : ''
      }`
    )

    return data
  }
)
export const fetchHomeItems = createAsyncThunk(
  'items/fetchHomeItems',
  async ({ choosenType }) => {
    const { data } = await axios.get(`/getProducts?&types=${choosenType}`)

    return data
  }
)

const initialState = {
  homeItems: [],
  homeStatus: 'loading',
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
      state.status = 'error'
      state.items = []
    })
    builder.addCase(fetchHomeItems.pending, (state, action) => {
      state.homeStatus = 'loading'
      state.homeItems = []
    })
    builder.addCase(fetchHomeItems.fulfilled, (state, action) => {
      state.homeItems = action.payload
      state.homeStatus = 'success'
    })
    builder.addCase(fetchHomeItems.rejected, (state, action) => {
      state.homeStatus = 'error'
      state.homeItems = []
    })
  },
})

export const selectItemsData = (state) => state.items

export const {} = ItemsSlice.actions

export default ItemsSlice.reducer
