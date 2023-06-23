import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchCreateReview = createAsyncThunk(
  'comment/fetchCreateReview',
  async (params) => {
    console.log(params)
    const { data } = await axios.post(`/createReview`)
    console.log(data)

    return data
  }
)
export const fetchGetReviewsForProductId = createAsyncThunk(
  'comment/fetchGetReviewForProductId',
  async ({ token, id }) => {
    const { data } = await axios.get(
      `/getReviewsForProductId?&token=${token}&product_id${id}`
    )
    console.log(data)

    return data
  }
)
export const fetchGetReviewsFromAuthor = createAsyncThunk(
  'comment/fetchGetReviewsFromAuthor',
  async ({ token }) => {
    const { data } = await axios.get(`/getReviewsFromAuthor?&token=${token}`)
    console.log(data)

    return data
  }
)

const initialState = {
  data: null,
  status: 'loading', // 'loading', 'success', 'error'
}
const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCreateReview.pending, (state, action) => {
      state.status = 'loading'
      state.data = []
    })
    builder.addCase(fetchCreateReview.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchCreateReview.rejected, (state, action) => {
      console.log(action)
      state.status = 'error'
      state.data = []
    })
    builder.addCase(fetchGetReviewsForProductId.pending, (state, action) => {
      state.status = 'loading'
      state.data = []
    })
    builder.addCase(fetchGetReviewsForProductId.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchGetReviewsForProductId.rejected, (state, action) => {
      console.log(action)
      state.status = 'error'
      state.data = []
    })
    builder.addCase(fetchGetReviewsFromAuthor.pending, (state, action) => {
      state.status = 'loading'
      state.data = []
    })
    builder.addCase(fetchGetReviewsFromAuthor.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchGetReviewsFromAuthor.rejected, (state, action) => {
      console.log(action)
      state.status = 'error'
      state.data = []
    })
  },
})

export const selectCommentsData = (state) => state.comment

export const {} = commentSlice.actions

export default commentSlice.reducer
