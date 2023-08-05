import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Alerts from "./components/Alerts";
import ErrorMsg from "./components/ErrorMsg";
import Header from "./components/Header";
import Main from "./components/Main";
import Settings from "./components/Settings";
import { useMetaMask } from "./hooks/useMetaMask";

const App = () => {
	const { error } = useMetaMask();

	// TODO: Remove <Header /> from <Alerts />

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<>
							<Header />
							<main className="flex justify-center items-center h-[100dvh] w-11/12 mx-auto">
								<Outlet />
							</main>
						</>
					}
				>
					<Route index element={<Main />} />
					<Route path="settings" element={<Settings />} />
					{error && <ErrorMsg />}
				</Route>

				<Route path="alerts/:addressWithSign" element={<Alerts />} />
			</Routes>
		</BrowserRouter>

		// <BrowserRouter>
		// 	<Header />
		// 	<main className="flex justify-center items-center h-[100dvh] w-11/12 mx-auto">
		// 		<Routes>
		// 			<Route path="/" element={<Main />} />
		// 			<Route path="/settings" element={<Settings />} />
		// 			<Route path="/alerts/:addressWithSign" element={<Alerts />} />
		// 		</Routes>
		// 	</main>
		// 	{error && <ErrorMsg />}
		// </BrowserRouter>
	);
};

export default App;
