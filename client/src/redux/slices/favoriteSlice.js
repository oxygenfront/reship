import { createSlice } from "@reduxjs/toolkit";
import { getFavoritesFromLs } from "../../utils/getFavoritesFromLs";
import { isEqual } from "lodash";

const { favorites } = getFavoritesFromLs();

const initialState = {
	favorites,
	status: "loading", // 'loading', 'success', 'error'
};

const favoriteSlice = createSlice({
	name: "favorites",
	initialState,
	reducers: {
		addFavorite(state, action) {
			state.favorites.push(action.payload);
		},

		removeFavorite(state, action) {
			state.favorites = state.favorites.filter((obj) => {
				if (action.payload.category === "Клавиатуры") {
					return !isEqual({ ...obj.parameters }, action.payload.parameters);
				} else {
					return obj.id !== action.payload.id;
				}
			});
		},
		clearFavorite(state) {
			state.items = [];
		},
	},
});

export const selectFavorites = (state) => state.favorites;

export const { addFavorite, removeFavorite, clearFavorite } =
	favoriteSlice.actions;

export default favoriteSlice.reducer;
