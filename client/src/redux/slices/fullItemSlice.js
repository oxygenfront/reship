import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "../../axios";

export const fetchFullItem = createAsyncThunk(
	"fullItem/getFullItem",
	async ({ id }) => {
		const { data } = await axios.get(`/getProductById/${id}`);
		return data;
	}
);

const initialState = {
	item: { price: 0, image: "", name: "" },
	status: "loading", // 'loading', 'success', 'error'
};

const fullItemSlice = createSlice({
	name: "fullItem",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchFullItem.pending, (state, action) => {
			state.status = "loading";
			state.item = { price: 0, image: "", name: "" };
		});
		builder.addCase(fetchFullItem.fulfilled, (state, action) => {
			state.item = action.payload;
			state.status = "success";
		});
		builder.addCase(fetchFullItem.rejected, (state, action) => {
			state.status = "error";
			state.item = { price: 0, image: "", name: "" };
		});
	},
});

export const selectFullItemData = (state) => state.fullItem;

export default fullItemSlice.reducer;
