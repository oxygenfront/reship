import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchChangeBasic = createAsyncThunk(
  'auth/fetchChangeBasic',
  async (params) => {
    const { data } = await axios.post('/changeBasicInfo', params)
    return data
  }
)
export const fetchChangePassword = createAsyncThunk(
  'auth/fetchChangePassword',
  async (params) => {
    const { data } = await axios.post('/changePassword', params)
    return data
  }
)
export const fetchChangeDelivery = createAsyncThunk(
  'auth/fetchChangeDelivery',
  async (params) => {
    const { data } = await axios.post('/changeDelivery', params)
    return data
  }
)
export const fetchChangeName = createAsyncThunk(
  'auth/fetchChangeName',
  async (params) => {
    const { data } = await axios.post('/changeUserName', params)
    return data
  }
)

const initialState = {
  data: null,
  status: 'loading',
}

const changeSlice = createSlice({
  name: 'change',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChangeBasic.pending, (state, action) => {
      state.status = 'loading'
      state.data = null
    })
    builder.addCase(fetchChangeBasic.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchChangeBasic.rejected, (state, action) => {
      state.status = 'error'
      state.data = null
    })
    builder.addCase(fetchChangePassword.pending, (state, action) => {
      state.status = 'loading'
      state.data = null
    })
    builder.addCase(fetchChangePassword.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchChangePassword.rejected, (state, action) => {
      state.status = 'error'
      state.data = null
    })
    builder.addCase(fetchChangeName.pending, (state, action) => {
      state.status = 'loading'
      state.data = null
    })
    builder.addCase(fetchChangeName.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchChangeName.rejected, (state, action) => {
      state.status = 'error'
      state.data = null
    })
  },
})

export const {} = changeSlice.actions

export default changeSlice.reducer
