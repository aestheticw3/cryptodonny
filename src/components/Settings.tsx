import { useMetaMask } from "../hooks/useMetaMask";
import { verifyMessage } from "../utils/index.ts";

const Settings = () => {
	const { wallet, userSign, generateAPIKey } = useMetaMask();

	return (
		<div className="h-full px-3 py-5 bg-[#27262C]">
			<h1 className="text-3xl mb-6">Settings</h1>
			<p className="mb-5 text-[#21c9d8]">
				{userSign ? "Don't show it anyone 🤫" : "Your API Key:"}
			</p>

			<textarea
				disabled
				className="bg-[#27262C] w-full h-auto mb-6 border border-[#383241] rounded-xl"
				// TODO: Reset on wallet changing
				value={
					userSign &&
					"https://cryptodonny/" + wallet.accounts[0] + "/" + userSign
				}
			></textarea>

			<button
				className="w-full"
				onClick={async () => {
					if (userSign) {
						navigator.clipboard.writeText(
							"https://cryptodonny/" + wallet.accounts[0] + "/" + userSign
						);
						console.log(
							verifyMessage(
								"Generate an API key on CryptoDonny dapp",
								userSign,
								wallet.accounts[0]
							)
						);
						return;
					}
					generateAPIKey();
				}}
			>
				{userSign ? "Copy" : "Generate the API Key"}
			</button>
		</div>
	);
};
export default Settings;
