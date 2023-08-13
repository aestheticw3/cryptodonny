import { Alchemy, AlchemySubscription, Network, Utils } from "alchemy-sdk";
import { parse } from "qs";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import donationSound from "../assets/donation-sound.mp3";
import donation from "../assets/donation.webp";
import { TxResponse } from "../types";
import { verifyMessage } from "../utils";

const Alerts = () => {
	const settings = {
		apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
		network: Network.MATIC_MAINNET,
	};
	const alchemy = new Alchemy(settings);

	const params = useParams();

	const [access, setAccess] = useState<boolean>(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [donationsQueue, setDonationsQueue] = useState<TxResponse[]>([]);
	const [curDon, setCurDon] = useState<TxResponse>();

	const audioRef = useRef(new Audio(donationSound));
	const playSoundRef = useRef(() => {
		setIsPlaying(true);
		audioRef.current.play();
	});
	audioRef.current.onended = () => {
		setTimeout(() => setIsPlaying(false), 2000);
	};

	console.log("Alerts render");

	useEffect(() => {
		const { address, sign } = parse(params.addressWithSign!);

		verifyMessage(
			"Generate an API key on CryptoDonny dapp",
			sign as string,
			address as string
		).then(res => {
			setAccess(Boolean(res));
		});

		typeof address === "string" &&
			alchemy.ws.on(
				{
					method: AlchemySubscription.MINED_TRANSACTIONS,

					addresses: [
						{
							to: address,
						},
					],
					hashesOnly: false,
				},
				(tx: TxResponse) => {
					console.log(tx);
					setDonationsQueue(dons => [...dons, tx]);
				}
			);

		return () => {
			audioRef.current.onended = null;
			alchemy.ws.removeAllListeners();
		};
	}, [params.addressWithSign]);

	useEffect(() => {
		if (access) {
			const checkDons = setInterval(() => {
				console.log("Checking has started...");
				console.log(donationsQueue);
				if (donationsQueue.length) {
					setCurDon(donationsQueue[0]);
					playSoundRef.current();
					setDonationsQueue(dons => dons.slice(1));
				}
			}, 10000);

			return () => {
				clearInterval(checkDons);
			};
		}
	}, [donationsQueue, access]);

	return (
		<div className="flex justify-center items-center text-center h-screen w-screen">
			{access ? (
				<div className="h-full">
					{isPlaying && (
						<div className="h-full">
							<img
								className="h-5/6 w-full mb-5"
								src={donation}
								alt="DonationImg"
							/>
							<h1
								className="text-2xl text-white font-bold mb-5"
								style={{
									textShadow: "1px 1px 6px black",
								}}
							>
								{curDon?.transaction.from}
								<br />
								{curDon?.transaction &&
									Utils.formatEther(curDon.transaction.value) + " MATIC!"}
							</h1>
						</div>
					)}
				</div>
			) : (
				<div className="text-red-600 text-3xl">
					It seems like your link is broken. You should copy it again.
				</div>
			)}
		</div>
	);
};
export default Alerts;
