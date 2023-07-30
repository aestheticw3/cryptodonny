import Header from "./components/Header";
import Main from "./components/Main";
import { MetaMaskContextProvider } from "./hooks/useMetaMask";

const App = () => {
	return (
		<MetaMaskContextProvider>
			<Header />
			<main>
				<Main />
			</main>
		</MetaMaskContextProvider>
	);
};

export default App;
