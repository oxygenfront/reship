import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchNewItem = createAsyncThunk(
  'auth/fetchNewItem',
  async (params) => {
    const { data } = await axios.post('/createProduct', params)
    return data
  }
)
export const fetchChangeItem = createAsyncThunk(
  'auth/fetchChangeItem',
  async (params) => {
    const { data } = await axios.post('/changeProduct', params)
    return data
  }
)
export const fetchDeleteItem = createAsyncThunk(
  'auth/fetchDeleteItem',
  async (id) => {
    console.log(id)
    const { data } = await axios.post('/deleteProduct', id)
    return data
  }
)

const initialState = {
  data: null,
  status: 'loading',
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchNewItem.pending, (state, action) => {
      state.status = 'loading'
      state.data = null
    })
    builder.addCase(fetchNewItem.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchNewItem.rejected, (state, action) => {
      state.status = 'error'
      state.data = null
    })
    builder.addCase(fetchChangeItem.pending, (state, action) => {
      state.status = 'loading'
      state.data = null
    })
    builder.addCase(fetchChangeItem.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchChangeItem.rejected, (state, action) => {
      state.status = 'error'
      state.data = null
    })
    builder.addCase(fetchDeleteItem.pending, (state, action) => {
      state.status = 'loading'
      state.data = null
    })
    builder.addCase(fetchDeleteItem.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchDeleteItem.rejected, (state, action) => {
      state.status = 'error'
      state.data = null
    })
  },
})

export default adminSlice.reducer
