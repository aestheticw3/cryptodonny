import ErrorMsg from "./components/ErrorMsg";
import Header from "./components/Header";
import Main from "./components/Main";
import { useMetaMask } from "./hooks/useMetaMask";

// TODO: Add react-router-dom or something like that

const App = () => {
	const { error } = useMetaMask();
	return (
		<>
			<Header />
			<main>
				<Main />
			</main>
			{error && <ErrorMsg />}
		</>
	);
};

export default App;
