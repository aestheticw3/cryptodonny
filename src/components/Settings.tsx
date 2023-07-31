import { useState } from "react";
import { useMetaMask } from "../hooks/useMetaMask";

const Settings = () => {
	const [userSign, setUserSign] = useState<string | undefined>(undefined);
	const { wallet, generateAPIKey } = useMetaMask();
	return (
		<div className="pt-20">
			<div className="flex flex-col m-auto p-10 max-w-[90%] bg-[#27262C] rounded-xl">
				<h1 className="text-5xl mb-7">Settings</h1>
				<p className="mb-4 max-w-full">Your API Key: </p>
				<textarea
					disabled
					className="bg-[#27262C] mb-7 border border-[#383241] rounded-xl"
					value={
						userSign &&
						"https://cryptodonny/" + wallet.accounts[0] + "/" + userSign
					}
				></textarea>

				<button
					onClick={async () => {
						generateAPIKey().then(APIKey => setUserSign(APIKey));
					}}
				>
					Generate the API Key
				</button>
			</div>
		</div>
	);
};
export default Settings;
