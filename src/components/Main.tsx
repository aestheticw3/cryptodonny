import { useNavigate } from "react-router-dom";
import BitcoinPNG from "../assets/bitcoin.png";
import { useMetaMask } from "../hooks/useMetaMask";

const Main = () => {
	const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask();
	const navigate = useNavigate();

	return (
		<div className="pt-12 sm:pt-14 text-center flex flex-col justify-center items-center">
			<h1 className="text-banana text-5xl lg:text-7xl sm:max-w-3xl mb-5 sm:mb-10 pb-2 font-black leading-10 sm:leading-none">
				Donation alerts for&nbsp;your stream
			</h1>
			<p className="text-lg lg:text-2xl font-extrabold mb-7 sm:mb-10 text-zircon ">
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

			<button
				className="uppercase px-7 pt-2.5 pb-3 lg:text-xl lg:pt-2.5 lg:px-10 lg:pb-3"
				disabled={isConnecting}
				onClick={() => {
					wallet.connected ? navigate("settings") : connectMetaMask();
				}}
			>
				{wallet.connected ? "Settings" : "Connect MetaMask"}
			</button>

			<img className="w-1/3 pb-16 hidden" src={BitcoinPNG} alt="BitcoinPNG" />
		</div>
	);
};
export default Main;
