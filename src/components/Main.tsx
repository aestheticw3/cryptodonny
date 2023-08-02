import { useNavigate } from "react-router-dom";
import BitcoinPNG from "../assets/bitcoin.png";
import { useMetaMask } from "../hooks/useMetaMask";

const Main = () => {
	const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask();
	const navigate = useNavigate();

	return (
		// bg-mainShape bg-no-repeat bg-contain bg-bottom

		<div className="h-full text-center flex flex-col justify-center items-center">
			<h1 className="bg-heading text-4xl 2xl:text-2xl mb-3 pb-2 font-black text-transparent bg-clip-text">
				Donation alerts for your stream
			</h1>
			<p className="font-extrabold mb-8">Totally free, safe and fast!</p>

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
					className="uppercase "
					disabled={isConnecting}
					onClick={connectMetaMask}
				>
					Connect MetaMask
				</button>
			)}
			{wallet.connected && (
				<button className="uppercase" onClick={() => navigate("settings")}>
					{"Settings"}
				</button>
			)}

			<img className="w-1/3 pb-16 hidden" src={BitcoinPNG} alt="BitcoinPNG" />
		</div>
	);
};
export default Main;
