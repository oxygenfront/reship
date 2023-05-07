import { createSlice } from '@reduxjs/toolkit'
import { getTheme } from '../../utils/getTheme'



const initialState = getTheme()

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    set: (state, action) => action.payload,
  },
})

export const { set } = themeSlice.actions

export default themeSlice.reducer