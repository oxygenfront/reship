import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
  const { data } = await axios.post('/auth', params)
  return data
})
export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await axios.get(`/getUser`)
  console.log(data)

  return data
})
export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async (params) => {
    const { data } = await axios.post('/registration', params)
    return data
  }
)

const initialState = {
  data: null,
  status: 'loading',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state, action) => {
      state.status = 'loading'
      state.data = null
    })
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchAuth.rejected, (state, action) => {
      state.status = 'error'
      state.data = null
    })
    builder.addCase(fetchAuthMe.pending, (state, action) => {
      state.status = 'loading'
      state.data = null
    })
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchAuthMe.rejected, (state, action) => {
      state.status = 'error'
      state.data = null
    })
    builder.addCase(fetchRegister.pending, (state, action) => {
      state.status = 'loading'
      state.data = null
    })
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.status = 'error'
      state.data = null
    })
  },
})

export const { logout } = authSlice.actions
export const selectUserData = (state) => state.auth
export const selectIsAuth = (state) =>
  Boolean(state.auth.data && state.auth.data.bcode !== 4.3)

export default authSlice.reducer
