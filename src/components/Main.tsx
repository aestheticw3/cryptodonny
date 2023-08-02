import { useNavigate } from "react-router-dom";
import BitcoinPNG from "../assets/bitcoin.png";
import { useMetaMask } from "../hooks/useMetaMask";

const Main = () => {
	const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask();
	const navigate = useNavigate();

	return (
		// bg-mainShape bg-no-repeat bg-contain bg-bottom

		<div className="text-center sm:items-start  flex flex-col justify-center items-center">
			<h1 className="text-banana text-5xl sm:text-6xl sm:text-left sm:max-w-lg mb-5 pb-2 font-black leading-10 sm:leading-none">
				Donation alerts for&nbsp;your stream
			</h1>
			<p className="text-lg font-extrabold mb-7 text-zircon ">
				Totally free, safe and fast!
			</p>

			{!hasProvider && (
				<p>
					You should install{" "}
					<a href="https://metamask.io" target="_blank">
						MetaMask
					</a>{" "}
					to use the dapp
				</p>
			)}
			{window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
				<button
					className="uppercase"
					disabled={isConnecting}
					onClick={connectMetaMask}
				>
					Connect MetaMask
				</button>
			)}
			{wallet.connected && (
				<button onClick={() => navigate("settings")}>Settings</button>
			)}

			<img className="w-1/3 pb-16 hidden" src={BitcoinPNG} alt="BitcoinPNG" />
		</div>
	);
};
export default Main;
