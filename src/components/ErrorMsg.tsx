import { useMetaMask } from "../hooks/useMetaMask";

const ErrorMsg = () => {
	const { errorMessage, clearError } = useMetaMask();

	return (
		<div
			className="absolute left-0 bottom-0 p-5 w-screen bg-red-700 hover:cursor-pointer"
			onClick={clearError}
		>
			<strong className="block">Click the alert to close it</strong>
			<strong>Error:</strong> {errorMessage}
		</div>
	);
};
export default ErrorMsg;
