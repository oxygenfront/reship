import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchCreateReview = createAsyncThunk(
  'comment/fetchCreateReview',
  async (params) => {
    console.log(params)
    const { data } = await axios.post(`/createReview`, params)
    console.log(data)

    return data
  }
)
export const fetchGetReviewsForProductId = createAsyncThunk(
  'comment/fetchGetReviewForProductId',
  async ({ token, id }) => {
    console.log(token, id)
    const { data } = await axios.get(
      `/getReviewsForProductId?&token=${token}&product_id=${id}`
    )
    console.log(data)

    return data
  }
)
export const fetchGetReviewsFromAuthor = createAsyncThunk(
  'comment/fetchGetReviewsFromAuthor',
  async (token) => {
    const { data } = await axios.get(`/getReviewsFromAuthor?&token=${token}`)
    console.log(data)

    return data
  }
)

const initialState = {
  data: null,
  commentsStatus: 'loading', // 'loading', 'success', 'error'
  comments: [],
  arrStatus: 'loading',
}
const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCreateReview.pending, (state, action) => {
      state.commentsStatus = 'loading'
      state.data = []
    })
    builder.addCase(fetchCreateReview.fulfilled, (state, action) => {
      state.data = action.payload
      state.commentsStatus = 'success'
    })
    builder.addCase(fetchCreateReview.rejected, (state, action) => {
      console.log(action)
      state.commentsStatus = 'error'
      state.data = []
    })
    builder.addCase(fetchGetReviewsForProductId.pending, (state, action) => {
      state.arrStatus = 'loading'
      state.comments = []
    })
    builder.addCase(fetchGetReviewsForProductId.fulfilled, (state, action) => {
      state.comments = action.payload
      state.arrStatus = 'success'
    })
    builder.addCase(fetchGetReviewsForProductId.rejected, (state, action) => {
      console.log(action)
      state.arrStatus = 'error'
      state.comments = []
    })
    builder.addCase(fetchGetReviewsFromAuthor.pending, (state, action) => {
      state.commentsStatus = 'loading'
      state.comments = []
    })
    builder.addCase(fetchGetReviewsFromAuthor.fulfilled, (state, action) => {
      state.comments = action.payload
      state.commentsStatus = 'success'
    })
    builder.addCase(fetchGetReviewsFromAuthor.rejected, (state, action) => {
      console.log(action)
      state.commentsStatus = 'error'
      state.comments = []
    })
  },
})

export const selectCommentsData = (state) => state.comment

export const {} = commentSlice.actions

export default commentSlice.reducer
