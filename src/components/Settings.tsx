import { useMetaMask } from "../hooks/useMetaMask";
import { verifyMessage } from "../utils/index.ts";

const Settings = () => {
	const { wallet, userSign, generateAPIKey } = useMetaMask();

	return (
		<div className="px-5 py-8 md:w-2/3 2xl:w-1/2 bg-[#014751] rounded-xl">
			<h1 className="text-3xl mb-6 font-bold text-banana">Settings</h1>
			<p className="mb-5 text-zircon">
				{userSign
					? "Copy and don't show this link to anybody 🤫"
					: "Click the button below to sign the message (that costs nothing) and generate your API key:"}
			</p>

			<textarea
				disabled
				rows={3}
				className="bg-firefly w-full mb-5 p-2 border border- border-[#B8B4B8] rounded-xl resize-none"
				// TODO: Reset on wallet changing
				value={
					userSign &&
					"https://cryptodonny/" + wallet.accounts[0] + "/" + userSign
				}
			></textarea>

			<button
				className="w-full pt-2.5 pb-3 "
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
				{userSign ? "Copy" : "Generate"}
			</button>
		</div>
	);
};
export default Settings;
