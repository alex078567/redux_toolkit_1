import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
	<React.StrictMode>
		{/* Оборачиваем приложения в провайдер, который делает
		хранилище redux доступным для вложенных компонентов */}
		<Provider store={store}>

			<App />
		</Provider>
	</React.StrictMode>
);
