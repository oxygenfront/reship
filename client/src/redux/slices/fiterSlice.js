import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  choosenCategorie: 'none',
  choosenSort: '',
  searchValue: '',
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setChoosenCategorie(state, action) {
      state.choosenCategorie = action.payload
    },
    setChoosenSort(state, action) {
      state.choosenSort = action.payload
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload
    },
  },
})

export const selectFilter = (state) => state.filter
export const selectSort = (state) => state.filter.choosenSort

export const { setChoosenCategorie, setChoosenSort, setSearchValue } =
  filterSlice.actions
export default filterSlice.reducer
