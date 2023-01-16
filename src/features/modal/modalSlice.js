import { createSlice } from "@reduxjs/toolkit";

//Начальное состояние слайса
const initialState = {
	isOpen: false,
};

// создаем слайс
const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openModal: (state, action) => {
			state.isOpen = true;
		},
		closeModal: (state, action) => {
			state.isOpen = false;
		},
	},
});
// В Redux Toolkit нет необходимости вызывать функцию dispatch 
// с типом действия (action). Вместо этого происходит импорт 
// функций редюсера, которые вызываются, если необходимо изменить состояние (state)
export const { openModal, closeModal } = modalSlice.actions;
//default import (импорт по умолчанию) редюсера
export default modalSlice.reducer;
