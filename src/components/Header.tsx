import { Link } from "react-router-dom";
import { useMetaMask } from "../hooks/useMetaMask";
import { formatAddress } from "../utils/index.ts";

const Header = () => {
	const {
		wallet,
		hasProvider,
		isConnecting,
		connectMetaMask,
		disconnectMetaMask,
	} = useMetaMask();

	return (
		<header
			className={`fixed top-3 w-11/12 sm:w-full sm:top-5 left-0 right-0 text-firefly  max-w-2xl mx-auto rounded-full p-2 flex justify-between items-center bg-banana`}
		>
			<div className="bg-firefly px-3 pt-0.5 pb-1 rounded-full">
				<Link
					to="/"
					className="font-extrabold uppercase text-transparent bg-clip-text"
					style={{
						backgroundImage:
							"linear-gradient(to right, red, orange 20%, yellow 40%, green 60%, #0096FF 80%, #7F00FF)",
					}}
				>
					CryptoDonny
				</Link>
			</div>

			{hasProvider ? (
				<button
					disabled={isConnecting}
					onClick={() =>
						wallet.connected ? disconnectMetaMask() : connectMetaMask()
					}
					className={`${
						!wallet.connected && "hidden"
					} bg-firefly text-banana px-3 pt-0.5 pb-1`}
				>
					{wallet.connected && formatAddress(wallet.accounts[0])}
				</button>
			) : (
				<a href="https://metamask.io" target="_blank">
					Install MetaMask
				</a>
			)}
		</header>
	);
};
export default Header;
