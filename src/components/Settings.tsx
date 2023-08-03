import qs from "qs";
import { useRef } from "react";
import { useMetaMask } from "../hooks/useMetaMask";

const Settings = () => {
	const { wallet, userSign, generateAPIKey } = useMetaMask();
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<div className="px-5 py-8 md:w-2/3 2xl:w-1/2 bg-[#014751] rounded-xl">
			<h1 className="text-3xl mb-6 font-bold text-banana">Settings</h1>
			<p className="mb-7 text-zircon">
				{userSign
					? "Copy and don't show the link to anyone 🤫"
					: "Click the button below to sign the message (that costs nothing) and generate your API key:"}
			</p>

			<input
				disabled
				ref={inputRef}
				className="bg-firefly hidden w-full mb-5 p-2 border border-[#B8B4B8] rounded-xl"
				value={
					userSign &&
					window.location.origin +
						"/alerts/" +
						qs.stringify({ address: wallet.accounts[0], sign: userSign })
				}
			></input>

			<div className="flex gap-x-5">
				<button
					className="basis-1/2  pt-2.5 pb-3"
					onClick={async () => {
						userSign
							? navigator.clipboard.writeText(
									window.location.origin +
										"/alerts/" +
										qs.stringify({
											address: wallet.accounts[0],
											sign: userSign,
										})
							  )
							: generateAPIKey();
					}}
				>
					{userSign ? "Copy" : "Generate"}
				</button>
				<button
					className="basis-1/2"
					onClick={() => inputRef.current?.classList.toggle("hidden")}
				>
					Show
				</button>
			</div>
		</div>
	);
};
export default Settings;
