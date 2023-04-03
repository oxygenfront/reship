import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchChangePassword = createAsyncThunk(
  'auth/fetchChangePassword',
  async (params) => {
    const { data } = await axios.post('/changePassword', params)
    return data
  }
)
export const fetchChangeEmail = createAsyncThunk(
  'auth/fetchChangeEmail',
  async (params) => {
    const { data } = await axios.post(`/changeEmail`, params)
    console.log(data)
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
  reducers: {
    logout: (state) => {
      state.data = null
    },
  },
  extraReducers: (builder) => {
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
    builder.addCase(fetchChangeEmail.pending, (state, action) => {
      state.status = 'loading'
      state.data = null
    })
    builder.addCase(fetchChangeEmail.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchChangeEmail.rejected, (state, action) => {
      state.status = 'error'
      state.data = null
    })
  },
})

export const {} = changeSlice.actions

export default changeSlice.reducer
