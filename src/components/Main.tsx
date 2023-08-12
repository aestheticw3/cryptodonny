import { useNavigate } from "react-router-dom";
import { useMetaMask } from "../hooks/useMetaMask";

const Main = () => {
	const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask();
	const navigate = useNavigate();

	return (
		<div className="text-center flex flex-col justify-center items-center">
			<h1 className=" text-5xl min-[809px]:text-7xl sm:max-w-3xl mb-5 sm:mb-10 pb-2 font-black leading-10 sm:leading-none">
				Donation alerts for&nbsp;your stream
			</h1>
			<p className="text-lg lg:text-2xl font-extrabold mb-7 sm:mb-10 text-zircon ">
				Totally free, safe and fast!
			</p>

			{hasProvider ? (
				<button
					className="uppercase px-7 pt-2.5 pb-3 lg:text-xl lg:pt-2.5 lg:px-10 lg:pb-3"
					disabled={isConnecting}
					onClick={() => {
						wallet.connected ? navigate("settings") : connectMetaMask();
					}}
				>
					{wallet.connected ? "Settings" : "Connect MetaMask"}
				</button>
			) : (
				<p>
					You should install{" "}
					<a href="https://metamask.io" target="_blank">
						MetaMask
					</a>{" "}
					to use the dapp
				</p>
			)}
		</div>
	);
};
export default Main;
