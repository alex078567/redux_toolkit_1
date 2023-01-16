import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import modalReducer from "./features/modal/modalSlice";
//конфигурируем хранилище и добавляем в него пользовательские редюсеры
export const store = configureStore({

	reducer: {
		cart: cartReducer,
		modal: modalReducer,
	},
});
