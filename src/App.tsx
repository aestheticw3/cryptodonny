import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorMsg from "./components/ErrorMsg";
import Header from "./components/Header";
import Main from "./components/Main";
import Settings from "./components/Settings";
import { useMetaMask } from "./hooks/useMetaMask";

const App = () => {
	const { error } = useMetaMask();
	return (
		<BrowserRouter>
			<Header />
			<main className="min-h-screenWithoutHeader ">
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="settings" element={<Settings />} />
				</Routes>
			</main>
			{error && <ErrorMsg />}
		</BrowserRouter>
	);
};

export default App;
