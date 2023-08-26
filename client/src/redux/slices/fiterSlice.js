import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  choosenCategorie: '',
  choosenSort: '',
  catalogSort: '',
  searchValue: '',
  choosenPrice: [0, 9999999],
  choosenBrand: '',
  choosenType: '',
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
    setCatalogSort(state, action) {
      state.catalogSort = action.payload
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload
    },
    setChoosenPrice(state, action) {
      state.choosenPrice = action.payload
    },
    setChoosenBrand(state, action) {
      state.choosenBrand = action.payload
    },
    setChoosenType(state, action) {
      state.choosenType = action.payload
    },
  },
})

export const selectFilter = (state) => state.filter
export const selectSort = (state) => state.filter.choosenSort

export const {
  setChoosenCategorie,
  setChoosenSort,
  setSearchValue,
  setChoosenPrice,
  setChoosenBrand,
  setChoosenType,
  setCatalogSort,
} = filterSlice.actions
export default filterSlice.reducer
