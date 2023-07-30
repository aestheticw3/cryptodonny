import BitcoinPNG from "../assets/bitcoin.png";
import { useMetaMask } from "../hooks/useMetaMask";
import { formatAddress, formatChainAsNum } from "../utils/index.ts";

const Main = () => {
	const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask();
	return (
		<div className="flex justify-between items-center min-h-screen px-16">
			<div>
				<h1
					className="text-7xl mb-5 font-black max-w-md pb-2"
					style={{
						backgroundImage:
							"linear-gradient(135deg, rgba(120,100,255,1) 25%, rgba(140,120,255,1) 50%, rgba(160,140,255,1) 75%, rgba(180,120,255,1) 100%)",
						backgroundClip: "text",
						WebkitBackgroundClip: "text",
						color: "transparent",
					}}
				>
					Donation alerts for your stream
				</h1>
				<p className="font-extrabold mb-7 text-2xl">No fees, safe and fast!</p>
				{!hasProvider && (
					<a href="https://metamask.io" target="_blank">
						Install MetaMask
					</a>
				)}
				{window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
					<button disabled={isConnecting} onClick={connectMetaMask}>
						Connect MetaMask
					</button>
				)}
				{hasProvider && wallet.accounts.length > 0 && (
					<a
						href={`https://etherscan.io/address/${wallet}`}
						target="_blank"
						data-tooltip="Open in Block Explorer"
					>
						{formatAddress(wallet.accounts[0])}
					</a>
				)}
				{wallet.accounts.length > 0 && (
					<>
						<div>Wallet Accounts: {wallet.accounts[0]}</div>
						<div>Wallet Balance: {wallet.balance}</div>
						<div>Hex ChainId: {wallet.chainId}</div>
						<div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div>
					</>
				)}
			</div>

			<img className="w-1/3 pb-10" src={BitcoinPNG} alt="shape-img" />
		</div>
	);
};
export default Main;
