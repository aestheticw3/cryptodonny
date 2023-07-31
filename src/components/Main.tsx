import { useNavigate } from "react-router-dom";
import BitcoinPNG from "../assets/bitcoin.png";
import { useMetaMask } from "../hooks/useMetaMask";

const Main = () => {
	const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask();
	const navigate = useNavigate();

	return (
		<div className="flex justify-between min-h-screenWithoutHeader items-center px-24 pb-10  bg-mainShape bg-no-repeat bg-cover">
			<div className="max-w-screen-md">
				<h1 className="mb-6">Donation alerts for your stream</h1>
				<p className="font-extrabold mb-8 text-3xl">
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
						className="uppercase "
						disabled={isConnecting}
						onClick={connectMetaMask}
					>
						Connect MetaMask
					</button>
				)}
				{hasProvider && wallet.accounts.length > 0 && (
					<button className="uppercase" onClick={() => navigate("settings")}>
						{"Settings -->"}
					</button>
				)}
			</div>

			<img className="w-1/3 pb-16" src={BitcoinPNG} alt="BitcoinPNG" />
		</div>
	);
};
export default Main;
