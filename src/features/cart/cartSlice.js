import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const url = "https://course-api.com/react-useReducer-cart-project";
const initialState = {
	cartItems: [],
	amount: 2,
	total: 0,
	isLoading: true,
};

export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
	return fetch(url)
		.then((resp) => resp.json())
		.catch((err) => console.log(err));
});

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		clearCart: (state) => {
			state.cartItems = [];
		},
		removeItem: (state, action) => {
			console.log(action);
			state.cartItems = state.cartItems.filter((item) => {
				return item.id !== action.payload;
			});
		},
		increase: (state, { payload }) => {
			console.log(payload);
			state.cartItems = state.cartItems.map((item) => {
				if (item.id === payload) {
					item.amount += 1;
				}
				return item;
			});
		},
		decrease: (state, { payload }) => {
			console.log(payload);
			state.cartItems = state.cartItems.map((item) => {
				if (item.id === payload) {
					item.amount -= 1;
				}
				return item;
			});
		},
		calculateTotals: (state) => {
			let amount = 0;
			let total = 0;
			state.cartItems.forEach((item) => {
				amount += item.amount;
				total += item.amount * item.price;
			});
			state.amount = amount;
			state.total = +total.toFixed(2);
		},
	},
	extraReducers: {
		[getCartItems.pending]: (state) => {
			state.isLoading = true;
		},
		[getCartItems.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.cartItems = action.payload;
		},
		[getCartItems.rejected]: (state) => {
			state.isLoading = false;
		},
	},
});

//console.log(cartSlice);
export const { clearCart, removeItem, increase, decrease, calculateTotals } =
	cartSlice.actions;
export default cartSlice.reducer;
