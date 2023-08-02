import { useMetaMask } from "../hooks/useMetaMask";

const ErrorMsg = () => {
	const { errorMessage, clearError } = useMetaMask();

	return (
		<div
			className="fixed bottom-3 left-0 right-0 mx-auto rounded-full px-7 py-5  w-11/12 bg-red-700 hover:cursor-pointer"
			onClick={clearError}
		>
			<strong className="block">Click the alert to close it</strong>
			<strong>Error:</strong> {errorMessage}
		</div>
	);
};
export default ErrorMsg;
