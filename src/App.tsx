import Header from "./components/Header";
import Main from "./components/Main";
import { MetaMaskContextProvider } from "./providers/MetaMaskProvider";

// TODO: Add react-router-dom or something like that

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
