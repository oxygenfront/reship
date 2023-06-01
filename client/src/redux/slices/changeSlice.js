import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchChangeBasic = createAsyncThunk(
  'auth/fetchChangeBasic',
  async (params) => {
    const { data } = await axios.post('/changeBasicInfo', params)
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
    
  },
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
  },
})

export const {} = changeSlice.actions

export default changeSlice.reducer
