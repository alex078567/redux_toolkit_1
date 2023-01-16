import { useEffect } from "react";
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import { useSelector, useDispatch } from "react-redux";
// импорт функций редюсера из слайса cartSlice
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";
import Modal from "./components/Modal";
function App() {
	// с помощью хука useSelector получаем данные о состоянии (state) из хранилища Redux (store)
	const { cartItems, isLoading } = useSelector((state) => state.cart);
	const { isOpen } = useSelector((state) => state.modal);
	const dispatch = useDispatch();
	//Пересчитать общую сумму и количество предметов в корзине, каждый раз,
	//когда ее содержимое изменяется.
	useEffect(() => {
		dispatch(calculateTotals());
	}, [cartItems]);

	//загрузить данные с помощью fetch запроса, 
	//когда компонент монтируется на странице
	useEffect(() => {
		dispatch(getCartItems());
	}, []);
	// если данные загружаются
	if (isLoading) {
		return (
			<div className="loading">
				<h1>Loading...</h1>
			</div>
		);
	}
	// если данные загрузились
	return (
		<main>
			{/* В зависимости от того нажата ли кнопка clearCart 
			отобразить модальное окно*/}
			{isOpen && <Modal />}
			<Navbar />
			<CartContainer />
		</main>
	);
}
export default App;
