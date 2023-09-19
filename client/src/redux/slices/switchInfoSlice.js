import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchInfoSwitch = createAsyncThunk(
	"getSwitchData",
	async ({ id }) => {
		const { data } = await axios.get(`getSwitches?id=${id}`);
		return data;
	}
);

const initialState = {
	status: "loading", // error, success, loading
	item: {
		title: "",
		color: "",
		type: "",
		description: "",
		force_actuation: 0,
		force_limit: 0,
		power_tactical: 0,
		path_length: 0,
	},
};

const switchInfoSlice = createSlice({
	name: "switchInfo",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchInfoSwitch.pending, (state, action) => {
			state.status = "loading";
			state.item = {
				title: "",
				color: "",
				type: "",
				description: "",
				force_actuation: 0,
				force_limit: 0,
				power_tactical: 0,
				path_length: 0,
			};
		});
		builder.addCase(fetchInfoSwitch.fulfilled, (state, action) => {
			state.item = action.payload;
			state.status = "success";
		});
		builder.addCase(fetchInfoSwitch.rejected, (state, action) => {
			state.status = "error";
			state.item = {
				title: "",
				color: "",
				type: "",
				description: "",
				force_actuation: 0,
				force_limit: 0,
				power_tactical: 0,
				path_length: 0,
			};
		});
	},
});
export const selectSwitchInfoData = (state) => state.switchInfo;
export default switchInfoSlice.reducer;
