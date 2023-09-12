import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { getCartFromLS } from "../../utils/getCartFromLs";
import { isEqual } from "lodash";
import axios from "../../axios";

const { cartItems } = getCartFromLS();
export const fetchCheckPromocode = createAsyncThunk(
	"auth/fetchCheckPromocode",
	async (params) => {
		const { data } = await axios.post("/checkPromocode", params);
		return data;
	}
);

const initialState = {
	cartItems,
	status: "loading",
};
const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem(state, action) {
			const findItem = state.cartItems.find(
				(obj) =>
					(obj.id === action.payload.id &&
						isEqual(obj.parameters, action.payload.parameters)) ||
					obj.cartId === action.payload.cartId
			);
			if (findItem) {
				findItem.count++;
			} else {
				state.cartItems.push({ ...action.payload, count: 1 });
			}
			state.totalPrice = calcTotalPrice(state.cartItems);
		},
		removeItem(state, action) {
			state.cartItems = state.cartItems.filter(
				(obj) =>
					obj.cartId !== action.payload &&
					obj.parameters !== action.payload.parameters
			);
			state.totalPrice = calcTotalPrice(state.cartItems);
		},
		removeItemFromFullItem(state, action) {
			state.cartItems = state.cartItems.filter(
				(obj) =>
					obj.name !== action.payload.name &&
					!isEqual(obj.parameters, action.payload.paramters)
			);
		},
		minusItem(state, action) {
			const findItem = state.cartItems.find(
				(obj) =>
					(obj.id === action.payload.id &&
						isEqual(obj.parameters, action.payload.parameters)) ||
					obj.cartId === action.payload.cartId
			);
			if (findItem) {
				findItem.count--;
			}
			state.totalPrice = calcTotalPrice(state.cartItems);
		},
		clearItems(state) {
			state.cartItems = [];
			state.totalPrice = 0;
		},
	},
});

export const selectCart = (state) => state.cart;
export const selectCartItemById = (name, parameters, color) => (state) =>
	state.cart.cartItems.find(
		(obj) =>
			isEqual(obj.parameters, parameters) &&
			obj.name === name &&
			obj.color === color
	);

export const {
	addItem,
	removeItem,
	removeItemFromFullItem,
	clearItems,
	minusItem,
} = cartSlice.actions;

export default cartSlice.reducer;
