import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//URL для отправки запроса
const url = "https://course-api.com/react-useReducer-cart-project";

//Начальное состояние слайса
const initialState = {
	cartItems: [],
	amount: 2,
	total: 0,
	isLoading: true,
};

// Для асинхронного запроса используется  функция createAsyncThunk()
export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
	return fetch(url)
		.then((resp) => resp.json())
		.catch((err) => console.log(err));
});


// создаем слайс
const cartSlice = createSlice({
	name: "cart",
	initialState,
	//редюсеры, позволяют изменять (мутировать) состояние (state)
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
	//для управления действиями(actions), которые создает createAsyncThunk() 
	//используется extraReducers. В зависимости от статуса промиса 
	//обновляется состояние(state)
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

// В Redux Toolkit нет необходимости вызывать функцию dispatch 
// с типом действия (action). Вместо этого происходит импорт 
// функций редюсера, которые вызываются, если необходимо изменить состояние (state)
export const { clearCart, removeItem, increase, decrease, calculateTotals } =
	cartSlice.actions;
//default import (импорт по умолчанию) редюсера
export default cartSlice.reducer;
