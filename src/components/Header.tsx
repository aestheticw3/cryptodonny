import { Link } from "react-router-dom";
import BitcoinLOGO from "../assets/bitcoin-logo.png";
import { useMetaMask } from "../hooks/useMetaMask";
import { formatAddress } from "../utils/index.ts";

const Header = () => {
	const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask();

	return (
		<header className=" w-screen  px-5 py-3 flex justify-between items-center font-black bg-[#27262C] border-b border-b-[#383241]">
			<Link to="/" className="flex items-center text-xl">
				<img
					src={BitcoinLOGO}
					alt="Bitcoin Logo"
					className="w-5 mr-1.5 mt-0.5"
				/>
				Crypto<span className="text-t-primary text-xl">Donny</span>
			</Link>

			{!hasProvider && (
				<a href="https://metamask.io" target="_blank">
					Install MetaMask
				</a>
			)}
			{hasProvider && wallet.accounts.length > 0 && (
				<button
					disabled={isConnecting}
					onClick={connectMetaMask}
					className="px-3 pt-0.5 pb-1 bg-[#353547] text-[#F4EEFF]"
				>
					{formatAddress(wallet.accounts[0])}{" "}
				</button>
			)}
		</header>
	);
};
export default Header;
