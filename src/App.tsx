import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Alerts from "./components/Alerts";
import ErrorMsg from "./components/ErrorMsg";
import Header from "./components/Header";
import Main from "./components/Main";
import Settings from "./components/Settings";

import { MetaMaskContextProvider } from "./providers/MetaMaskProvider";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<div className="bg-firefly">
							<MetaMaskContextProvider>
								<Header />
								<main className="flex justify-center items-center  h-[100dvh] w-11/12 mx-auto">
									<Outlet />
								</main>
								<ErrorMsg />
							</MetaMaskContextProvider>
						</div>
					}
				>
					<Route index element={<Main />} />
					<Route path="settings" element={<Settings />} />
				</Route>

				<Route path="alerts/:addressWithSign" element={<Alerts />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
