import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios'

export const fetchFullPizza = createAsyncThunk(
  'pizza/getFullPizza',
  async ({ id }) => {
    const { data } = await axios.get('url/items' + id)
    console.log(id)
    console.log(data)

    return data
  }
)

const initialState = {
  item: { price: 0, image: '', name: '' },
  status: 'loading', // 'loading', 'success', 'error'
}

const fullPizzaSlice = createSlice({
  name: 'fullPizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFullPizza.pending, (state, action) => {
      state.status = 'loading'
      state.item = { price: 0, image: '', name: '' }
    })
    builder.addCase(fetchFullPizza.fulfilled, (state, action) => {
      state.item = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchFullPizza.rejected, (state, action) => {
      state.status = 'error'
      state.item = { price: 0, image: '', name: '' }
    })
  },
})

export const selectFullPizzaData = (state) => state.fullPizza
export const {} = fullPizzaSlice.actions

export default fullPizzaSlice.reducer
